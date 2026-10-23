import env from "@next/env";
import { createClient } from "@sanity/client";
env.loadEnvConfig(process.cwd());
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-03-01", useCdn: false, token: process.env.SANITY_API_TOKEN });
const types = ["notice","classRoutine","examRoutine","calendarEvent","vacancy","examResult","teacher","committeeMember","galleryPhoto","galleryVideo","pageContent","blogPost","admissionInfo","badriKafila"];
const counts = await Promise.all(types.map(async (type) => ({ type, published: await client.fetch('count(*[_type==$type && !(_id in path("drafts.**"))])', {type}) })));
console.log(JSON.stringify({ counts, resultLegacyHidden: await client.fetch('count(*[_type=="examResult" && isPublished==false])'), datasets: (await client.datasets.list()).map(({ name, aclMode }) => ({ name, aclMode })) }, null, 2));
console.log(JSON.stringify(await client.fetch('*[_type in ["classRoutine","examRoutine"]]{_id,_type,title,className,classId,timetableRows,scheduleRows,examRows}'),null,2));
