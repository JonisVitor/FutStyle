# Modelo de dados — FutStyle

Documento de referência para a futura integração do catálogo front-end com um backend.

## Entidades principais

### `products`

- `id`: identificador único.
- `name`: nome comercial da camisa.
- `team`: time.
- `league`: liga ou campeonato.
- `color`: cor principal.
- `season`: temporada.
- `price_cents`: preço em centavos.
- `stock_quantity`: estoque disponível.
- `image_url`: imagem do produto quando houver asset real.
- `is_featured`: destaque editorial.
- `created_at`, `updated_at`: auditoria.

### `users`

- `id`: identificador único.
- `name`: nome exibido.
- `email`: único e normalizado.
- `password_hash`: nunca armazenar senha em texto puro.
- `created_at`, `updated_at`: auditoria.

### `favorites`

- `user_id`: referência a `users`.
- `product_id`: referência a `products`.
- chave única composta por `user_id` + `product_id`.

### `cart_items`

- `id`: identificador único.
- `user_id`: referência a `users`.
- `product_id`: referência a `products`.
- `quantity`: quantidade desejada.
- `created_at`, `updated_at`: auditoria.

### `orders`

- `id`: identificador único.
- `user_id`: referência a `users`.
- `status`: `pending`, `paid`, `cancelled` ou `completed`.
- `total_cents`: total congelado no momento do pedido.
- `created_at`, `updated_at`: auditoria.

### `order_items`

- `id`: identificador único.
- `order_id`: referência a `orders`.
- `product_id`: referência a `products`.
- `product_name_snapshot`: nome no momento da compra.
- `unit_price_cents`: preço no momento da compra.
- `quantity`: quantidade comprada.

## Relações

```text
users 1──N favorites N──1 products
users 1──N cart_items N──1 products
users 1──N orders 1──N order_items N──1 products
```

## Regras de integridade

- Valores monetários devem ser armazenados como inteiros em centavos.
- E-mail deve ser único, normalizado e validado no backend.
- Favoritos e itens de carrinho devem impedir duplicação da mesma combinação usuário/produto.
- O preço e o nome em `order_items` são snapshots; alterações futuras em `products` não alteram pedidos antigos.
- O estoque deve ser validado no servidor antes de confirmar um pedido.
- O front-end atual permanece demonstrativo e não deve tratar `localStorage` como autenticação ou banco de produção.

## Próxima implementação recomendada

Escolher backend, banco, autenticação e estratégia de migração antes de desenvolver as tarefas de banco e cadastro.

