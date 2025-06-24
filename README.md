# 🧠 Moonrider Backend - Identity Reconciliation API

A high-performance Identity Reconciliation API for managing and unifying user contact records by intelligently resolving identities using email and phone number.

This project was built as part of a backend engineering challenge and meets all required and bonus objectives using modern technologies and clean architecture.

---

## ✅ Assignment Compliance

| Requirement                           | Status |
|---------------------------------------|--------|
| `/identify` endpoint                  | ✅     |
| Primary/Secondary contact logic       | ✅     |
| Primary demotion + contact merging    | ✅     |
| Prisma schema and DB integration      | ✅     |
| Custom error handling (bonus)         | ✅     |
| Comprehensive test coverage (bonus)   | ✅     |
| Public GitHub repository              | ✅     |
| README with full documentation        | ✅     |

---

## 🚀 Features

- Identifies users via email or phone
- Maintains identity groups with primary/secondary contacts
- Handles conflicting records with demotion logic
- Fast reconciliation using optimized data modeling
- Simple REST API built using Express.js
- Extensive test coverage with Jest and Supertest

---

## 🛠️ Tech Stack

| Layer         | Technology       |
|---------------|------------------|
| Language      | JavaScript (Node.js) |
| Framework     | Express.js       |
| ORM/Database  | Prisma ORM, SQLite |
| Testing       | Jest, Supertest  |
| Deployment    | Render (Backend), Vercel (Frontend) |

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/magadumlaxmi/moonrider-identity-api.git
cd moonrider-identity-api
npm install
```

### 2. Environment Configuration

Create a `.env` file with the following:

```env
DATABASE_URL="file:./dev.db"
```

### 3. Prisma & DB Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Start Server

```bash
node index.js
```

API runs locally at: `http://localhost:3000`

---

## 📬 API Endpoint

### POST `/identify`

Reconciles identity for a user using email and/or phone number.

#### 🔸 Request

```json
{
  "email": "example@domain.com",
  "phoneNumber": "1234567890"
}
```

#### 🔹 Response

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["example@domain.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

---

## 🧪 Run Tests

```bash
npx jest
```

Test coverage includes:

- Primary record creation
- Secondary linking logic
- Conflict resolution
- Error handling

Test file: `test/identify.test.js`

---

## 📁 Project Structure

```
.
├── backend/
│   ├── index.js
│   └── prisma/
│       └── schema.prisma
├── test/
│   └── identify.test.js
├── .env
├── package.json
└── README.md
```

---

## 👤 Author

**Laxmi Magadum**  
GitHub: [@magadumlaxmi](https://github.com/magadumlaxmi)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

