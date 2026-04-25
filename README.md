# AI Store Builder (Arabic RTL SaaS)

Production-style MVP for small online store owners in Jordan/Gulf markets.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS (RTL-first)
- Prisma + PostgreSQL
- Auth.js (NextAuth v5 Credentials)
- Gemini API (`@google/genai`)
- Zod validation + Server Actions

## Features implemented
- Auth: register/login/logout
- User-isolated dashboard data
- Multi-store management
- Product CRUD (create/read/delete + store edit)
- AI Content Studio with Gemini
- Usage tracking + monthly free limit (10)
- Saved generated content
- Landing page builder + publish to `/p/[slug]`
- Public store page `/s/[storeSlug]`

## Quick start
1. Install dependencies
```bash
npm install
```
2. Configure environment
```bash
cp .env.example .env
```
3. Run Prisma migration + generate client
```bash
npx prisma migrate dev --name init
npx prisma generate
```
4. Seed demo data
```bash
npm run prisma:seed
```
5. Start app
```bash
npm run dev
```

## Demo user
- Email: `demo@aistorebuilder.com`
- Password: `password123`

## Project structure
- `app/` routes (landing, auth, dashboard, studio, builder, public pages)
- `lib/actions/` server actions
- `lib/ai/` Gemini service + prompt templates
- `lib/validation/` Zod schemas
- `prisma/` schema and seed

## Notes
- For production, add real file upload integration (UploadThing/S3).
- Improve product edit UX and content rich text editor.
- Add billing provider (Stripe) and paid plans.
