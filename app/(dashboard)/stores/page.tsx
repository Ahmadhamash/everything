import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StoresPage() {
  const session = await auth();
  const stores = await prisma.store.findMany({ where: { userId: session!.user.id } });
  return (
    <section dir="rtl" className="space-y-3">
      <h1 className="text-2xl font-bold">المتاجر</h1>
      <Link href="/stores/new" className="inline-block rounded bg-brand-500 px-3 py-2 text-white">متجر جديد</Link>
      {stores.map((s) => (
        <Link key={s.id} href={`/stores/${s.id}`} className="block rounded border bg-white p-3">{s.name}</Link>
      ))}
    </section>
  );
}
