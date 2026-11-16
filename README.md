# WOA Talk — Lançamentos | Black November

Repositório responsável pelo site principal da WOA Talk, pela landing page Black November e pela integração de acesso à aplicação independente Super Aulas.

## 1. Identificação do projeto

| Item | Informação |
|---|---|
| Projeto Vercel | `woatalk-lancamentos` |
| Repositório GitHub | `WemersonOliveira/-woatalk-lancamentos` |
| Branch principal | `main` |
| Domínio oficial | https://www.woatalk.com.br |
| Landing page | https://www.woatalk.com.br/blacknovember |
| Rota Super Aulas | https://www.woatalk.com.br/blacknovember/superaulas |
| Framework | Next.js |
| Banco de dados | Supabase |
| Deploy | Vercel |

**Atenção:** o nome do projeto na Vercel é `woatalk-lancamentos`, enquanto o nome do repositório GitHub começa com hífen: `-woatalk-lancamentos`.

---

## 2. Responsabilidade deste repositório

Este repositório é responsável por:

- Site principal `www.woatalk.com.br`.
- Landing page `/blacknovember`.
- Formulários e captura de leads da campanha.
- API de cadastro de leads.
- Integrações próprias da campanha.
- Configurações de domínio e encaminhamento de rotas.
- Integração de acesso à aplicação Super Aulas.

**Não é responsável pelo código interno da aplicação Super Aulas.**

O código das Super Aulas está em outro repositório, com projeto Vercel e configuração próprios.

---

## 3. Arquitetura dos dois projetos

A WOA Talk utiliza dois projetos independentes na Vercel e dois repositórios GitHub.

| Aplicação | Projeto Vercel | Repositório GitHub |
|---|---|---|
| Site e Black November | `woatalk-lancamentos` | `-woatalk-lancamentos` |
| Super Aulas | `woatalk-superaulas` | `woatalk-superaulas` |

### Fluxo de acesso

```text
https://www.woatalk.com.br
          |
          v
Vercel: woatalk-lancamentos
          |
          |-- /
          |    Site principal
          |
          |-- /blacknovember
          |    Landing page Black November
          |
          |-- /blacknovember/superaulas
                    |
                    v
              Rewrite / encaminhamento
                    |
                    v
              Vercel: woatalk-superaulas
                    |
                    v
              Aplicação Super Aulas
```

### Projeto independente Super Aulas

- Repositório: https://github.com/WemersonOliveira/woatalk-superaulas
- Projeto Vercel: `woatalk-superaulas`
- Rota oficial: `/blacknovember/superaulas`

A aplicação possui configuração própria de rota e não deve ser confundida com a landing page principal.

---

## 4. Regra fundamental: onde alterar cada coisa

| Alteração | Repositório correto |
|---|---|
| Site principal | `-woatalk-lancamentos` |
| Landing page Black November | `-woatalk-lancamentos` |
| Formulário de leads da campanha | `-woatalk-lancamentos` |
| API `/api/leads` | `-woatalk-lancamentos` |
| Integração Supabase da campanha | `-woatalk-lancamentos` |
| Encaminhamento do domínio oficial | `-woatalk-lancamentos` |
| `vercel.json` do domínio principal | `-woatalk-lancamentos` |
| Layout das Super Aulas | `woatalk-superaulas` |
| Componentes das Super Aulas | `woatalk-superaulas` |
| Rotas internas das Super Aulas | `woatalk-superaulas` |
| CSS e imagens das Super Aulas | `woatalk-superaulas` |
| `basePath` das Super Aulas | `woatalk-superaulas` |

**Não editar os dois projetos para resolver um único problema sem antes identificar sua origem.**

---

## 5. Estrutura do projeto

Estrutura observada no repositório:

```text
-woatalk-lancamentos/
│
├── .github/
│   └── workflows/
│
├── public/
│
├── scripts/
│
├── src/
│   └── app/
│
├── supabase/
│   └── migrations/
│
├── tests/
│
├── .env.example
├── .gitignore
├── ATUALIZAR-DESIGN.md
├── ENTREGA-OLIVER.md
├── GUIA-COMPLETO.md
├── INTEGRACAO-BLACKNOVEMBER.md
├── README.md
├── SUPABASE-SETUP.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── vercel.json
```

Consulte os documentos complementares antes de modificar funcionalidades já existentes.

---

## 6. Ambiente de desenvolvimento

### Requisitos

- Node.js 24 LTS
- npm
- Git
- Conta Supabase para configuração do banco
- Conta Vercel para publicação

### Instalação

```bash
npm ci
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Configure as variáveis necessárias no `.env.local`.

Execute o projeto:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

---

## 7. Supabase — Banco de dados e leads

Este projeto utiliza Supabase para armazenar os cadastros da campanha.

### Migração SQL

Arquivo de migração documentado:

```text
supabase/migrations/202611030001_create_black_november_leads.sql
```

A migração cria a estrutura necessária para armazenar os leads da campanha.

### Segurança

- RLS habilitado.
- Acesso direto de `anon` e `authenticated` à tabela de leads não é permitido conforme a configuração documentada.
- As operações de cadastro são realizadas pelo servidor.
- A chave secreta deve permanecer exclusivamente no servidor.

### Variáveis do servidor

```env
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

**Nunca utilizar `SUPABASE_SECRET_KEY` com prefixo `NEXT_PUBLIC_`.**

Não publicar chaves privadas no GitHub, no navegador ou em arquivos públicos.

### Funcionamento da captura

A rota:

```text
POST /api/leads
```

É responsável por:

- Validar os campos recebidos.
- Registrar consentimento.
- Armazenar informações de campanha e UTMs.
- Verificar duplicidade conforme a implementação.
- Registrar o cadastro no banco.

O formulário deve respeitar as validações e o fluxo de consentimento existentes.

---

## 8. Variáveis de ambiente na Vercel

Na captura de configuração do projeto `woatalk-lancamentos`, aparecem as seguintes variáveis:

| Variável | Ambiente |
|---|---|
| `LEAD_CAPTURE_ENABLED` | Production e Preview |
| `NEXT_PUBLIC_BASE_PATH` | Production e Preview |
| `NEXT_PUBLIC_SUPABASE_URL` | Production e Preview |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Production e Preview |
| `SUPABASE_SECRET_KEY` | Production |
| `SUPABASE_URL` | Production |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Production |
| `NEXT_PUBLIC_PRIVACY_URL` | Production |

Os valores devem ser consultados diretamente no painel da Vercel.

Não copiar variáveis ou valores do projeto Super Aulas sem verificar a necessidade.

---

## 9. Vercel — Deploy e domínio

### Projeto responsável

```text
woatalk-lancamentos
```

Este projeto está associado ao domínio:

```text
www.woatalk.com.br
```

Rotas sob sua responsabilidade:

```text
/
 /blacknovember
```

Também participa do encaminhamento da rota:

```text
/blacknovember/superaulas
```

### Arquivo de roteamento

```text
vercel.json
```

As regras de redirect e rewrite devem ser preservadas e revisadas antes de qualquer alteração.

**Atenção:** modificar o `vercel.json` pode afetar o site principal, a campanha e a integração com Super Aulas.

### Regras para publicação

1. Conferir a branch de produção.
2. Revisar o Pull Request.
3. Validar os testes.
4. Fazer merge na branch principal.
5. Aguardar o deploy da Vercel.
6. Confirmar o status Ready.
7. Testar as rotas oficiais.

---

## 10. Integração com Super Aulas

A rota oficial:

```text
https://www.woatalk.com.br/blacknovember/superaulas
```

É encaminhada para a aplicação independente:

```text
https://woatalk-superaulas.vercel.app/BlackNovember/superaulas
```

O projeto independente utiliza o prefixo de rota configurado no próprio repositório.

### Atenção ao carregamento dos assets

A integração entre dois projetos pode apresentar problemas de carregamento de:

- CSS.
- JavaScript.
- Imagens.
- Fontes.
- Outros arquivos estáticos.

O HTML carregar não significa que a integração esteja completamente funcional.

É necessário validar o layout e os recursos estáticos pela URL oficial.

### Responsabilidades

| Problema | Onde investigar |
|---|---|
| Rewrite não encaminha a rota | `vercel.json` deste repositório |
| Página principal apresenta erro | Este repositório |
| Black November apresenta erro | Este repositório |
| Layout das Super Aulas | Repositório `woatalk-superaulas` |
| `basePath` incorreto | Repositório `woatalk-superaulas` |
| CSS e JS das Super Aulas | Repositório `woatalk-superaulas` |
| Assets não carregam pelo domínio oficial | Investigar a integração dos dois projetos |

### Estado técnico registrado

O encaminhamento da rota oficial foi ajustado por meio de `rewrites`.

O erro 404 foi resolvido, mas foi identificado um problema de carregamento dos arquivos de estilo e scripts na rota oficial.

Portanto, a integração ainda precisa de validação visual completa.

---

## 11. Testes e validação

Comandos documentados:

```bash
npm test
npm run build
```

Os testes existentes incluem verificações de fluxo de cadastro e build.

A documentação anterior informa que os testes de captura podem utilizar respostas simuladas, sem necessariamente validar uma conexão real com o Supabase.

Por isso, antes da publicação, também é necessário validar a integração real em ambiente apropriado.

### Checklist

- [ ] Instalação de dependências concluída.
- [ ] Build concluído sem erros.
- [ ] Testes concluídos.
- [ ] Variáveis de ambiente configuradas.
- [ ] Migração Supabase aplicada.
- [ ] Formulário testado.
- [ ] Cadastro validado no banco.
- [ ] Consentimento validado.
- [ ] Links externos conferidos.
- [ ] Deploy Ready na Vercel.
- [ ] Domínio oficial testado.

---

## 12. Git — Branches e Pull Requests

A branch principal identificada nas capturas é:

```text
main
```

As alterações devem ser feitas em branches específicas.

### Fluxo recomendado

```bash
git checkout main
git pull origin main

git checkout -b feature/nome-da-alteracao

# Realizar alterações

git add .
git commit -m "feat: descricao da alteracao"

git push -u origin feature/nome-da-alteracao
```

Depois:

1. Abrir Pull Request.
2. Revisar os arquivos modificados.
3. Verificar os checks.
4. Aprovar e integrar.
5. Confirmar o deploy na Vercel.

Não considerar uma alteração publicada apenas porque foi enviada para uma branch.

---

## 13. Git e backup

O GitHub é o repositório oficial do código-fonte.

Recomendações:

- Versionar código e arquivos de configuração não secretos.
- Manter `package-lock.json` atualizado.
- Não versionar `.env.local`.
- Não versionar chaves ou credenciais.
- Manter migrações SQL no histórico Git.
- Revisar alterações antes de cada merge.
- Preservar o histórico de commits.

O histórico Git não substitui o backup do banco de dados Supabase.

---

## 14. Segurança e cuidados

- Nunca publicar segredos no GitHub.
- Não expor chaves administrativas no frontend.
- Não remover políticas RLS sem análise.
- Não alterar migrações já aplicadas sem avaliar o impacto.
- Não substituir configurações de produção por valores locais.
- Não modificar regras de domínio sem validar as rotas dependentes.
- Não confundir variáveis de ambiente dos dois projetos.

---

## 15. Links oficiais de referência

### Projeto Lançamentos

- Vercel: https://vercel.com/
- GitHub: https://github.com/WemersonOliveira/-woatalk-lancamentos
- Site: https://www.woatalk.com.br
- Black November: https://www.woatalk.com.br/blacknovember

### Projeto Super Aulas

- GitHub: https://github.com/WemersonOliveira/woatalk-superaulas
- Vercel: `woatalk-superaulas`
- URL oficial: https://www.woatalk.com.br/blacknovember/superaulas

---

## 16. Regras finais para manutenção

1. Este repositório é responsável pelo site principal e Black November.
2. O repositório `woatalk-superaulas` é responsável pela aplicação Super Aulas.
3. Cada repositório possui seu próprio projeto Vercel.
4. Cada projeto possui suas próprias variáveis de ambiente.
5. O domínio oficial conecta as duas aplicações por meio de roteamento.
6. Alterações devem ser feitas no repositório responsável pela funcionalidade.
7. Todo deploy deve ser validado na URL oficial.
8. O carregamento visual completo deve ser testado, não apenas a resposta HTML.

**Princípio operacional: antes de alterar qualquer arquivo, identifique a aplicação responsável, o repositório correto e o projeto Vercel correspondente.**
