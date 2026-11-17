# Integração das Superaulas — WOA Talk

A aplicação Superaulas foi incorporada ao repositório `woatalk-lancamentos`.

## Rotas

- `/` redireciona para `/blacknovember`.
- `/blacknovember` mantém a campanha Black November principal.
- `/blacknovember/superaulas` entrega a aplicação Superaulas integrada.
- `/blacknovember/superaulas/privacidade` contém a política de privacidade da aplicação.
- `/blacknovember/superaulas/api/leads` recebe os cadastros da página de Superaulas.

## Infraestrutura

- Um único projeto Next.js.
- Um único repositório GitHub.
- Um único projeto/deploy Vercel.
- Os assets das Superaulas ficam em `public/blacknovember/superaulas/`.
- Não há mais rewrite nem dependência do domínio `woatalk-superaulas.vercel.app`.

## Variáveis de ambiente

A API de leads das Superaulas utiliza as mesmas variáveis seguras do projeto principal:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

Não configure a chave secreta no prefixo `NEXT_PUBLIC_`.

## Publicação

1. Substitua o conteúdo do repositório principal pelo conteúdo deste pacote.
2. Faça commit na branch `main`.
3. A Vercel deve construir o projeto Next.js a partir da raiz do repositório.
4. Confirme o deploy e teste as rotas listadas acima.
