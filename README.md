# 📝 Journal App Backend

A secure and user-friendly backend API for a personal journal application. Built with Node.js, Express, and MongoDB, this app allows users to sign up, log in, and manage their private journal entries with full CRUD functionality.

---

## 🚀 Features

- 🔐 **User Authentication** – Signup and login with hashed passwords using bcrypt and JWT
- 📓 **Create Journal Entries** – Users can write and save personal notes
- 📖 **Read Entries** – View all journal entries created by the logged-in user
- ✏️ **Update Entries** – Edit existing journal entries
- ❌ **Delete Entries** – Remove entries you no longer need
- 🛡️ **Protected Routes** – Only logged-in users can access their own data

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| jsonwebtoken (JWT) | User authentication |
| dotenv | Environment variable management |

---

## 📁 Project Structure

journal-app/ ├── index.js ├── .env ├── models/ │ ├── User.js │ └── Journal.js ├── routes/ │ ├── auth.js │ └── journal.js ├── middleware/ │ └── authMiddleware.js

---

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ekram2004/journalApp.git
   cd journal-app
Install dependencies
npm install
Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=3000

Run the server
node index.js

📬 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/signup	Register a new user
POST	/api/login	Log in and receive a token
Journal Routes (Protected)
Method	Endpoint	Description
GET	/api/journal	Get all entries for the logged-in user
POST	/api/journal	Create a new journal entry
PUT	/api/journal/:id	Update an existing entry
DELETE	/api/journal/:id	Delete an entry

entry
🙋‍♂️ Author
Built by Ekram Asrar – a software engineering student passionate about backend development and building real-world applications.

📌 License
This project is open-source and free to use.


