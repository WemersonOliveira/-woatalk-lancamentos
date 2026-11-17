import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("os quatro PDFs são idênticos aos materiais da versão original funcional", () => {
  const expectedSha256 = [
    "719a9aa8b0b6ede0b61ae59462cabc8bd157ac97223530c709f9af790512322f",
    "5e23da66432fcfd861ea899a99b99382de0da1ad190160ee1356d862bbb716c9",
    "ec5840164f46fa925c4f8a774ef8eb428d5379c7566d7d04ed4e812f5514c25d",
    "33c74517ae26a8405f224db5992edd699f639df6c1f95933640dbb568e420cab",
  ];
  for (let aula = 1; aula <= 4; aula++) {
    const path = new URL(`public/blacknovember/superaulas/materials/aula-${aula}.pdf`, root);
    assert.ok(existsSync(path), `PDF da aula ${aula} ausente`);
    const bytes = readFileSync(path);
    assert.equal(bytes.subarray(0, 5).toString("ascii"), "%PDF-", `PDF ${aula} inválido`);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      expectedSha256[aula - 1],
      `PDF ${aula} diverge do arquivo original funcional`,
    );
  }
});

test("assetPath usa sempre o prefixo fixo da rota integrada", () => {
  const source = read("src/app/blacknovember/superaulas/_lib/campaign.ts");
  assert.match(source, /const SUPER_AULAS_ASSET_PREFIX = "\/blacknovember\/superaulas"/);
  assert.doesNotMatch(source, /process\.env\.NEXT_PUBLIC_BASE_PATH/);
  assert.match(source, /return `\$\{SUPER_AULAS_ASSET_PREFIX\}\$\{path\}`/);
});

test("os assets públicos da campanha não são ignorados pelo Git", () => {
  const ignore = read(".gitignore");
  assert.doesNotMatch(ignore, /^\/public\/blacknovember\/\s*$/m);
});

test("os 11 checkouts documentados permanecem associados ao plano e lote corretos", () => {
  const source = read("src/app/blacknovember/superaulas/_lib/campaign.ts");
  const expected = [
    ["3-meses-lote-1", "9eg0onuzb6usegto"],
    ["3-meses-lote-2", "jrfcw4vkwv3hey3m"],
    ["3-meses-lote-4", "v3jugdwrjh7gmgky"],
    ["6-meses-lote-1", "93rtufqntbidpmzc"],
    ["6-meses-lote-2", "b65cirbkhghhptgq"],
    ["6-meses-lote-3", "hdn630j5akbuymnj"],
    ["6-meses-lote-4", "wj8jioz7kf18xbrf"],
    ["1-ano-lote-1", "kmzr22udf41fn6rb"],
    ["1-ano-lote-2", "042pwkw5fmbr0ykz"],
    ["1-ano-lote-3", "o5ejwsdqnni48pwh"],
    ["1-ano-lote-4", "305oza8z8wbti6yg"],
  ];
  for (const [key, id] of expected) {
    assert.ok(source.includes(`"${key}": "https://www.asaas.com/000/c/${id}"`), `Checkout divergente: ${key}`);
  }
  assert.match(source, /"3-meses-lote-3": null/);
  assert.match(source, /pixUrl: "https:\/\/www\.asaas\.com\/000\/c\/zdi9uwkmtojxpfeb"/);
});

test("links de checkout abrem em nova aba com proteção noopener", () => {
  const source = read("src/app/blacknovember/superaulas/_components/pricing-table.tsx");
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
});
