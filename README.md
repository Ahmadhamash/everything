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



## تشغيل سريع عبر Docker (الأسرع)
### Production-like
```bash
docker compose up --build -d
```

ثم شغّل المايجريشن داخل كونتينر التطبيق:
```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run prisma:seed
```

افتح: `http://localhost:3000`

### Development mode (Hot Reload)
```bash
docker compose -f docker-compose.dev.yml up
```

> هذا الوضع يشغّل `npm run dev` داخل الكونتينر مع ربط ملفات المشروع محليًا.

## تجربة مجانية بدون API مدفوع
### خيار 1 (الأسهل): Mock Mode
1. في `.env` اترك `GEMINI_API_KEY` فارغًا.
2. تأكد أن `AI_MOCK_MODE="true"`.
3. شغّل التطبيق بشكل طبيعي.

عند توليد المحتوى، النظام يرجع محتوى عربي تجريبي حتى تختبر كل التدفق (Store → Product → Generate → Save) بدون أي تكلفة.

### خيار 2 (مجاني فعلي من Google AI Studio)
- أنشئ مفتاح مجاني من Google AI Studio ثم ضعه في `GEMINI_API_KEY`.
- يمكنك الإبقاء على `AI_MOCK_MODE="true"` للتراجع التلقائي عند أي خطأ.

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
