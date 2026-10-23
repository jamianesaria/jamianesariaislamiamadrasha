import { readFileSync } from "node:fs";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const records=JSON.parse(readFileSync("src/content/seeds.json","utf8"));
const apply=process.argv.includes("--apply");
const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:"2026-03-01",useCdn:false,token:process.env.SANITY_API_TOKEN});
for(const record of records){
  if(record._type!=="pageContent" || !/^copy\.(ui|data)\.[A-Za-z][A-Za-z0-9]*$/.test(record._id)||/sampleAcademicResults|sampleAdmissionResults/.test(record._id))throw new Error("Unexpected seed record");
  const existing=await client.getDocument(record._id);
  const keys=new Set((existing?.entries||[]).map((entry)=>entry._key));
  const missing=record.entries.filter((entry)=>!keys.has(entry._key));
  if(apply){
    if(!existing)await client.createIfNotExists(record);
    else if(missing.length)await client.patch(record._id).ifRevisionId(existing._rev).setIfMissing({entries:[]}).append("entries",missing).commit();
  }
  console.log(JSON.stringify({document:record._id,missing:missing.length,applied:apply,existingValuesPreserved:true}));
}
