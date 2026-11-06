// Encrypt Sanity's importable archives directly; never write plaintext application data.
import env from "@next/env";
import { createClient } from "@sanity/client";
import { exportDataset } from "@sanity/export";
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import { createWriteStream } from "node:fs";
import { appendFile, mkdir, rename, writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { resolve, relative, isAbsolute } from "node:path";

env.loadEnvConfig(process.cwd());
const password = process.env.SANITY_BACKUP_PASSPHRASE;
const token = process.env.SANITY_API_TOKEN;
if (!password || password.length < 32 || !token) throw new Error("Set a server-only SANITY_API_TOKEN and a backup passphrase of at least 32 characters.");
const root = resolve(".cms-work/backups");
await mkdir(root, { recursive: true });
const stamp = new Date().toISOString().replaceAll(":", "-");
const manifest = { createdAt: new Date().toISOString(), format: "SANITYBK1 AES-256-GCM/scrypt", files: [] };
try {
  for (const dataset of [...new Set([process.env.NEXT_PUBLIC_SANITY_DATASET || "production", process.env.SANITY_SUBMISSIONS_DATASET || "submissions"])]) {
    if (!/^[a-z0-9_-]+$/.test(dataset)) throw new Error("Invalid dataset name.");
    const path = resolve(root, `${stamp}-${dataset}.sanity.enc`);
    const rel = relative(root, path);
    if (rel.startsWith("..") || isAbsolute(rel)) throw new Error("Backup path escapes its private directory.");
    const salt = randomBytes(16), iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", scryptSync(password, salt, 32), iv);
    const pending = path + ".partial";
    await writeFile(pending, Buffer.concat([Buffer.from("SANITYBK1\n"), salt, iv]), { flag: "wx", mode: 0o600 });
    const writing = pipeline(cipher, createWriteStream(pending, { flags: "a", mode: 0o600 }));
    // Mark rejection handled while the exporter is producing the stream.
    writing.catch(() => {});
    try {
      await exportDataset({ client: createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset, token, apiVersion: "2026-03-01", useCdn: false }), dataset, outputPath: cipher, assets: true, drafts: true });
      await writing;
    } catch { cipher.destroy(); await writing.catch(() => {}); throw new Error("Dataset export failed; the incomplete encrypted file was retained for diagnosis."); }
    await appendFile(pending, cipher.getAuthTag());
    await rename(pending, path);
    manifest.files.push({ dataset, file: relative(root, path) });
    console.log(JSON.stringify({ dataset, encryptedBackup: path }));
  }
  await writeFile(resolve(root, `${stamp}-manifest.json`), JSON.stringify(manifest, null, 2), { flag: "wx", mode: 0o600 });
} catch { console.error("Encrypted backup failed. Credentials and source records were not logged."); process.exitCode = 1; }
