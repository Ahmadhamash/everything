import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { deleteProductAction } from "@/lib/actions/product-actions";

export default async function ProductDetailsPage({ params }: { params: { storeId: string; productId: string } }) {
  const session = await auth();
  const product = await prisma.product.findFirst({
    where: { id: params.productId, storeId: params.storeId, store: { userId: session!.user.id } },
    include: { images: true }
  });

  if (!product) return <p>المنتج غير موجود.</p>;

  return (
    <section className="space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <Card>
        <p>{product.description}</p>
        <p className="mt-2 font-bold">{String(product.price)} د.أ</p>
        <ul className="mt-2 list-disc pr-5">
          {product.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Card>
      <div className="flex gap-2">
        <Link className="rounded bg-brand-500 px-3 py-2 text-white" href="/studio">توليد محتوى</Link>
        <form action={deleteProductAction.bind(null, product.id)}>
          <button className="rounded bg-red-600 px-3 py-2 text-white">حذف</button>
        </form>
      </div>
    </section>
  );
}
