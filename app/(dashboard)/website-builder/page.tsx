import { createLandingPageAction } from "@/lib/actions/landing-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function WebsiteBuilderPage() {
  const session = await auth();
  const stores = await prisma.store.findMany({
    where: { userId: session!.user.id },
    include: { products: true }
  });

  return (
    <section className="max-w-3xl space-y-3" dir="rtl">
      <h1 className="text-2xl font-bold">منشئ صفحة الهبوط</h1>
      <form action={createLandingPageAction} className="space-y-3 rounded-xl border bg-white p-4">
        <select name="storeId" className="w-full rounded border px-3 py-2" required>
          <option value="">اختر المتجر</option>
          {stores.map((s) => <option value={s.id} key={s.id}>{s.name}</option>)}
        </select>
        <select name="productId" className="w-full rounded border px-3 py-2">
          <option value="">اختياري: اختر منتج</option>
          {stores.flatMap((s) => s.products).map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}
        </select>
        <Input name="title" placeholder="عنوان الصفحة" required />
        <Textarea name="hero" placeholder="نص الهيرو" required />
        <Textarea name="benefits" placeholder="الفوائد (سطر لكل فائدة)" required />
        <Input name="cta" placeholder="نص الزر" required />
        <Input name="whatsappNumber" placeholder="رقم واتساب مثل 9627xxxxxxx" />
        <Button type="submit">نشر الصفحة</Button>
      </form>
    </section>
  );
}
