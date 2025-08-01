# Arvyrax 🌿

**Arvyrax** is a full-stack wellness session platform where users can securely create, draft, and publish wellness sessions. The platform supports rich content editing, autosave drafts, tagging, and public viewing of published sessions.

---

## 🚀 Features

- 🔐 Secure user authentication (JWT-based)
- 📝 Draft and auto-save wellness sessions
- 🏷️ Tag-based categorization
- 🌐 Public viewing of published sessions
- 📁 JSON-based session structure
- 🕵️‍♂️ User-specific session history
- ⚙️ Responsive and modern UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- TailwindCSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Multer (for file uploads if any)

---

## 📁 Folder Structure
```
arvyrax/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
│
└── README.md
```

## 🔑 Environment Variables
```
PORT=5000

# DB env variables
DB_NAME= your_db_name
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Jwt env variables
JWT_SECRET= your_jwt_secret
BCRYPT_ROUNDS= no_of_bcrypt_salt_round
JWT_EXPIRY='1d'

```

## Installation Guide
```
git clone https://github.com/RaviGupta965/arvyaX.git
cd arvyaX
```

## Backend Setup
```
cd backend
npm install
```

### 📌 API Routes

#### 🔐 Auth Routes
```
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login and receive token  |
```

#### 📄 Session Routes
```
| Method | Endpoint                                       | Description                            |
|--------|------------------------------------------------|----------------------------------------|
| GET    | `/api/sessions`                                | Get all published sessions             |
| POST   | `/api/sessions/my-sessions`                    | Get all sessions of the logged-in user |
| GET    | `/api/sessions/my-sessions/:id`                | Get a user's session by ID             |
| POST   | `/api/sessions/my-sessions/save-draft`         | Save a session as draft                |
| POST   | `/api/sessions/my-sessions/publish`            | Publish a session                      |
| DELETE | `/api/sessions/my-sessions/delete-session/:id` | Delete a user's session                |
```
## Frontend Setup
```
cd ../frontend
npm install
```

## Run the App
```
# In /backend
node server.js

# In /frontend (new terminal)
npm run dev
```

## 🧑‍💻 Author
Ravi Gupta
Built with 💙 for mindful wellness experiences.