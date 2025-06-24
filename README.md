# 🌙 Moonrider Identity Reconciliation API

A powerful backend service for resolving user identities based on shared email addresses or phone numbers. Built using **Node.js**, **Express**, and **Prisma ORM**, with a live frontend hosted on **Vercel**.

## 🔗 Live Links

- 🛰️ Backend: [Moonrider API on Render](https://moonrider-identity-api-1.onrender.com)
- 🖥️ Frontend: [Vercel Live App](https://moonrider-identity-frontend.vercel.app/)

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL (hosted on Render)
- **Frontend**: HTML, CSS, JavaScript
- **Hosting**: Render (Backend), Vercel (Frontend)
- **Version Control**: Git & GitHub

---

## 📦 Features

- Add & identify users via email or phone
- Resolve identities based on precedence logic
- Returns primary and secondary contact grouping
- Deployed API & frontend for real-time interaction

---

## 🚀 How to Run Locally

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/magadumlaxmi/moonrider-identity-api.git
cd moonrider-identity-api/backend

# Install dependencies
npm install

# Generate Prisma client & migrate
npx prisma generate
npx prisma migrate dev --name init

# Run the server
npm start
```

### Frontend Setup

Just open the `index.html` in any browser, or deploy it using [Vercel](https://vercel.com).

---

## 📮 API Endpoint

`POST /identify`  
**Body** (JSON):
```json
{
  "email": "a@example.com",
  "phoneNumber": "1234567890"
}
```

**Returns**:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["a@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

---

## 🧑‍💻 Author

**Laxmi Magadum**  
[GitHub Profile](https://github.com/magadumlaxmi)

---

## 📝 License

This project is open source and free to use under the [MIT License](LICENSE).
