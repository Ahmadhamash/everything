import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [stores, products, plan] = await Promise.all([
    prisma.store.findMany({ where: { userId }, include: { products: true } }),
    prisma.product.count({ where: { store: { userId } } }),
    prisma.subscriptionPlan.findFirst({ where: { userId, currentMonth: new Date().toISOString().slice(0, 7) } })
  ]);

  return (
    <section className="space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">مرحبًا بك 👋</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>عدد المتاجر: {stores.length}</Card>
        <Card>عدد المنتجات: {products}</Card>
        <Card>الجيلات المتبقية: {(plan?.monthlyLimit ?? 10) - (plan?.usedGenerations ?? 0)}</Card>
      </div>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">متاجرك</h2>
        <div className="space-y-2">
          {stores.map((store) => (
            <Link className="block rounded border p-2" key={store.id} href={`/stores/${store.id}/products/new`}>
              {store.name} ({store.products.length} منتجات)
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
