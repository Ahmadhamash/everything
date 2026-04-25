import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PublishedProductPage({ params }: { params: { productSlug: string } }) {
  const page = await prisma.landingPage.findUnique({
    where: { slug: params.productSlug },
    include: { product: { include: { images: true } }, store: true }
  });

  if (!page || !page.published) return <p>الصفحة غير متاحة</p>;

  return (
    <main className="mx-auto max-w-4xl p-6" dir="rtl">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <p className="mt-2 text-lg text-slate-600">{page.hero}</p>
      <ul className="mt-5 list-disc space-y-1 pr-5">
        {page.benefits.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div className="mt-6 flex gap-3">
        <button className="rounded bg-brand-500 px-4 py-2 text-white">{page.cta}</button>
        {page.whatsappNumber && (
          <Link href={`https://wa.me/${page.whatsappNumber}`} className="rounded bg-green-600 px-4 py-2 text-white">
            اطلب عبر واتساب
          </Link>
        )}
      </div>
    </main>
  );
}
