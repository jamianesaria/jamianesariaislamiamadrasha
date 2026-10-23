import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import ts from "typescript";
import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const config={projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:"2026-03-01",useCdn:false};
const client=createClient({...config,token:process.env.SANITY_API_TOKEN,perspective:"raw"});const anonymous=createClient(config);
const ids=[];const assets=[];
const id=randomUUID();const draftId="drafts."+id;const marker="PublishingQA"+randomUUID().replaceAll("-","");ids.push(id,draftId);
const ast=ts.createSourceFile("ManagementTool.tsx",readFileSync("src/sanity/management/ManagementTool.tsx","utf8"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let listQuery;function visit(node){if(!listQuery&&ts.isCallExpression(node)&&node.expression.getText(ast)==="useRecords"&&ts.isStringLiteral(node.arguments[0]))listQuery=node.arguments[0].text;node.forEachChild(visit);}visit(ast);assert.ok(listQuery);
const list=(status)=>client.fetch(listQuery,{type:"notice",types:["notice"],status,search:`*${marker}*`,start:0,end:31});
function pdf(text){const parts=["%PDF-1.4\n"];const offsets=[0];const objects=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>","<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",`<< /Length ${Buffer.byteLength(`BT /F1 12 Tf 20 100 Td (${text}) Tj ET`)} >>\nstream\nBT /F1 12 Tf 20 100 Td (${text}) Tj ET\nendstream`];for(let i=0;i<objects.length;i++){offsets.push(Buffer.byteLength(parts.join("")));parts.push(`${i+1} 0 obj\n${objects[i]}\nendobj\n`);}const start=Buffer.byteLength(parts.join(""));parts.push(`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(value=>`${String(value).padStart(10,"0")} 00000 n \n`).join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);return Buffer.from(parts.join(""));}
try{
 await client.create({_id:id,_type:"notice",title:marker,category:"general",publishDate:"2026-10-23"});await client.create({_id:draftId,_type:"notice",title:marker+" draft",category:"general",publishDate:"2026-10-23"});
 assert.equal((await list("all")).length,1);assert.equal((await list("all"))[0].draft,true);assert.equal((await list("draft")).length,1);assert.equal((await list("published"))[0]._id,id);
 await client.transaction().patch(id,{set:{archivedAt:new Date().toISOString()}}).patch(draftId,{set:{archivedAt:new Date().toISOString()}}).commit();assert.equal((await list("all")).length,0);assert.equal((await list("archived")).length,1);
 assert.equal(await anonymous.fetch('count(*[_id==$id&&!defined(archivedAt)])',{id}),0);
 await client.transaction().patch(id,{unset:["archivedAt"]}).patch(draftId,{unset:["archivedAt"]}).commit();assert.equal((await list("all")).length,1);
 console.log("Actual dashboard query: draft/published filtering, one row per record, archive, restoration and public exclusion passed");
 const first=await client.assets.upload("file",pdf(marker),{filename:"cms-qa.pdf",contentType:"application/pdf"});assets.push(first._id);await client.patch(id).set({pdfFile:{_type:"file",asset:{_type:"reference",_ref:first._id}}}).commit();
 assert.equal((await fetch(first.url)).status,200);
 const second=await client.assets.upload("file",pdf(marker+" replacement"),{filename:"cms-qa-replacement.pdf",contentType:"application/pdf"});assets.push(second._id);await client.patch(id).set({pdfFile:{_type:"file",asset:{_type:"reference",_ref:second._id}}}).commit();assert.equal(await anonymous.fetch('*[_id==$id][0].pdfFile.asset->url',{id}),second.url);
 console.log("Real PDF upload, readable download and attachment replacement passed");
 const image=await client.assets.upload("image",Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><title>${marker}</title><rect width="32" height="32" fill="#016332"/></svg>`),{filename:"cms-qa.svg",contentType:"image/svg+xml"});assets.push(image._id);
 const teacher="drafts."+randomUUID();ids.push(teacher);await client.create({_id:teacher,_type:"teacher",name:marker,designation:"QA",department:"kitab",photo:{_type:"image",asset:{_type:"reference",_ref:image._id}}});assert.equal(await client.fetch('*[_id==$id][0].photo.asset->url',{id:teacher}),image.url);
 const routine="drafts."+randomUUID();ids.push(routine);await client.create({_id:routine,_type:"classRoutine",classId:"play",className:"Play",title:marker,academicYear:"2026",timetableRows:[{_key:"a",_type:"routineDay",day:"Saturday",period1:"First"},{_key:"b",_type:"routineDay",day:"Sunday",period1:"Second"}]});await client.patch(routine).set({timetableRows:[{_key:"b",_type:"routineDay",day:"Sunday",period1:"Second"},{_key:"a",_type:"routineDay",day:"Saturday",period1:"First"}]}).commit();assert.equal(await client.fetch('*[_id==$id][0].timetableRows[0]._key',{id:routine}),"b");
 console.log("Profile image persistence and keyed routine-row reordering passed");
}finally{
 for(const ownId of ids)await client.delete(ownId);
 for(const ownId of assets)if(!await client.fetch('count(*[references($id)])',{id:ownId}))await client.delete(ownId);
 console.log("Only this run's records and unreferenced QA assets were removed");
}
