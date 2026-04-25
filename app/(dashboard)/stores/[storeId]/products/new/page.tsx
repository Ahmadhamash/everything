import { createProductAction } from "@/lib/actions/product-actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";

export default async function NewProductPage({ params }: { params: { storeId: string } }) {
  const session = await auth();
  const store = await prisma.store.findFirst({ where: { id: params.storeId, userId: session!.user.id } });
  if (!store) return <p>المتجر غير موجود</p>;

  return (
    <section className="max-w-3xl" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold">إضافة منتج في {store.name}</h1>
      <form action={createProductAction} className="space-y-3">
        <input type="hidden" name="storeId" value={store.id} />
        <Input name="name" placeholder="اسم المنتج" required />
        <Input name="price" type="number" step="0.01" placeholder="السعر" required />
        <Textarea name="description" placeholder="الوصف" required />
        <Input name="category" placeholder="التصنيف" required />
        <Textarea name="features" placeholder="الميزات (كل ميزة بسطر)" required />
        <Input name="targetCustomer" placeholder="العميل المستهدف" required />
        <Input name="imageUrl" placeholder="رابط الصورة" />
        <Button type="submit">حفظ المنتج</Button>
      </form>
    </section>
  );
}
