# WOA TALK — LANÇAMENTOS

Repositório oficial do site WOA Talk, responsável pela campanha Black November e pela aplicação WOA Exclusive — Superaulas.

## 1. Identificação

| Item | Informação |
|---|---|
| Projeto Vercel | `woatalk-lancamentos` |
| Repositório GitHub | `WemersonOliveira/-woatalk-lancamentos` |
| Branch principal | `main` |
| Domínio | https://www.woatalk.com.br |
| Framework | Next.js |
| Banco de dados | Supabase |
| Deploy | Vercel |

## 2. Arquitetura

As aplicações Black November e Superaulas foram integradas em um único projeto Next.js, centralizando código, versionamento e publicação.

**Rotas oficiais:**

- `/` — Site principal.
- `/blacknovember` — Landing page da campanha.
- `/blacknovember/superaulas` — WOA Exclusive — Superaulas.

As duas páginas são publicadas pelo mesmo projeto Vercel e mantidas no mesmo repositório GitHub.

## 3. Tecnologias

- Next.js
- React
- TypeScript
- Supabase
- Vercel
- GitHub

## 4. Funcionalidades

**Black November**
- Landing page da campanha.
- Captura e cadastro de leads.
- Integração com Supabase.
- Formulários e consentimento de privacidade.
- Links de comunicação e inscrição.

**Superaulas**
- Quatro aulas especiais.
- Materiais complementares em PDF.
- Planos de conversação.
- Links de pagamento via Asaas.
- Formulários e recursos de inscrição.

## 5. Desenvolvimento

Requisitos: Node.js e npm.

Instalar dependências:

```bash
npm ci
```

Executar localmente:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Acessar localmente:

```text
http://localhost:3000
```

## 6. Publicação

O deploy é realizado automaticamente pela Vercel após as alterações serem integradas à branch `main`.

Fluxo recomendado:

1. Criar branch para alterações.
2. Implementar e testar.
3. Executar o build.
4. Revisar as alterações.
5. Integrar à `main`.
6. Validar o deploy na Vercel.

## 7. Variáveis e integrações

As variáveis de ambiente são administradas diretamente no painel da Vercel.

Integrações existentes:
- Supabase: banco de dados e captura de leads.
- Asaas: pagamentos dos planos.
- WhatsApp: comunicação com participantes.

**Atenção:** não alterar variáveis, credenciais ou integrações sem necessidade. Nunca publicar chaves secretas no GitHub.

## 8. Histórico da integração

Em novembro de 2026, foi realizada a consolidação das aplicações Black November e Superaulas.

O trabalho foi conduzido com auxílio do agente de IA ChatGPT, incluindo:

- Unificação dos códigos em um único projeto.
- Centralização do repositório GitHub.
- Centralização do deploy na Vercel.
- Correção de imports, componentes, assets e estilos.
- Ajustes de rotas e resolução do erro 404.
- Validações sucessivas de build e publicação.

**Resultado:** aplicação integrada e publicada em produção.

## 9. Manutenção

Antes de qualquer alteração:

- Preservar as rotas existentes.
- Não remover funcionalidades sem análise.
- Não alterar configurações de produção desnecessariamente.
- Validar formulários, imagens, PDFs e pagamentos.
- Executar build antes de publicar.
- Conferir as duas páginas após cada deploy.

## 10. URLs oficiais

- Site: https://www.woatalk.com.br
- Black November: https://www.woatalk.com.br/blacknovember
- Superaulas: https://www.woatalk.com.br/blacknovember/superaulas
- GitHub: https://github.com/WemersonOliveira/-woatalk-lancamentos

---

**Status do projeto:** integrado, publicado e funcional em produção.

Pequenos ajustes visuais e funcionais permanecem como melhorias futuras.
