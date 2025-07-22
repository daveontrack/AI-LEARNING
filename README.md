# <img src="https://img.icons8.com/color/48/000000/robot.png" alt="AI Icon" style="height: 24px; vertical-align: middle; margin-right: 8px;">    <span>AI-Powered Learning Platform</span>


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

```bash
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
```
## 🛠️ Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/daveontrack/ai-learning-platform.git
cd ai-learning-platform && npm install
```

### 2. Configure Environment

```bash
## 🔒 Environment Variables Template (`.env`)

```bash
# ========================
#  Clerk Authentication
# ========================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Auth URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# ========================
#  Database (Neon PostgreSQL)
# ========================
DATABASE_URL=your_neon_connection_string
NEXT_PUBLIC_DATABASE_URL=your_neon_connection_string

# ========================
#  AI Services
# ========================
GEMINI_API_KEY=your_gemini_key
AI_GURU_LAB_API=your_custom_ai_key
YOUTUBE_API_KEY=your_youtube_api_key
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

📺 More Video Resources

<div align="center">
  <a href="https://www.youtube.com/watch?v=utInDVvTbWg&list=PPSV&t=12s" target="_blank">
    <img src="https://img.shields.io/badge/▶️_Watch_Video_Overview-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube Demo">
  </a>
  <br/><br/>
  <a href="https://www.youtube.com/watch?v=utInDVvTbWg&list=PPSV&t=12s" target="_blank">
    <img src="https://img.youtube.com/vi/utInDVvTbWg/maxresdefault.jpg" alt="Video Thumbnail" width="600" style="border-radius: 10px; border: 3px solid #3b82f6;">
  </a>
</div>

@tubeguruji  
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
  <img src="https://img.shields.io/badge/-React.js-blue" height="20">
  <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC" height="20">
  <img src="https://img.shields.io/badge/-Next.js-black" height="20">
</div>


