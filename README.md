# 🗂️ TaskBoard - A Simple Task Management App

A fully functional task management board built with **Next.js App Router**, **TypeScript**, **ShadCN UI**, and **JWT-based authentication**. Users can register, login, create boards, manage tasks, and track their progress — all in a clean, responsive UI.

---

## 🔑 Features

### 🔐 Authentication

- JWT-based login & registration
- Secure `HttpOnly` cookies for storing session tokens
- Passwords hashed using **bcrypt**
- Protected pages — unauthenticated users are redirected to login

### 📋 Boards & Tasks

- Create and manage boards with:
  - Title, description, due date
  - Task list with status tracking
- Add, edit, delete tasks with checkboxes
- Progress bar auto-updates based on completed tasks
- Editable via modal dialogs

### 🔎 Search & Filtering

- Search boards by **title or description** (partial match)
- Real-time filtering with shared context
- Search bar integrated into the header

### 💻 UI & UX

- Responsive design using **Tailwind CSS**
- Built with **ShadCN UI** components
- Modal dialogs for editing and deleting boards/tasks
- Dynamic routing (`/update-board/[id]`)

---

## 🧱 Project Structure

```
├── app/ # App Router pages (login, register, dashboard, etc.)
├── components/ # Reusable components (BoardCard, SearchForm, etc.)
├── context/ # React Contexts (Auth, Search)
├── lib/ # Utilities (JWT handling, fake DB)
├── pages/api/ # API routes (login, register, profile, delete-board)
├── public/ # Static assets
├── styles/ # Global styles
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts

```

---

## 🧪 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Library**: ShadCN UI (Radix + Tailwind CSS)
- **State Management**: React Context
- **Authentication**: JWT + HttpOnly Cookies
- **Styling**: Tailwind CSS

---

## 🚦 Auth Flow

1. User logs in or registers → receives a JWT stored as `HttpOnly` cookie
2. `/api/profile` validates token and returns user info
3. `AuthContext` tracks auth state across pages
4. Protected pages use `WithAuth` wrapper to redirect unauthorized access

---

## 🚧 Available API Endpoints

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/login`        | Authenticate user & return JWT   |
| POST   | `/api/register`     | Register a new user              |
| GET    | `/api/profile`      | Validate JWT & return user info  |
| POST   | `/api/delete-board` | Delete a board by ID             |
| POST   | `/api/create-board` | Create a new board               |
| GET    | `/api/getboards`    | Get all boards of logined user   |
| POST   | `/api/update-board` | Update a board by ID             |
| POST   | `/api/update-tasks` | Update a tasks of selected board |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Amool-kk/taskboard.git
cd taskboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

> Visit `http://localhost:3000`

---

## 🔒 Future Enhancements

- Move from in-memory storage to a real database (e.g., PostgreSQL, MongoDB)
- Add user profile and settings
- Drag-and-drop task reordering
- Mobile-first UI optimizations

---

## 👤 Author

- [Amool K](https://github.com/Amool-kk)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
