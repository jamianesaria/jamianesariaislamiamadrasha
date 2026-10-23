import env from "@next/env";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
env.loadEnvConfig(process.cwd());
const secrets=[...new Set([process.env.SANITY_API_TOKEN,process.env.SANITY_API_READ_TOKEN,process.env.SANITY_SUBMISSIONS_WRITE_TOKEN].filter(value=>value&&value.length>12))];
function files(dir){return existsSync(dir)?readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(resolve(dir,entry.name)):[resolve(dir,entry.name)]):[];}
const targets=[...files(".next/static"),...files("src")].filter(file=>/\.(js|json|ts|tsx|css)$/.test(file));
for(const file of targets){const content=readFileSync(file,"utf8");if(secrets.some(value=>content.includes(value)))throw new Error("Server credential found in a public/source artifact; release stopped.");}
console.log(JSON.stringify({filesChecked:targets.length,configuredServerCredentials:secrets.length,leakedCredentials:0}));
