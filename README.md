# 🚀 AI-Powered Learning Platform | Next.js + Tailwind + Drizzle

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-%2361DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-Strict-%23007ACC?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-%234169E1?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</div>

<br />

## 🌟 Key Features

| Category        | Highlights                                                                 |
|-----------------|----------------------------------------------------------------------------|
| **AI Core**     | 🧠 Dynamic course generation • 📝 Smart content suggestions               |
| **Learning**    | 📊 Progress tracking • 🎓 Certifications • 🎥 Interactive video lessons   |
| **Tech Stack**  | ⚡ Next.js 14 • 🔐 Clerk Auth • 🐘 Neon Postgres • 🎨 ShadCN UI           |
| **Dev Experience** | 🛠️ Type-safe everything • 📦 Monorepo-ready • 🔄 CI/CD Optimized       |

## 🏗️ Project Architecture


├── 📁 app/            # App Router routes & layouts
│   ├── (dashboard)    # Protected routes
│   ├── api/           # Edge-ready API endpoints
├── 📁 components/     # Atomic UI components
│   ├── cards/         # Course cards
│   └── dashboard/     # Progress widgets
├── 📁 lib/            # Utilities & helpers
│   ├── ai/            # AI generation logic
│   └── db/            # Drizzle database client
├── 📁 styles/         # Tailwind configurations
└── 📁 types/          # Global TypeScript types

## 🛠️ Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/daveontrack/ai-learning-platform.git
cd ai-learning-platform && npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your keys:
- 🔑 Clerk Auth ([Get Keys](https://dashboard.clerk.com))
- 🐘 Neon DB ([Free Tier](https://neon.tech))

### 3. Database Setup

```bash
npx drizzle-kit push:pg  # Push schema
npx drizzle-kit generate # Generate types
```

### 4. Launch Dev Server

```bash
npm run dev
```

Visit → [localhost:3000](http://localhost:3000)

---

## 🧩 Tech Stack Deep Dive

| Technology       | Why We Chose It                          | Cool Feature Used             |
|------------------|------------------------------------------|--------------------------------|
| **Next.js 14**   | App Router, RSC, Edge Runtime            | Streaming SSR                  |
| **Clerk**        | Pre-built auth UIs                       | Organization management        |
| **Drizzle ORM**  | Type-safe SQL                            | Schema migrations              |
| **Neon**         | Serverless Postgres                      | Branching                      |
| **Tailwind**     | JIT compiler                             | Arbitrary values               |
| **ShadCN**       | Radix-based components                   | Composable primitives          |

---

## 🎨 UI Showcase

<div align="center">

![Course Dashboard](https://via.placeholder.com/600x400/3b82f6/ffffff?text=Dashboard+Preview)  
*Dynamic Course Dashboard*

![AI Generator](https://via.placeholder.com/600x400/10b981/ffffff?text=AI+Content+Generator)  
*AI Content Creation*

</div>

---

## 🤝 Contributing

We love contributions! Here's how to help:

1. Fork the project
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open a PR

---

## 📜 License

MIT © [Dave On Track](https://github.com/daveontrack)  
*"Empowering learners through AI"*

---

<div align="center">
  <sub>Built with ❤️ and</sub>  
  <img src="https://img.shields.io/badge/-TypeScript-blue" height="20">
  <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC" height="20">
  <img src="https://img.shields.io/badge/-Next.js-black" height="20">
</div>
```
