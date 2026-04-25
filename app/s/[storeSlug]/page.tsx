import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PublicStorePage({ params }: { params: { storeSlug: string } }) {
  const store = await prisma.store.findUnique({
    where: { slug: params.storeSlug },
    include: { products: true }
  });

  if (!store) return <p>المتجر غير متوفر.</p>;

  return (
    <main className="mx-auto max-w-4xl p-6" dir="rtl">
      <h1 className="text-3xl font-bold">{store.name}</h1>
      <p className="mt-3">{store.description}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {store.products.map((p) => (
          <article key={p.id} className="rounded border bg-white p-4">
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-slate-600">{p.description}</p>
            <p className="mt-2 font-bold">{String(p.price)} د.أ</p>
            <Link href={`/stores/${store.id}/products/${p.id}`} className="mt-2 inline-block text-brand-700">عرض التفاصيل</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
