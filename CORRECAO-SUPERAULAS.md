# Correção de publicação — Superaulas

## O que foi corrigido

1. Os quatro PDFs originais foram copiados byte a byte para:
   `public/blacknovember/superaulas/materials/`.
2. O `.gitignore` deixou de ignorar toda a pasta `public/blacknovember/`.
   Os assets públicos precisam ser versionados para entrar no deploy da Vercel.
3. `assetPath()` agora usa o prefixo fixo `/blacknovember/superaulas`, que é
   a rota integrada. Assim, um valor legado de `NEXT_PUBLIC_BASE_PATH` não
   consegue gerar links de materiais com caminho incorreto.
4. Os checkouts Asaas continuam com os mesmos 11 destinos documentados na
   versão original. Eles abrem em nova aba.
5. O checkout 3 meses / lote 3 foi desabilitado: a revisão da versão original
   registrou HTTP 500 nesse destino. Ele só deve ser reativado quando Oliver
   inserir o link corrigido diretamente do painel Asaas.
6. Foram adicionados testes de regressão para os PDFs, prefixo de assets,
   `.gitignore` e associação dos checkouts.

## Validação executada

- `npm test`: 25 testes aprovados, 0 falhas.
- SHA-256 dos quatro PDFs conferido contra os arquivos da versão original.
- Nenhuma variável de ambiente, domínio, Supabase ou rota da campanha principal
  foi alterada.

## Limitações que permanecem

- O build de produção não foi executado neste ambiente. O Node instalado é
  v22.16.0, mas o projeto exige Node >=22.18.0; além disso, as dependências
  não foram instaladas nesta cópia. Execute `npm ci` e `npm run build` usando
  Node 22.18+ (preferencialmente Node 24 LTS) antes do deploy.
- A consulta externa dos links Asaas não pôde ser repetida neste ambiente.
  A documentação da versão original registrou 11 checkouts com HTTP 200 e
  o checkout 3 meses / lote 3 com HTTP 500 em 10/11/2026. Os 11 endereços
  foram preservados exatamente; isso não garante que o Asaas não tenha
  alterado algum checkout desde aquela conferência.
- Nenhuma cobrança foi realizada e nenhum deploy foi publicado.

## Próximo passo para o checkout pendente

No painel Asaas, localize o link de pagamento correto para o plano de 3 meses,
lote 3, e substitua o valor `null` em
`src/app/blacknovember/superaulas/_lib/campaign.ts`. Depois execute novamente
`npm test` e `npm run build`.
