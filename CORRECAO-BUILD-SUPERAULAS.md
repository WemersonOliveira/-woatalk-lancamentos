# WOA Talk — correção do build de Superaulas

Esta versão corrige dois defeitos confirmados nos logs do deploy:

1. Os imports da rota `/blacknovember/superaulas` apontavam para `@/app/...`, mas o `tsconfig.json` mapeia `@/*` para a raiz do repositório. Como o código está em `src/app/...`, os imports foram corrigidos para `@/src/app/...`.
2. O final de `src/app/blacknovember/superaulas/superaulas.css` continha os caracteres literais `\\n` antes e depois de uma regra CSS, causando erro de parsing. O fragmento inválido foi removido.

Os PDFs, arquivos de mídia, integrações e URLs de checkout foram mantidos como estavam na fonte integrada. Nenhuma variável de ambiente, domínio ou configuração Supabase foi alterada.

## Aplicação
Extraia o conteúdo deste ZIP sobre a raiz do repositório `woatalk-lancamentos`, substituindo os arquivos quando solicitado. Depois confira o diff antes de fazer commit.

## Validação
Foi feita validação estática dos imports locais e da presença dos quatro PDFs.
O build de produção não foi executado neste ambiente: o projeto exige Node >=22.18.0 e o ambiente disponível usa Node 22.16.0; além disso, as dependências do projeto não estão instaladas aqui.
Antes de publicar, execute com Node 22.18 ou superior:

```bash
npm ci
npm run build
```

Não publique se o build não terminar com sucesso.
