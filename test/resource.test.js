import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('unknown prices and explicit zero are different menu facts',()=>{const d=structuredClone(data);d.items[0].price='0';const r=analyse(d);assert.equal(r.groups[0].items[0].priceDisplay,'£0.00');assert.match(render(r),/Price to confirm/);});
test('unavailable items remain honestly labelled and notes stay verbatim',()=>{const html=render(analyse(data));assert.match(html,/Currently unavailable/);assert.match(html,/Ingredients vary/);});
test('rejects inferred boolean availability and malformed amounts',()=>{const d=structuredClone(data);d.items[0].available='yes';assert.throws(()=>analyse(d),/boolean/);d.items[0].available=true;d.items[0].price='1e3';assert.throws(()=>analyse(d),/decimal/);});
