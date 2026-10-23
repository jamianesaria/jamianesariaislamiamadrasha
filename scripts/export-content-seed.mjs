// Export only the known public page-copy singletons for a repeatable additive seed.
import { writeFileSync } from "node:fs";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:"2026-03-01",useCdn:false,token:process.env.SANITY_API_TOKEN});
const records=await client.fetch('*[_type=="pageContent" && (_id match "copy.ui.*" || _id match "copy.data.*") && !(_id in path("drafts.**"))] | order(_id asc){_id,_type,title,route,entries}');
if(records.some((record)=>/sampleAcademicResults|sampleAdmissionResults/.test(record._id)))throw new Error("Private result fixtures are excluded.");
writeFileSync("src/content/seeds.json",JSON.stringify(records,null,2)+"\n");
console.log(JSON.stringify({publicDocuments:records.length,fields:records.reduce((sum,item)=>sum+item.entries.length,0)}));
