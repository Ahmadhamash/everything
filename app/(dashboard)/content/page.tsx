import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function SavedContentPage() {
  const session = await auth();
  const content = await prisma.generatedContent.findMany({
    where: { userId: session!.user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">المحتوى المحفوظ</h1>
      {content.length === 0 && <Card>لا يوجد محتوى بعد.</Card>}
      {content.map((item) => (
        <Card key={item.id}>
          <p className="font-semibold">{item.type} - {item.product.name}</p>
          <textarea className="mt-2 min-h-28 w-full rounded border p-2" defaultValue={item.rawText} />
        </Card>
      ))}
    </section>
  );
}
