# Fractal UI: AI-Powered Awwwards-Caliber UI Generation Platform

Fractal UI is a next-generation platform that leverages AI to generate stunning, production-ready React UIs using the "Fractal UI" paradigm. It features modular, self-similar, and composable components, powered by the Cerebras llama-4-scout-17b-16e-instruct model. The platform is built with Next.js, Tailwind CSS, and a self-hosted Supabase backend for authentication and data storage.

---

## Features
- **AI-Powered UI Generation**: Describe your UI, and the platform generates modular, responsive React code styled with Tailwind CSS.
- **Fractal UI Paradigm**: Atomic, molecular, and organism components for scalable, reusable design.
- **Live Preview**: Instantly preview generated UIs in a secure sandbox.
- **Project Management**: Save, load, and delete UI projects with real-time updates.
- **Authentication**: Social login (Google, GitHub) and email/password via Supabase Auth.
- **Custom Dialogs**: All confirmations and errors use a custom MessageBox component.
- **Production-Ready**: Fully responsive, Awwwards-level aesthetics, and ready for Vercel deployment.

---

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **AI Service**: Cerebras llama-4-scout-17b-16e-instruct (via secure Vercel API route)
- **Deployment**: Vercel (one-click deploy), Docker Compose for local Supabase

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fractal-ui.git
cd fractal-ui
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Copy `.env.example` to `.env.local` and fill in the required values:
```bash
cp .env.example .env.local
```
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for local dev)
- `CEREBRAS_API_KEY` - Your Cerebras API key (backend only)
- `NEXT_PUBLIC_APP_ID` - Your app ID (if required)

### 4. Set Up Supabase (Local)
- Install Docker and Docker Compose.
- From the `supabase/` directory, run:
```bash
cd supabase
docker-compose up -d
```
- Apply the schema:
```bash
docker exec -it supabase-db psql -U postgres -d postgres -f /docker-entrypoint-initdb.d/schema.sql
```
- Configure social auth (Google, GitHub) in the Supabase dashboard.

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to use the app.

### 6. Deploy to Vercel
- Push your repo to GitHub.
- Import the project on [Vercel](https://vercel.com/), set environment variables, and deploy.

---

## Project Structure
```
fractal-ui/
├── README.md
├── .env.example
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── generate-ui.js
│   │   └── index.jsx
│   ├── components/
│   │   ├── MessageBox.jsx
│   │   ├── Auth/
│   │   ├── PromptInput.jsx
│   │   ├── CodeDisplay.jsx
│   │   ├── LivePreview.jsx
│   │   ├── ProjectList.jsx
│   │   └── ...
│   ├── lib/
│   │   ├── supabaseClient.js
│   │   └── ...
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── docker-compose.yml
│   └── schema.sql
└── vercel.json
```

---

## Usage
1. **Sign up or log in** using your preferred method.
2. **Describe your UI** in the prompt area and click "Generate UI".
3. **View, copy, or download** the generated code.
4. **Preview** the UI live.
5. **Save your project** for later, or load/delete existing projects.

---

## Security & Best Practices
- All API keys are securely managed via environment variables.
- Supabase RLS ensures user data isolation.
- No sensitive keys are exposed to the frontend.
- All dialogs use the custom MessageBox component.

---

## License
MIT 