Nice 🎉 — since everything is working now, here’s the **clean, final list of ALL API endpoints** in your project, grouped by feature.
You can bookmark this or drop it into your README.

---

# 🌐 Lumina API – Complete Endpoint List

**Base URL**

```
http://127.0.0.1:8000/api/
```

---

## 🔐 Authentication (Accounts)

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| POST   | `/auth/token/`         | Login → get JWT access & refresh |
| POST   | `/auth/token/refresh/` | Refresh access token             |
| POST   | `/auth/register/`      | Register new user                |
| GET    | `/auth/profile/`       | Get logged-in user profile       |
| PATCH  | `/auth/profile/`       | Update user profile              |

---

## 📰 Blog API

### Categories

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/blog/categories/` | List all blog categories |

---

### Blog Posts

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | `/blog/posts/`                    | List published blog posts |
| GET    | `/blog/posts/?search=django`      | Search posts              |
| GET    | `/blog/posts/?ordering=views`     | Order posts               |
| GET    | `/blog/posts/?category_slug=tech` | Filter by category        |
| GET    | `/blog/posts/featured/`           | Featured blog posts       |
| GET    | `/blog/posts/<slug>/`             | Blog post details         |

---

### Comments

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | `/blog/posts/<slug>/comments/` | List approved comments |
| POST   | `/blog/posts/<slug>/comments/` | Add a comment          |

---

### Newsletter

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| POST   | `/blog/newsletter/subscribe/` | Subscribe to newsletter |

---

## 🛍️ Shop API

### Product Categories

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/shop/categories/` | List product categories |

---

### Products

| Method | Endpoint                                     | Description       |
| ------ | -------------------------------------------- | ----------------- |
| GET    | `/shop/products/`                            | List products     |
| GET    | `/shop/products/?search=lamp`                | Search products   |
| GET    | `/shop/products/?min_price=50&max_price=200` | Price filter      |
| GET    | `/shop/products/?in_stock=true`              | In-stock products |
| GET    | `/shop/products/?ordering=price`             | Order products    |
| GET    | `/shop/products/featured/`                   | Featured products |
| GET    | `/shop/products/<slug>/`                     | Product details   |

---

### Product Reviews

| Method | Endpoint                         | Description  |
| ------ | -------------------------------- | ------------ |
| GET    | `/shop/products/<slug>/reviews/` | List reviews |
| POST   | `/shop/products/<slug>/reviews/` | Add review   |

---

## 📦 Orders API

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| POST   | `/orders/create/`         | Create order (checkout) |
| GET    | `/orders/my-orders/`      | User order history      |
| GET    | `/orders/<order_number>/` | Order details           |

---

## 🧪 Admin (Django)

| URL       | Description        |
| --------- | ------------------ |
| `/admin/` | Django admin panel |

---

## 🔍 Quick Test URLs (browser-ready)

```
/api/blog/posts/
/api/blog/posts/featured/
/api/shop/products/
/api/shop/products/featured/
/api/blog/categories/
/api/shop/categories/
```

---

## 🧠 Status Summary

✅ Blog APIs working
✅ Featured posts fixed
✅ Shop APIs working
✅ Orders ready
✅ JWT authentication enabled
✅ React can safely consume all endpoints

---

If you want next:

* 🔑 API auth flow in React
* 📄 Swagger / OpenAPI docs
* 🚀 Production deployment checklist
* 🔒 Permissions & rate limiting

Just tell me what you want to do next 👌
