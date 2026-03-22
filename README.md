# Google Forms Hub

## 📌 Description

A simple full-stack application for creating forms and collecting responses.

---

## 🛠 Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + GraphQL (Yoga)
- State: Redux Toolkit (RTK Query)
- Monorepo: pnpm workspaces

---

## 📂 Project Structure

```
apps/
  client/   # React frontend
  server/   # GraphQL backend
packages/
  shared/   # shared types
```

---

## 🚀 Setup & Run Locally

### 1. Clone repo

```
git clone <your-repo-url>
cd GoogleFormsHub
```

---

### 2. Install dependencies

```
npm install
```

or

```
pnpm install
```

---

### 3. Run backend

```
cd apps/server
npm run dev
```

Server will start at:

```
http://localhost:4000/graphql
```

---

### 4. Run frontend

```
cd apps/client
npm run dev
```

App will start at:

```
http://localhost:5173
```

---

## 🌐 Environment

Frontend expects backend at:

```
http://localhost:4000/graphql
```

To change it, update:

```
apps/client/src/api/api.ts
```

---

## 🚀 Deployment

### Frontend (Vercel)

- Root directory: `apps/client`

### Backend

- Can be deployed separately (Render / Railway)

---

## ✅ Features

- Create forms
- Add multiple question types
- Submit responses
- View responses

---

## ⚠️ Notes

- Backend must be running for frontend to work
- Data is stored in memory (no database)

---
