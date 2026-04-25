import { registerAction } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold">إنشاء حساب</h1>
      <form action={registerAction} className="space-y-3">
        <Input name="name" placeholder="الاسم" required />
        <Input name="email" type="email" placeholder="البريد الإلكتروني" required />
        <Input name="password" type="password" placeholder="كلمة المرور" required />
        <Button type="submit" className="w-full">إنشاء الحساب</Button>
      </form>
    </main>
  );
}
