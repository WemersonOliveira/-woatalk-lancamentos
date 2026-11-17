import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Superaulas está integrada como rota interna do projeto principal', () => {
  assert.ok(existsSync(new URL('../src/app/blacknovember/superaulas/page.tsx', import.meta.url)));
  assert.ok(existsSync(new URL('../src/app/blacknovember/superaulas/api/leads/route.ts', import.meta.url)));
  assert.ok(existsSync(new URL('../src/app/blacknovember/superaulas/privacidade/page.tsx', import.meta.url)));
  assert.ok(existsSync(new URL('../public/blacknovember/superaulas/images/eagle-3d.webp', import.meta.url)));
  assert.ok(existsSync(new URL('../public/blacknovember/superaulas/materials/aula-4.pdf', import.meta.url)));
});

test('Superaulas não depende mais de rewrite ou domínio Vercel externo', () => {
  assert.equal(read('vercel.json').trim(), '{}');
  const source = read('src/app/blacknovember/superaulas/page.tsx');
  assert.doesNotMatch(source, /woatalk-superaulas\.vercel\.app/);
  assert.match(source, /assetPath/);
});

test('API de leads usa a tabela e as credenciais server-side do projeto principal', () => {
  const api = read('src/app/blacknovember/superaulas/api/leads/route.ts');
  assert.match(api, /SUPABASE_URL/);
  assert.match(api, /SUPABASE_SECRET_KEY/);
  assert.match(api, /black_november_leads/);
  assert.doesNotMatch(api, /NEXT_PUBLIC_SUPABASE/);
});

test('layout da Black November isola o visual próprio da rota Superaulas', () => {
  const gate = read('src/app/blacknovember/_components/CampaignLayoutGate.tsx');
  assert.match(gate, /pathname\?\.startsWith\("\/blacknovember\/superaulas"\)/);
  assert.match(gate, /return <>{children}<\/>/);
});
