# 🌙 Moonrider Identity Reconciliation API

A backend + frontend project that performs identity reconciliation using email and phone number inputs. It identifies unique users by intelligently linking related contact records.

## 🚀 Live Demo

- **Backend (API)**: [Render Live API](https://moonrider-identity-api-1.onrender.com)
- **Frontend (UI)**: [Vercel Live App](https://moonrider-identity-ui.vercel.app)

---

## 📌 Features

- Accepts input via email and/or phone number
- Reconciles identities using existing records in PostgreSQL
- Returns a unified contact view including primary & secondary contacts
- Simple frontend to test the API
- Hosted on Render (Backend) and Vercel (Frontend)

---

## 🛠️ Tech Stack

### Backend:
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Render** (deployment)

### Frontend:
- **HTML5, CSS3, JavaScript**
- **Vercel** (deployment)

---

## 🧩 API Endpoint

### `POST /identify`

#### Request Body:
```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
Response:
json
Copy code
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
🖥️ Run Locally
Prerequisites:
Node.js and npm

PostgreSQL (or use a Render hosted DB)

Prisma CLI: npm install prisma --save-dev

Setup Instructions:
bash
Copy code
# Clone the repo
git clone https://github.com/magadumlaxmi/moonrider-identity-api.git
cd moonrider-identity-api/backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env  # then add your DATABASE_URL inside

# Run Prisma migration
npx prisma migrate dev --name init

# Start the server
npm start
🌐 Deployment URLs
Service	URL
Backend	Render
Frontend	Vercel
GitHub	Repository

📂 Folder Structure
pgsql
Copy code
moonrider-identity-api/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   └── index.html
└── README.md
🤝 Contributing
Pull requests are welcome! If you’d like to suggest enhancements or fixes, open an issue first to discuss.

📄 License
This project is licensed under the MIT License.

🙋‍♀️ Author
Laxmi Magadum
[GitHub Profile](https://github.com/magadumlaxmi)
