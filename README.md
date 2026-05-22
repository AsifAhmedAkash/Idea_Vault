```markdown
# IdeaVault 💡

A full-stack platform for sharing, discovering, and collaborating on startup ideas. Built with Next.js, Express, and MongoDB.

---

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- Tailwind CSS
- HeroUI
- Better Auth (authentication)
- React Toastify

**Backend**
- Node.js + Express
- MongoDB (via native driver)
- JWT verification middleware

---

## Features

- 🔐 Email/password and Google OAuth authentication
- 💡 Submit startup ideas with detailed fields
- 🔍 Search ideas by title (case-insensitive regex) and filter by category
- 📋 Personal dashboard — view your own ideas and comments
- 💬 Comment on ideas with real-time updates (no page refresh)
- ✏️ Edit and delete your own comments
- 👤 Profile management (name and avatar)
- 🔒 Protected routes with redirect to login + callback URL

---

## Project Structure


src/
├── app/
│   ├── components/        # Navbar, Footer, IdeaCard, CommentCard, etc.
│   ├── ideas/             # Ideas gallery + [id] detail page
│   ├── add-idea/          # Submit new idea
│   ├── my-ideas/          # Creator's idea dashboard
│   ├── my-interactions/   # User's comment history
│   ├── profile/           # Edit profile
│   ├── login/             # Login page
│   ├── signup/            # Register page
│   └── lib/
│       ├── auth.ts        # Better Auth server config
│       └── auth-client.ts # Better Auth client config


---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Google OAuth credentials (optional)

### 1. Clone the repository

```bash
git clone https://github.com/AsifAhmedAkash/Idea_Vault
cd ideavault
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 3. Environment variables

Create `.env` in the server folder:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the app

```bash
# Start backend
cd server
node index.js

# Start frontend (in a new terminal)
npm run dev
```

Visit 
https://ideavault-one-mu.vercel.app/
---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/idea` | ❌ | Get ideas (supports `?limit` and `?search` and `?category`) |
| GET | `/idea/:id` | ✅ | Get single idea |
| POST | `/idea` | ✅ | Create new idea |
| GET | `/ideasbycreator/:creatorId` | ✅ | Get ideas by creator |
| GET | `/ideaname/:id` | ❌ | Get idea title only |
| GET | `/comment/:ideaId` | ❌ | Get comments for an idea |
| POST | `/comment` | ✅ | Post a comment |
| PATCH | `/comment/:id` | ✅ | Edit a comment |
| DELETE | `/comment/:id` | ✅ | Delete a comment |
| GET | `/commentbyuser/:userId` | ✅ | Get all comments by a user |

---

## Screenshots
<img width="1357" height="888" alt="Screenshot 2026-05-22 182550" src="https://github.com/user-attachments/assets/513a415f-adcb-4da9-8590-3e7d1cf27e70" />
<img width="1327" height="892" alt="Screenshot 2026-05-22 182620" src="https://github.com/user-attachments/assets/cda85e1d-a117-46c3-860b-1cc0c34e5d2c" />
<img width="1324" height="895" alt="Screenshot 2026-05-22 182604" src="https://github.com/user-attachments/assets/2d0f08cf-e4f6-49ff-8b5f-385862565772" />

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

