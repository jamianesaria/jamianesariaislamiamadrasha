// Local browser QA only. Uses the actual management UI with a Studio-context adapter.
// Credentials remain on the Node server. This is never imported into the Next application.
import { createServer } from "vite";
import { createClient } from "@sanity/client";
import env from "@next/env";
import { randomBytes, randomUUID } from "node:crypto";
import { resolve } from "node:path";

env.loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3829zb8h";
const token = process.env.SANITY_API_TOKEN;
if (!token) throw new Error("Configured server credentials required for QA.");
const client = createClient({ projectId, dataset: "submissions", apiVersion: "2026-03-01", token, useCdn: false });
const ownId = "incoming." + randomBytes(32).toString("hex");
const publicClient = client.withConfig({ dataset: "production" });
const publicOwnId = randomUUID();
await publicClient.create({ _id: publicOwnId, _type: "notice", title: "Delete browser QA publication", category: "general", publishDate: new Date().toISOString().slice(0,10) });
await publicClient.create({ _id: "drafts." + publicOwnId, _type: "notice", title: "Delete browser QA publication", category: "general", publishDate: new Date().toISOString().slice(0,10) });
await client.create({ _id: ownId, _type: "incomingSubmission", kind: "contact", reference: "QA-BROWSER-" + ownId.slice(0, 6), receivedAt: new Date().toISOString(), status: "new", notes: "", fields: { name: "Browser QA", email: "qa@example.invalid", subject: "Management browser test", message: "Temporary record created only for this browser check." } });
const virtual = (name) => "\0management-qa:" + name;
const server = await createServer({
  configFile: false, root: process.cwd(), publicDir: "public", server: { host: "127.0.0.1", port: 3030, strictPort: true },
  resolve: { alias: [{ find: /^sanity$/, replacement: virtual("sanity") }, { find: /^sanity\/router$/, replacement: virtual("router") }, { find: /^next\/image$/, replacement: virtual("image") }, { find: "@", replacement: resolve("src") }] },
  esbuild: { jsx: "automatic" },
  define: { "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID": JSON.stringify(projectId), "process.env.NEXT_PUBLIC_SANITY_DATASET": '"production"', "process.env.NEXT_PUBLIC_SANITY_API_VERSION": '"2026-03-01"' },
  plugins: [{ name: "management-qa", resolveId(id) { if (id === "/@management-qa-entry") return virtual("entry"); if (id.startsWith("\0management-qa:")) return id; }, load(id) {
    if (id === virtual("entry")) return "import React from 'react';import {createRoot} from 'react-dom/client';import ManagementTool from '/src/sanity/management/ManagementTool.tsx';import '/src/sanity/management/management.css';createRoot(document.getElementById('root')).render(React.createElement(ManagementTool));";
    if (id === virtual("sanity")) return `import {createClient} from '@sanity/client';const client=createClient({projectId:${JSON.stringify(projectId)},dataset:'production',apiVersion:'2026-03-01',apiHost:'http://127.0.0.1:3030/sanity',useProjectHostname:false,useCdn:false});export const useClient=()=>client;export const useCurrentUser=()=>({id:'browser-qa',name:'Office QA'});`;
    if (id === virtual("router")) return `import React from 'react';export function IntentLink({intent,params,children,...props}){return React.createElement('a',{...props,href:'/studio/intent/'+intent+'?'+new URLSearchParams(params).toString()},children)};export const useRouter=()=>({navigate:value=>{window.__managementNavigation=value}});`;
    if (id === virtual("image")) return `import React from 'react';export default function Image({unoptimized,...props}){return React.createElement('img',props)}`;
  }, configureServer(vite) {
    vite.middlewares.use(async (request, response, next) => {
      if (request.url === "/qa/cleanup") {
        await client.delete(ownId); await publicClient.delete("drafts." + publicOwnId); await publicClient.delete(publicOwnId); response.end("QA records removed"); return;
      }
      if (request.url?.startsWith("/sanity/")) {
        const path = request.url.slice("/sanity".length);
        if (!/^\/v[\d-]+\/data\/(query|listen|mutate|doc)\/(production|submissions)(\?|\/|$)/.test(path)) { response.writeHead(403); response.end(); return; }
        let body;
        if (request.method === "POST") {
          const chunks = []; for await (const chunk of request) chunks.push(chunk);
          body = Buffer.concat(chunks);
          if (path.includes("/mutate/")) {
            const mutations = JSON.parse(body.toString()).mutations;
            const allowedIds = path.includes("/mutate/submissions") ? [ownId] : [publicOwnId, "drafts." + publicOwnId];
            if (!Array.isArray(mutations) || mutations.some((mutation) => !allowedIds.includes(mutation.patch?.id || mutation.delete?.id))) { response.writeHead(403); response.end(); return; }
          }
        }
        const abort = new AbortController();
        response.on("close", () => abort.abort());
        try {
          const upstream = await fetch(`https://${projectId}.api.sanity.io${path}`, { method: request.method, headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) }, body, signal: abort.signal });
          response.writeHead(upstream.status, { "Content-Type": upstream.headers.get("content-type") || "application/json", "Cache-Control": "no-store" });
          if (upstream.body) for await (const chunk of upstream.body) response.write(chunk);
          response.end();
        } catch { if (!response.destroyed) { response.writeHead(502); response.end("QA proxy unavailable"); } }
        return;
      }
      if (request.url === "/" || request.url === "/index.html") {
        const html = '<!doctype html><html lang="bn"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body,#root{margin:0;height:100%;width:100%;overflow:hidden}</style></head><body><div id="root"></div><script type="module" src="/@management-qa-entry"></script></body></html>';
        response.setHeader("Content-Type", "text/html; charset=utf-8"); response.end(await vite.transformIndexHtml("/", html)); return;
      }
      next();
    });
  } }],
  optimizeDeps: { include: ["react", "react-dom/client", "@sanity/client", "lucide-react"] },
});
await server.listen();
console.log("Actual management UI QA: http://127.0.0.1:3030 (Studio-context adapter; only its own QA record may be changed)");
const cleanup = async () => { await client.delete(ownId); await publicClient.delete("drafts." + publicOwnId); await publicClient.delete(publicOwnId); await server.close(); process.exitCode = 0; };
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
