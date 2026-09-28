# FutStyle — catálogo de camisas com Node + Express + PostgreSQL

Versão do site FutStyle integrada a um banco de dados PostgreSQL. As camisas
não estão mais fixas no `script.js`: elas ficam no banco e chegam à tela por
uma API REST feita em Express.

## Como rodar

```bash
docker compose up --build
```

- Site: http://localhost:3000
- API: http://localhost:3000/camisa
- pgweb (visualizar o banco): http://localhost:8081

O arquivo `init.sql` roda automaticamente na primeira vez que o container do
Postgres é criado. Se você alterar o `init.sql` depois disso, é preciso apagar
o volume para ele rodar de novo:

```bash
docker compose down -v
docker compose up --build
```

## Estrutura do banco

```text
ligas (1) ──── (N) times (1) ──── (N) camisas
```

| Tabela    | Campos |
|-----------|--------|
| `ligas`   | `id`, `nome` (único) |
| `times`   | `id`, `nome`, `liga_id` → `ligas.id`, único por (nome, liga) |
| `camisas` | `id`, `nome` (único), `cor`, `temporada`, `preco_centavos`, `estoque`, `destaque`, `time_id` → `times.id`, `criado_em` |

Regras aplicadas no banco:

- Preço guardado em centavos (inteiro), com `CHECK (preco_centavos > 0)`.
- `CHECK (estoque >= 0)`.
- `ON DELETE CASCADE`: apagar uma liga apaga seus times e camisas.
- `UNIQUE (nome, liga_id)` em `times` permite o mesmo clube em ligas
  diferentes (ex.: Real Madrid na La Liga e na categoria Retrô).

Dados iniciais: 10 ligas, 30 times e as 30 camisas que antes estavam no
JavaScript.

## Rotas da API

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/liga` | lista as ligas |
| GET | `/liga/:id` | busca uma liga |
| POST | `/liga` | cadastra liga — body: `{ "nome": "..." }` |
| PUT | `/liga/:id` | edita liga |
| DELETE | `/liga/:id` | apaga liga (cascata) |
| GET | `/time` `/time?liga_id=1` | lista times (com o nome da liga) |
| GET | `/time/:id` | busca um time |
| POST | `/time` | cadastra time — body: `{ "nome": "...", "liga_id": 1 }` |
| PUT | `/time/:id` | edita time |
| DELETE | `/time/:id` | apaga time (cascata) |
| GET | `/camisa` | lista camisas com time e liga |
| GET | `/camisa/:id` | busca uma camisa |
| POST | `/camisa` | cadastra camisa |
| PUT | `/camisa/:id` | edita camisa (campos parciais) |
| DELETE | `/camisa/:id` | apaga camisa |

`GET /camisa` aceita filtros pela query string, feitos em SQL:

```
/camisa?liga=Premier League
/camisa?time=Barcelona&cor=Azul
/camisa?preco_max=140&ano=2026
/camisa?busca=real
/camisa?destaque=true
```

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/camisa \
  -H "Content-Type: application/json" \
  -d '{"nome":"Santos I 2026","cor":"Branco","temporada":"2026","preco":134.90,"estoque":10,"time_id":13}'
```

## Como o site conversa com o banco

1. `src/static/script.js` chama `fetch("/camisa")` assim que a página abre.
2. A rota `src/routes/camisa.js` faz o `JOIN` entre `camisas`, `times` e
   `ligas` e devolve JSON (com `preco` já convertido de centavos para reais).
3. O script converte cada linha para o formato que a tela já usava e chama
   `renderProdutos`, `renderLigas` e os filtros.

Ou seja: para mudar o catálogo, basta mexer no banco — a tela acompanha.
Carrinho e favoritos continuam no `localStorage` (demonstrativo) e agora
descartam automaticamente itens que não existem mais no banco.

## Arquivos

```
FutStyle/
├── docker-compose.yml
├── Dockerfile
├── init.sql              estrutura + dados iniciais
├── package.json
└── src/
    ├── db.js             pool de conexão e helper de transação
    ├── index.js          servidor Express
    ├── routes/
    │   ├── liga.js
    │   ├── time.js
    │   └── camisa.js
    └── static/           front-end (index.html, style.css, script.js)
```
