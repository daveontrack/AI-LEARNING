

```md
# 🧠 AI Online Learning Platform

A modern full-stack AI-powered online learning platform built using:

- **Next.js** – App Router & SSR
- **React** – Reusable Components
- **Clerk** – Authentication & User Management
- **Drizzle ORM + Neon** – PostgreSQL database (serverless)
- **Tailwind CSS** – Beautiful & responsive UI
- **ShadCN UI** – Component library integration

## 🚀 Features

- 🧑‍🎓 Auth & role-based access (Clerk)
- 🧠 AI-generated courses and content
- 📚 Course structure with chapters & topics
- 🧭 Learning timeline with progress tracking
- 🎥 Video embedding and previews
- 💾 Serverless PostgreSQL via Neon
- 💡 Fully type-safe with TypeScript + Drizzle ORM

## 🏗️ Project Structure

```

.
├── app/                  # Route handlers, pages, API
├── components/           # Reusable UI components
├── config/               # Drizzle / Tailwind / Next configs
├── context/              # React Context Providers
├── lib/                  # Utility functions
├── public/               # Static files
├── .env                  # Environment variables
├── drizzle.config.js     # Drizzle ORM config
├── middleware.js         # Clerk middleware
├── next.config.mjs       # Next.js config
├── package.json          # Project metadata
└── README.md             # This file

````

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/daveontrack/ai-learning-platform.git
cd ai-learning-platform
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

DATABASE_URL=your_neon_postgres_url
```

### 4. Push Drizzle schema

```bash
npx drizzle-kit push
```

### 5. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🧱 Tech Stack

| Tech        | Description                         |
| ----------- | ----------------------------------- |
| Next.js     | Fullstack React Framework           |
| Clerk       | Authentication & session management |
| Drizzle ORM | Type-safe DB layer                  |
| Neon        | Serverless Postgres                 |
| TailwindCSS | Utility-first CSS framework         |
| ShadCN      | Component library based on Radix UI |

---


## 🛠️ Future Improvements

* AI quiz generation
* User dashboards
* Course enrollment & certificate system
* In-app notifications

---

## 🧑‍💻 Author

Made with ❤️ by [@daveontrack](https://github.com/daveontrack)

```
