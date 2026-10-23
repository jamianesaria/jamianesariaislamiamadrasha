// Live page audit using the real frontend overlays and official Comlink protocol.
// The test host receives field-focus messages; it does not impersonate a Studio user.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import env from '@next/env';
import { createClient } from '@sanity/client';
import { studioPath } from '@sanity/client/csm';
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret';
import { decodeSanityNodeData } from '@sanity/visual-editing-csm';
import { VERCEL_STEGA_REGEX, vercelStegaDecodeAll, vercelStegaSplit } from '@vercel/stega';
import { rolldown } from 'rolldown';

env.loadEnvConfig(process.cwd());
const base=process.env.QA_BASE_URL||'https://nesariamadrasa.com';
const { chromium }=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'3829zb8h',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2026-03-01',token:process.env.SANITY_API_TOKEN,useCdn:false});
const coverage=JSON.parse(readFileSync('src/content/coverage.json','utf8'));
const only=process.argv.indexOf('--route');
let routes=only>=0?[process.argv[only+1]]:Object.entries(coverage).filter(([,i])=>!i.redirect).map(([r])=>r);
const shardFlag=process.argv.indexOf('--shard');let reportFile='.cms-work/visual-pages/report.json';
if(shardFlag>=0){const [index,count]=process.argv[shardFlag+1].split('/').map(Number);assert.ok(Number.isInteger(index)&&Number.isInteger(count)&&index>=0&&count>0&&index<count);const aliases={'/about/history':'/about','/faculty':'/teachers','/profile/managing-committee':'/committee','/results/admission':'/results/academic'};routes=routes.filter(route=>[...(aliases[route]||route)].reduce((sum,c)=>sum+c.charCodeAt(0),0)%count===index);reportFile=`.cms-work/visual-pages/report-${index}-of-${count}.json`;}
const mutate=process.argv.includes('--drafts');
const modals=process.argv.includes('--modals');
const scanOnly=process.argv.includes('--scan-only');
const secretId='qa-visual-pages-'+randomUUID();
const reports=[],errors=[],ownDrafts=new Map(),documents=new Map();
const shared=/^copy\.(?:ui\.(?:NavigationBar|HeaderBanner|Footer|BreakingNewsBar|RightSidebar)|data\.navigationItems)$/;
mkdirSync('.cms-work/visual-pages',{recursive:true});
writeFileSync('.cms-work/visual-pages/host-entry.mjs',`import {createController,createConnectionMachine} from '@sanity/comlink';
 import {createCompatibilityActors} from '@sanity/presentation-comlink';
 const controller=createController({targetOrigin:location.origin});
 const iframe=document.querySelector('iframe');controller.addTarget(iframe.contentWindow);
 const channel=controller.createChannel({name:'presentation',connectTo:'visual-editing',heartbeat:true},createConnectionMachine().provide({actors:createCompatibilityActors()}));
 window.__focus=[];window.__statuses=[];window.__channel=channel;window.__messages=[];
 window.addEventListener('message',e=>{if(e.data?.domain)window.__messages.push({domain:e.data.domain,from:e.data.from,type:e.data.type});});
 channel.on('visual-editing/focus',data=>window.__focus.push(data));
 channel.on('visual-editing/fetch-perspective',()=>({perspective:'drafts'}));
 channel.on('visual-editing/shared-state',()=>({state:{}}));
 channel.on('visual-editing/preview-snapshots',()=>({snapshots:[]}));
 channel.on('visual-editing/schema',()=>({schema:[]}));
 channel.on('visual-editing/schema-union-types',()=>({types:{}}));
 channel.onStatus(event=>{window.__statuses.push(event.status);});channel.start();`);
const bundler=await rolldown({input:resolve('.cms-work/visual-pages/host-entry.mjs'),platform:'browser'});
const bundle=await bundler.generate({format:'iife'});await bundler.close();
const host=`<!doctype html><html><head><style>html,body{margin:0;height:100%;overflow:hidden}iframe{border:0;width:100%;height:100%}</style></head><body><iframe title="Live visual audit preview" src="about:blank"></iframe><script>${bundle.output[0].code}</script></body></html>`;
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE||undefined});
const normalize=path=>studioPath.toString(studioPath.fromString(path));
async function getDocuments(ids){const missing=[...new Set(ids)].filter(id=>!documents.has(id));if(missing.length){for(const doc of await client.fetch('*[_id in $ids]',{ids:missing}))documents.set(doc._id,doc);}}
function valueAt(document,path){let value=document;for(const segment of studioPath.fromString(path)){value=typeof segment==='object'&&'_key'in segment?value?.find?.(item=>item._key===segment._key):value?.[segment];}return value;}
async function cleanDraft(id,rev){const current=await client.getDocument(id);if(!current){ownDrafts.delete(id);return;}if(current._rev!==rev){console.log(JSON.stringify({preservedExternalDraftChange:id}));ownDrafts.delete(id);return;}await client.transaction().patch(id,p=>p.ifRevisionId(rev).unset(['_visualAuditUnused'])).delete(id).commit();ownDrafts.delete(id);}
async function inspect(frame){
 const raw=await frame.evaluate(()=>{
  const text=[],attributes=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node,index=0;
  while((node=walker.nextNode())){const el=node.parentElement;if(!el||el.closest('script,style,svg,sanity-visual-editing'))continue;const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)continue;const id=el.getAttribute('data-visual-qa-node')||String(index++);el.setAttribute('data-visual-qa-node',id);text.push({text:node.textContent,tag:el.tagName,qa:id,main:!!el.closest('main,article'),heading:!!el.closest('h1,h2,h3,h4,h5,h6'),interactive:!!el.closest('a,button'),annotated:!!el.closest('[data-sanity]'),image:false});}
  for(const el of document.querySelectorAll('[data-sanity]')){if(!el.hasAttribute('data-visual-qa-node'))el.setAttribute('data-visual-qa-node',String(index++));attributes.push({data:el.getAttribute('data-sanity'),tag:el.tagName,qa:el.getAttribute('data-visual-qa-node'),main:!!el.closest('main,article'),image:el.tagName==='IMG',src:el.getAttribute('src')});}
  return{text,attributes};
 });
 const sources=[];
 for(const item of raw.text){let start=0;for(const match of item.text.matchAll(new RegExp(VERCEL_STEGA_REGEX.source,'gu'))){for(const encoded of vercelStegaDecodeAll(match[0])||[]){const node=decodeSanityNodeData(encoded);if(node?.id&&node.path)sources.push({...item,node,rawText:item.text,segmentStart:start,segmentEnd:match.index,text:vercelStegaSplit(item.text.slice(start,match.index)).cleaned});}start=match.index+match[0].length;}}
 for(const item of raw.attributes){const node=decodeSanityNodeData(item.data);if(node?.id&&node.path)sources.push({...item,node});}
 await getDocuments(sources.map(s=>s.node.id.replace(/^drafts\./,'')));
 const broken=[];
 for(const source of sources){const id=source.node.id.replace(/^drafts\./,'');const doc=documents.get(id);const value=doc?valueAt(doc,source.node.path):undefined;
  const parts=studioPath.fromString(source.node.path);const parent=doc&&parts.length>1?valueAt(doc,studioPath.toString(parts.slice(0,-1))):doc;
  if(!doc||!parent||(!source.image&&source.text&&value===undefined))broken.push({id,path:source.node.path,reason:!doc?'missing document':!parent?'missing source item':'missing source field',tag:source.tag});
 }
 return {sources,broken,unmappedHeadings:raw.text.filter(t=>t.main&&t.heading&&!t.annotated&&!vercelStegaDecodeAll(t.text)?.length&&t.text.trim().length>5).map(t=>t.text.trim()).filter((v,i,a)=>a.indexOf(v)===i)};
}
async function clickField(hostPage,frame,source){
 const before=await hostPage.evaluate(()=>window.__focus.length);
 const locator=frame.locator(`[data-visual-qa-node="${source.qa}"]`);
 await locator.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
 await frame.waitForTimeout(100);
 const position=await locator.evaluate((el,source)=>{const t=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent===source.rawText);const r=document.createRange();if(t){r.setStart(t,source.clickOffset??source.segmentStart);r.setEnd(t,source.clickOffset===undefined?source.segmentEnd:source.clickOffset+1);}else r.selectNodeContents(el);const rect=[...r.getClientRects()].find(r=>r.width>2&&r.height>2)||el.getBoundingClientRect();return{x:rect.left+Math.min(rect.width/2,40),y:rect.top+rect.height/2};},source);
 const frameBox=await (await frame.frameElement()).boundingBox();assert.ok(frameBox);
 await hostPage.mouse.move(frameBox.x+position.x,frameBox.y+position.y);await frame.waitForTimeout(150);
 await hostPage.mouse.click(frameBox.x+position.x,frameBox.y+position.y);
 await hostPage.waitForFunction(n=>window.__focus.length>n,before,{timeout:10000});
 const focus=await hostPage.evaluate(()=>window.__focus.at(-1));
 assert.equal(focus.id.replace(/^drafts\./,''),source.node.id.replace(/^drafts\./,''));
 assert.equal(normalize(focus.path),normalize(source.node.path));
 return {id:focus.id,path:focus.path};
}
mkdirSync('.cms-work/visual-pages',{recursive:true});
try{
 const {secret}=await createPreviewSecret(client,'cms-visual-pages-audit',base+'/studio',undefined,secretId);
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const publicContext=await browser.newContext();
 const enable=new URL(base+'/api/draft-mode/enable');enable.searchParams.set('sanity-preview-secret',secret);enable.searchParams.set('sanity-preview-pathname','/contact');
 assert.equal((await context.request.get(enable.toString(),{timeout:90000})).status(),200);
 const page=await context.newPage();let currentRoute='';page.on('pageerror',e=>errors.push({route:currentRoute,message:e.message,stack:e.stack}));
 await page.route(base+'/__visual-audit-host',route=>route.fulfill({status:200,contentType:'text/html',body:host}));
 await page.goto(base+'/__visual-audit-host');
 for(const route of routes){
  currentRoute=route;
  const report={route,errors:[]};reports.push(report);
  try{
   await page.setViewportSize({width:1440,height:1000});
   await page.evaluate(()=>{window.__statuses=[];});
   let frame=page.frames().find(f=>f!==page.mainFrame());
   const response=await frame.goto(base+route,{waitUntil:'domcontentloaded',timeout:90000});assert.equal(response.status(),200);
   await frame.waitForTimeout(800);
   const intro=frame.locator('.website-intro');if(await intro.isVisible()){await intro.getByRole('button').last().click({force:true});await intro.waitFor({state:'detached'});}
   const scan=await inspect(frame);
   report.renderedTextSources=scan.sources.filter(s=>s.text).length;report.imageSources=scan.sources.filter(s=>s.image).length;report.brokenSources=scan.broken;report.unmappedHeadings=scan.unmappedHeadings;
   if(scanOnly){report.status=scan.broken.length?'mapping gaps':'scanned';console.log(JSON.stringify(report));continue;}
   await page.waitForFunction(()=>window.__statuses.includes('connected'),null,{timeout:15000});
   const candidates=scan.sources.filter(s=>s.text&&s.main&&!shared.test(s.node.id)&&s.text.trim().length>5);
   const selected=candidates.find(s=>s.node.id.startsWith('copy.ui.')&&s.tag!=='OPTION')||candidates[0];
   assert.ok(selected,'Page-specific rendered content needs a source mapping');
   report.textClick=await clickField(page,frame,selected);
   const paragraph=candidates.find(s=>!s.interactive&&s.text.length>40&&/[,.।!?]/u.test(s.text));if(paragraph){const segment=paragraph.rawText.slice(paragraph.segmentStart,paragraph.segmentEnd);const offset=[...segment.matchAll(/[,.।!?]/gu)].at(-1).index;report.punctuationClick=await clickField(page,frame,{...paragraph,clickOffset:paragraph.segmentStart+offset});}
   const button=candidates.find(s=>s.interactive&&s.tag!=='OPTION');if(button){try{report.buttonClick=await clickField(page,frame,button);}catch(e){report.buttonClickError=e.message.split('\n')[0];}}
   const repeated=candidates.find(s=>!['pageContent','siteSettings','homepage'].includes(documents.get(s.node.id)?._type));if(repeated){try{report.recordClick=await clickField(page,frame,repeated);}catch(e){report.recordClickError=e.message.split('\n')[0];}}
   const headline=scan.sources.find(s=>s.text&&s.main&&s.heading);if(headline){try{report.headlineClick=await clickField(page,frame,headline);}catch(e){report.headlineClickError=e.message.split('\n')[0];}}
   const image=scan.sources.find(s=>s.image&&s.qa&&s.main)||scan.sources.find(s=>s.image&&s.qa);if(image){try{report.imageClick=await clickField(page,frame,image);}catch(e){report.imageClickError=e.message.split('\n')[0];}}
   if(mutate&&selected.node.id.startsWith('copy.')&&selected.node.path.endsWith('.text')){
    const id=selected.node.id.replace(/^drafts\./,'');const draftId='drafts.'+id;
    if(await client.getDocument(draftId)){report.draftEdit='Skipped: existing staff draft preserved';}
    else{
     const published=await client.getDocument(id);const clean={...published};delete clean._rev;delete clean._createdAt;delete clean._updatedAt;
     const path=studioPath.fromString(selected.node.path),key=path.find(p=>typeof p==='object'&&'_key'in p)?._key;assert.ok(key);
     const marker='Visual audit '+randomUUID();const original=published.entries.find(e=>e._key===key).text;
     const draft=await client.create({...clean,_id:draftId,entries:published.entries.map(e=>e._key===key?{...e,text:original+' ['+marker+']'}:e)});ownDrafts.set(draftId,draft._rev);
     try{
      await page.evaluate(()=>{window.__statuses=[];});await frame.goto(base+route,{waitUntil:'domcontentloaded',timeout:90000});await page.waitForFunction(()=>window.__statuses.at(-1)==='connected',null,{timeout:15000});await frame.getByText(marker,{exact:false}).waitFor({timeout:20000});
      const outsider=await publicContext.newPage();try{await outsider.goto(base+route,{waitUntil:'domcontentloaded',timeout:60000});assert.equal(await outsider.getByText(marker,{exact:false}).count(),0);}finally{await outsider.close();}
      report.draftEdit='Rendered privately';
     }finally{await cleanDraft(draftId,draft._rev);}
    }
   }
   if(modals&&['/about/vacancy','/functions/event-list','/functions/holiday'].includes(route)){
    report.modalPhase='Opening details';await page.evaluate(()=>window.__channel.post('presentation/toggle-overlay'));await frame.waitForTimeout(200);
    await frame.locator('tbody tr').first().getByRole('button').first().click();
    const close=frame.getByRole('button',{name:'Close modal',exact:true});await close.waitFor();
    await close.evaluate(el=>el.closest('.fixed').setAttribute('data-visual-qa-modal','true'));
    const modal=frame.locator('[data-visual-qa-modal]');
    await page.evaluate(()=>window.__channel.post('presentation/toggle-overlay'));await frame.waitForTimeout(300);
    const modalScan=await inspect(frame);const title=modalScan.sources.find(s=>s.text&&s.node.path==='title'&&modalScan.sources.some(other=>other.node.id===s.node.id)&&!['siteSettings','homepage'].includes(documents.get(s.node.id)?._type));assert.ok(title);
    const record=await client.getDocument(title.node.id);const draftId='drafts.'+record._id;
    if(await client.getDocument(draftId))report.modalDraftRefresh='Skipped: existing staff draft preserved';
    else{
     const clean={...record};delete clean._rev;delete clean._createdAt;delete clean._updatedAt;const marker='Modal audit '+randomUUID();
     const draft=await client.create({...clean,_id:draftId,title:record.title+' ['+marker+']'});ownDrafts.set(draftId,draft._rev);
     report.modalPhase='Waiting for open modal refresh';try{await page.evaluate(()=>window.__channel.post('presentation/refresh',{source:'mutation',livePreviewEnabled:false}));await modal.getByText(marker,{exact:false}).waitFor({timeout:30000});report.modalDraftRefresh='Open modal updated without closing';}
     finally{await cleanDraft(draftId,draft._rev);}
    }
    await page.evaluate(()=>window.__channel.post('presentation/toggle-overlay'));await frame.waitForTimeout(100);await close.click();await page.evaluate(()=>window.__channel.post('presentation/toggle-overlay'));
   }
   await page.setViewportSize({width:390,height:844});await frame.waitForTimeout(300);
   const phoneScan=await inspect(frame);const phoneText=phoneScan.sources.find(s=>s.main&&s.text&&s.node.id===selected.node.id&&normalize(s.node.path)===normalize(selected.node.path));assert.ok(phoneText,'Selected field remains present on phone');
   report.phoneTextClick=await clickField(page,frame,phoneText);
   await page.setViewportSize({width:1440,height:1000});
   report.status=scan.broken.length?'mapping gaps':report.imageClickError||report.headlineClickError||report.buttonClickError||report.recordClickError?'failed':'passed';
  }catch(e){report.status='failed';report.errors.push(e.message.split('\n')[0]);if(e.actual!==undefined)report.actual=e.actual;if(e.expected!==undefined)report.expected=e.expected;report.host=await page.evaluate(()=>({statuses:window.__statuses,messages:window.__messages?.slice(-8)}));const debugFrame=page.frames().find(f=>f!==page.mainFrame());if(debugFrame){report.overlayState=await debugFrame.evaluate(()=>({root:!!document.querySelector('sanity-visual-editing'),overlayNodes:[...document.querySelectorAll('*')].filter(el=>el.tagName.toLowerCase().includes('sanity')).map(el=>el.tagName),scripts:document.scripts.length}));await page.screenshot({path:'.cms-work/visual-pages/failure.png'});writeFileSync('.cms-work/visual-pages/frame.html',await debugFrame.content());}}
  writeFileSync(reportFile,JSON.stringify({reports,errors,scope:'Actual live overlays, official Comlink test host; personal Studio login not exercised'},null,2));
  console.log(JSON.stringify(report));
 }
 await context.request.get(base+'/api/draft-mode/disable');
 writeFileSync(reportFile,JSON.stringify({reports,errors,scope:'Actual live overlays, official Comlink test host; personal Studio login not exercised'},null,2));
 console.log(JSON.stringify({routes:reports.length,passed:reports.filter(r=>r.status==='passed').length,browserErrors:errors}));
 if(reports.some(r=>r.status!=='passed'&&!(scanOnly&&r.status==='scanned'))||errors.length)process.exitCode=1;
}finally{
 await browser.close();
 for(const [id,rev]of ownDrafts)await cleanDraft(id,rev);
 await client.delete('drafts.'+secretId);
 console.log('Only this audit\'s unchanged drafts and preview secret were removed.');
}
