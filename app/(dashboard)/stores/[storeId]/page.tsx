import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StoreDetailPage({ params }: { params: { storeId: string } }) {
  const session = await auth();
  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId: session!.user.id },
    include: { products: true }
  });
  if (!store) return <p>غير موجود</p>;

  return (
    <section dir="rtl" className="space-y-3">
      <h1 className="text-2xl font-bold">{store.name}</h1>
      <Link href={`/stores/${store.id}/edit`} className="inline-block rounded border px-3 py-2">تعديل المتجر</Link>
      <Link href={`/stores/${store.id}/products/new`} className="mr-2 inline-block rounded bg-brand-500 px-3 py-2 text-white">إضافة منتج</Link>
      <div className="space-y-2">
        {store.products.map((p) => (
          <Link key={p.id} className="block rounded border bg-white p-3" href={`/stores/${store.id}/products/${p.id}`}>
            {p.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
