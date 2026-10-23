import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const { chromium }=await import(process.env.PLAYWRIGHT_MODULE||"playwright");
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE||undefined});
const base=process.env.QA_BASE_URL||"http://localhost:3020";
const routes=Object.entries(JSON.parse(readFileSync("src/content/coverage.json","utf8"))).filter(([,item])=>!item.redirect).map(([route])=>route);
const results=[];const errors=[];
mkdirSync(".cms-work/public-qa",{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage(); let currentRoute="";
 page.on("pageerror",error=>errors.push({route:currentRoute,message:error.message,stack:error.stack}));
 page.on("console",message=>{if(message.type()==="error" && /same key|hydration|Minified React|Error:/.test(message.text()))errors.push({route:currentRoute,message:message.text()});});
 for(const route of routes){
  currentRoute=route;
  const start=Date.now(); const response=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:60000});
  assert.equal(response.status(),200,route);
  await page.locator("nav").first().waitFor();
  await page.waitForFunction(() => getComputedStyle(document.querySelector("nav")).position === "sticky");
  if(route==="/") {
   const intro=page.locator(".website-intro");
   await intro.waitFor({state:"visible",timeout:2000}).catch(()=>{});
   if(await intro.isVisible()) { await intro.getByRole("button").last().click(); await intro.waitFor({state:"detached"}); }
  }
  await page.waitForTimeout(200);
  const desktopOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(120);
  const phoneOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  if(["/","/about","/contact","/gallery","/notices","/admission"].includes(route))await page.screenshot({path:`.cms-work/public-qa/${route.replaceAll("/","_")||"home"}-phone.png`,fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  if(["/","/about","/gallery","/notices"].includes(route))await page.screenshot({path:`.cms-work/public-qa/${route.replaceAll("/","_")||"home"}-desktop.png`,fullPage:true});
  results.push({route,status:response.status(),milliseconds:Date.now()-start,desktopOverflow,phoneOverflow});
  console.log(JSON.stringify(results.at(-1)));
 }
 currentRoute="/studio";
 await page.goto(base+"/studio",{waitUntil:"domcontentloaded"});
 await page.waitForTimeout(12000);
 await page.screenshot({path:".cms-work/public-qa/studio.png"});
 const unauthorized=await page.request.get(base+"/api/draft-mode/enable?sanity-preview-secret=invalid");
 assert.ok([401,403].includes(unauthorized.status()),"Preview must reject an invalid secret");
 console.log(JSON.stringify({studioText:(await page.locator("body").innerText()).slice(0,240),previewRejectStatus:unauthorized.status(),runtimeErrors:errors}));
 writeFileSync(".cms-work/public-qa/report.json",JSON.stringify({results,errors},null,2));
 assert.deepEqual(errors,[]);
 assert.equal(results.some(item=>item.desktopOverflow||item.phoneOverflow),false,"Public route horizontal overflow");
}finally{await browser.close();}
