// Verify decryption and tar integrity in memory; never import or print private records.
import env from "@next/env";
import { createDecipheriv, scryptSync } from "node:crypto";
import { createReadStream } from "node:fs";
import { open, stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";
import { resolve, relative, isAbsolute } from "node:path";
import tar from "tar-stream";

env.loadEnvConfig(process.cwd());
const root = resolve(".cms-work/backups");
const file = resolve(process.argv[2] || "");
const rel = relative(root, file);
if (!rel || rel.startsWith("..") || isAbsolute(rel) || !file.endsWith(".sanity.enc")) throw new Error("Choose an encrypted archive inside .cms-work/backups.");
const password = process.env.SANITY_BACKUP_PASSPHRASE;
if (!password || password.length < 32) throw new Error("Backup passphrase is missing.");
try {
  const { size } = await stat(file);
  const handle = await open(file, "r");
  const header = Buffer.alloc(38), tag = Buffer.alloc(16);
  try { await handle.read(header, 0, 38, 0); await handle.read(tag, 0, 16, size - 16); } finally { await handle.close(); }
  if (header.subarray(0, 10).toString() !== "SANITYBK1\n") throw new Error("Unknown backup format.");
  const cipher = createDecipheriv("aes-256-gcm", scryptSync(password, header.subarray(10, 26), 32), header.subarray(26));
  cipher.setAuthTag(tag);
  const archive = tar.extract();
  let entries = 0, dataFiles = 0;
  archive.on("entry", (entry, stream, next) => { entries++; if (entry.name.endsWith(".ndjson")) dataFiles++; stream.on("end", next); stream.resume(); });
  await pipeline(createReadStream(file, { start: 38, end: size - 17 }), cipher, createGunzip(), archive);
  if (!dataFiles) throw new Error("Archive has no importable document data.");
  console.log(JSON.stringify({ file: rel, authenticatedDecryption: true, archiveEntries: entries, dataFiles, remoteRecordsChanged: false }));
} catch { console.error("Backup verification failed: check the passphrase and archive integrity."); process.exitCode = 1; }
