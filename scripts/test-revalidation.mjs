import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { parseBody } from "next-sanity/webhook";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
const require = createRequire(import.meta.url);
const code = ts.transpileModule(readFileSync("src/app/api/revalidate/route.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function handler(secret) {
  const loadedModule = { exports: {} }, calls = [];
  runInNewContext(`(function(require,module,exports){${code}\n})`, { process: { env: { SANITY_REVALIDATE_SECRET: secret } } })((name) => name === "next/cache" ? { revalidateTag: (...args) => calls.push(args) } : name === "next-sanity/webhook" ? { parseBody } : require(name), loadedModule, loadedModule.exports);
  return { ...loadedModule.exports, calls };
}
const request = (body = "{}", signature) => new Request("https://example.invalid/api/revalidate", { method: "POST", headers: signature ? { [SIGNATURE_HEADER_NAME]: signature } : {}, body });
test("missing configuration fails closed and GET cannot invalidate", async () => {
  const route = handler(undefined);
  assert.equal((await route.POST(request())).status, 503);
  assert.equal(route.GET, undefined);
  assert.equal(route.calls.length, 0);
});
test("unsigned and tampered webhook requests never invalidate content", async () => {
  const route = handler("test-secret");
  assert.equal((await route.POST(request())).status, 401);
  const signature = await encodeSignatureHeader('{"event":"publish"}', Date.now(), "test-secret");
  assert.equal((await route.POST(request('{"event":"tampered"}', signature))).status, 401);
  assert.equal(route.calls.length, 0);
});
test("a genuine signed webhook invalidates only the public-content tag", async () => {
  const route = handler("test-secret");
  const body = '{"event":"publish"}';
  const signature = await encodeSignatureHeader(body, Date.now(), "test-secret");
  assert.equal((await route.POST(request(body, signature))).status, 200);
  assert.deepEqual(route.calls[0], ["madrasha-public-content", "max"]);
  assert.equal(route.calls.length, 1);
});
