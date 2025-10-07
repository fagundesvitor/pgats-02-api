# Testes de Performance com k6 (JavaScript)

## Introdução
Este repositório contém **testes de performance** automatizados escritos em **JavaScript** utilizando o **[k6](https://k6.io/)** para validar a saúde e a capacidade de resposta da API do projeto **pgats-02-api**.  
Os testes cobrem cenários essenciais como **login**, **registro de usuários** e **listagem de usuários**, com thresholds (metas) de tempo e taxa de erros.

---

## Tecnologias utilizadas
- **Node.js** (runtime da API)
- **k6** (ferramenta de teste de carga/performance)
- **JavaScript (ES modules)** para os scripts de teste

---

## Estrutura do repositório
```
pgats-02-api/
├─ app.js / server.js                 # Código da API (Node.js)
├─ package.json                       # Dependências e scripts da API
└─ test/
   ├─ fixtures/
   │  ├─ postLoginPerf.json           # Payload base para /users/login
   │  └─ postRegisterPerf.json        # Payload base para /users/register
   └─ performance/
      ├─ login-perf.test.js           # Teste de performance de Login
      ├─ register-perf.test.js        # Teste de performance de Registro
      ├─ users-perf.test.js           # Teste de performance de Listar usuários
      └─ transfers-perf.test.js       # Teste de performance de transferencias 
```

### Objetivo de cada grupo de arquivos
- **`pgats-02-api/`**  
  Código-fonte da API a ser testada (Node.js/Express).  
- **`test/fixtures/`**  
  Arquivos JSON com payloads bases a serem utilizados nos testes (ex.: corpo do POST de login/registro).  
- **`test/performance/`**  
  Scripts do k6. Cada arquivo contém:
  - `options` com **stages** (ramp-up, sustentação, ramp-down) e **thresholds** (metas como p(90), erro < 1%);
  - um `default function` que executa as requisições e **checks** (status, formato, etc).

---

## Como instalar e preparar o ambiente

> Dica: os comandos abaixo assumem **Git Bash / Linux / macOS**. Para Windows PowerShell/CMD, veja a seção de **Execução** mais abaixo.

1) **Clonar o repositório e entrar na branch**
```bash
git clone https://github.com/fagundesvitor/pgats-02-api.git
cd pgats-02-api
git checkout Testes-de-performance-login
```

2) **Instalar as dependências da API**
```bash
npm install express swagger-ui-express bcryptjs
```

3) **Subir a API localmente**
```bash
node server.js
```
> A API deve estar acessível em `http://localhost:3000`.
A documentação Swagger estará em `http://localhost:3000/api-docs`.

4) **Instalar o k6**  
Siga as instruções oficiais conforme seu SO: https://k6.io/docs/get-started/installation/

---

## Execução dos testes de performance

> Antes de rodar os testes, **mantenha a API rodando** em outro terminal.

### 1) Execução “simples” (sem dashboard)
```bash
# Login
k6 run test/performance/login-perf.test.js

# Registro de usuários
k6 run test/performance/register-perf.test.js

# Listar usuários
k6 run test/performance/users-perf.test.js
```

### 2) Execução com **dashboard em tempo real** e **exportação em HTML** (Linux/macOS/Git Bash)
O k6 possui um **web dashboard** embutido. Para habilitar e **exportar** um HTML ao final do teste, use as variáveis de ambiente:

```bash
# Login
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=login-report.html k6 run test/performance/login-perf.test.js

# Registro
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=register-report.html k6 run test/performance/register-perf.test.js

# Users
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=users-report.html k6 run test/performance/users-perf.test.js
```

Ao finalizar, o arquivo `*-report.html` será gerado na pasta atual.

## Observações importantes

- **Caminhos de fixtures** nos testes: os scripts em `test/performance/` usam `open('../fixtures/arquivo.json')`.  
  Garanta que a estrutura de pastas permaneça como mostrada acima.
- **Thresholds**: se o teste falhar com `http_req_failed` (taxa de erro > 1%) ou `http_req_duration` (ex.: `p(90)>3000`), revise a API ou ajuste os limites conforme o objetivo de performance desejados no seu sistema.
- **Dados únicos em registro**: no teste de registro, o script gera `username` único por execução usando variáveis do k6 (`__VU`, `__ITER`) para evitar “usuário já existe”.

---

## Repositório
Você encontra esta branch com todos os arquivos de teste no GitHub:  
**https://github.com/fagundesvitor/pgats-02-api/tree/Testes-de-performance-login**
oi
