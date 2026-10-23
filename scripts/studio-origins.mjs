import env from "@next/env";
env.loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const headers={Authorization:`Bearer ${process.env.SANITY_API_TOKEN}`,"Content-Type":"application/json"};
const url=`https://api.sanity.io/v2026-03-01/projects/${projectId}/cors`;
const response=await fetch(url,{headers});
if(!response.ok)throw new Error(`CORS inspection failed: ${response.status}`);
const origins=await response.json();
console.log(JSON.stringify(origins.map(({origin,allowCredentials})=>({origin,allowCredentials})),null,2));
if(process.argv.includes("--apply")){
 for(const origin of ["http://localhost:3000","http://localhost:3020","https://jamianesariaislamiamadrasha.vercel.app","https://nesariamadrasa.com"]){
  if(origins.some(item=>item.origin===origin&&item.allowCredentials))continue;
  if(origins.some(item=>item.origin===origin))throw new Error("Existing origin needs credential-setting review; nothing deleted.");
  const added=await fetch(url,{method:"POST",headers,body:JSON.stringify({origin,allowCredentials:true})});
  if(!added.ok)throw new Error(`CORS addition failed: ${added.status}`);
  console.log(JSON.stringify({added:origin,allowCredentials:true}));
 }
}
