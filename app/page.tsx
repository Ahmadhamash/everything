import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 p-8" dir="rtl">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold">AI Store Builder</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          أنشئ محتوى تسويقي عربي احترافي، صفحات هبوط، ورسائل واتساب لمتجرك خلال دقائق باستخدام Gemini.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/register"><Button>ابدأ مجانًا</Button></Link>
          <Link href="/login"><Button className="bg-slate-800">تسجيل الدخول</Button></Link>
        </div>
      </div>
    </main>
  );
}
