import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();
  const plan = await prisma.subscriptionPlan.findFirst({
    where: { userId: session!.user.id, currentMonth: new Date().toISOString().slice(0, 7) }
  });

  return (
    <section dir="rtl">
      <h1 className="text-2xl font-bold">الإعدادات</h1>
      <p className="mt-3">الخطة الحالية: {plan?.name ?? "FREE"}</p>
      <p>الحد الشهري: {plan?.monthlyLimit ?? 10}</p>
      <p>الاستخدام: {plan?.usedGenerations ?? 0}</p>
    </section>
  );
}
