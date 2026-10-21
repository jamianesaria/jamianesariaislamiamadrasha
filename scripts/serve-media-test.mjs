// Isolated media regression fixture; does not replace Next.js integration/build checks.
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname, sep } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToString } from "react-dom/server";
import { compile } from "@tailwindcss/node";

const require = createRequire(import.meta.url);
const modules = new Map();
const stubs = { "lucide-react": "exports.ArrowRight=()=>null;exports.Play=()=>null;", "@sanity/client/stega": "exports.stegaClean=v=>v;" };
function collect(file) {
  if (modules.has(file)) return file;
  const source = file in stubs ? stubs[file] : readFileSync(file, "utf8");
  const code = /\.tsx?$/.test(file) ? ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText : source;
  const record = { code, deps: {} };
  modules.set(file, record);
  for (const match of code.matchAll(/require\(["']([^"']+)["']\)/g)) {
    const spec = match[1];
    const dependency = spec in stubs ? spec : spec.startsWith(".") && /\.tsx?$/.test(file)
      ? [".tsx", ".ts"].map((extension) => resolve(dirname(file), spec + extension)).find(existsSync)
      : createRequire(file).resolve(spec);
    record.deps[spec] = collect(dependency);
  }
  return file;
}
const introId = collect(resolve("src/components/WebsiteIntro.tsx"));
const heroId = collect(resolve("src/components/HeroVideo.tsx"));
const reactId = collect(require.resolve("react"));
const clientId = collect(require.resolve("react-dom/client"));
const cache = new Map();
function serverLoad(id) {
  if (!/src[\\/]components/.test(id) && !(id in stubs)) return require(id);
  if (cache.has(id)) return cache.get(id).exports;
  const { code, deps } = modules.get(id);
  const loadedModule = { exports: {} };
  cache.set(id, loadedModule);
  runInNewContext(`(function(require,module,exports){${code}\n})`, { console, process })((specifier) => serverLoad(deps[specifier]), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const settings = {
  enabled: true, videoUrl: "/intro-desktop-v2.mp4", mobileVideoUrl: "/intro-mobile-v3.mp4",
  posterUrl: "/intro-poster.jpg", mobilePosterUrl: "/intro-mobile-poster-v3.jpg",
  title: "জামিয়ায় স্বাগতম", skipLabel: "ওয়েবসাইটে প্রবেশ করুন",
  playLabel: "ভিডিও চালু করুন", loadingLabel: "ভিডিও প্রস্তুত হচ্ছে…",
};
function app(R, Intro, Hero) {
  return R.createElement(R.StrictMode, null, R.createElement(Intro, { settings },
    R.createElement("main", null, R.createElement("h1", null, "Media regression fixture"),
      R.createElement("a", { href: "/about" }, "Homepage navigation"),
      R.createElement("section", { style: { position: "relative", height: 320 } },
        R.createElement(Hero, { src: "/hero-courtyard-v2.mp4", poster: "/drone_poster.jpg" })))));
}
const markup = renderToString(app(React, serverLoad(introId).default, serverLoad(heroId).default));
const compiler = await compile('@import "tailwindcss";', { base: process.cwd(), onDependency() {} });
const candidates = [introId, heroId].flatMap((file) => [...readFileSync(file, "utf8").matchAll(/className="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)));
const css = compiler.build(candidates);
const bundle = `const process={env:{NODE_ENV:"development"}};
const modules={${[...modules].map(([id, { code, deps }]) => `${JSON.stringify(id)}:[function(require,module,exports){${code}\n},${JSON.stringify(deps)}]`).join(",")}};
const cache={};function load(id){if(cache[id])return cache[id].exports;const m=cache[id]={exports:{}};const [fn,deps]=modules[id];fn(s=>load(deps[s]),m,m.exports);return m.exports;}
const settings=${JSON.stringify(settings)};const app=${app.toString()};
load(${JSON.stringify(clientId)}).hydrateRoot(document.getElementById("root"),app(load(${JSON.stringify(reactId)}),load(${JSON.stringify(introId)}).default,load(${JSON.stringify(heroId)}).default));`;
createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (pathname === "/fixture.js") {
    response.setHeader("Content-Type", "text/javascript"); response.end(bundle); return;
  }
  if (pathname === "/" || pathname === "/about") {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body><div id="root">${markup}</div><script src="/fixture.js" defer></script></body></html>`); return;
  }
  const file = resolve("public", pathname.slice(1));
  if (!file.startsWith(resolve("public") + sep) || !existsSync(file)) { response.writeHead(404); response.end(); return; }
  const data = readFileSync(file);
  response.setHeader("Content-Type", file.endsWith(".mp4") ? "video/mp4" : "image/jpeg");
  response.setHeader("Accept-Ranges", "bytes");
  const range = request.headers.range?.match(/bytes=(\d+)-(\d*)/);
  if (range) {
    const start = Number(range[1]); const end = range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
    response.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${data.length}`, "Content-Length": end - start + 1 });
    response.end(data.subarray(start, end + 1));
  } else { response.setHeader("Content-Length", data.length); response.end(data); }
}).listen(3015, "127.0.0.1", () => console.log("Media fixture ready at http://127.0.0.1:3015 (React Strict Mode)"));
