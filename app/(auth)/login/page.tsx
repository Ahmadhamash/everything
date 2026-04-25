import Link from "next/link";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold">تسجيل الدخول</h1>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard"
          });
        }}
        className="space-y-3"
      >
        <Input name="email" type="email" placeholder="البريد الإلكتروني" required />
        <Input name="password" type="password" placeholder="كلمة المرور" required />
        <Button type="submit" className="w-full">دخول</Button>
      </form>
      <p className="mt-3 text-sm">ليس لديك حساب؟ <Link href="/register" className="text-brand-700">إنشاء حساب</Link></p>
    </main>
  );
}
