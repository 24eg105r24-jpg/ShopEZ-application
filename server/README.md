# ShopEZ API

Node.js + Express + MongoDB (Mongoose) + JWT backend for the ShopEZ storefront.

## Stack
- Express.js — REST API
- MongoDB / Mongoose — data store
- JSON Web Tokens — authentication (buyer & seller roles)
- bcryptjs — password hashing

## Setup

```bash
cd server
npm install
cp .env.example .env      # then edit .env with your Mongo URI + JWT secret
npm run seed               # populates the catalog + demo accounts
npm run dev                 # starts the API on http://localhost:5000
```

Demo accounts created by the seed script:

| Role   | Email               | Password    |
|--------|---------------------|-------------|
| Seller | seller@shopez.com   | password123 |
| Buyer  | buyer@shopez.com    | password123 |

## API overview

Base URL: `http://localhost:5000/api`

### Auth
| Method | Route            | Auth | Description |
|--------|------------------|------|--------------|
| POST   | /auth/register   | –    | Create an account (`role`: `buyer` \| `seller`) |
| POST   | /auth/login      | –    | Returns a JWT + user profile |
| GET    | /auth/me         | ✅   | Current user profile |

### Products
| Method | Route                     | Auth   | Description |
|--------|---------------------------|--------|--------------|
| GET    | /products                 | –      | List products (`?category=`, `?sort=low\|high`, `?search=`) |
| GET    | /products/categories      | –      | List categories |
| GET    | /products/:slug           | –      | Product detail incl. reviews |
| POST   | /products                 | seller | Create a product |
| PUT    | /products/:slug           | seller | Update a product you own |
| DELETE | /products/:slug           | seller | Delete a product you own |
| POST   | /products/:slug/reviews   | any    | Add a review |

### Orders
| Method | Route               | Auth   | Description |
|--------|---------------------|--------|--------------|
| POST   | /orders             | buyer  | Place an order — `{ items: [{ slug, quantity }], shippingAddress }` |
| GET    | /orders/mine        | buyer  | Your own orders |
| GET    | /orders             | seller | All orders (seller portal) |
| GET    | /orders/:id         | owner/seller | Order detail |
| PATCH  | /orders/:id/status  | seller | Update status |

### Dashboard (seller only)
| Method | Route                 | Description |
|--------|-----------------------|--------------|
| GET    | /dashboard/summary    | Revenue, active orders, repeat rate, monthly sales, top products |
| GET    | /dashboard/inventory  | Stock levels per product |

All protected routes expect `Authorization: Bearer <token>`.

## Notes
- Product images are **not** stored by the API. Each product has an `imageKey`
  matching its `slug`; the React frontend keeps a small local map from
  `imageKey` to the bundled image asset (see `src/lib/productImages.ts`).
  This keeps the original bundled photography without needing a file-upload
  pipeline.
