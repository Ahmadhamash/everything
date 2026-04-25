import { updateStoreAction } from "@/lib/actions/store-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function EditStorePage({ params }: { params: { storeId: string } }) {
  const session = await auth();
  const store = await prisma.store.findFirst({ where: { id: params.storeId, userId: session!.user.id } });
  if (!store) return <p>غير موجود</p>;

  return (
    <form action={updateStoreAction.bind(null, store.id)} className="max-w-2xl space-y-3" dir="rtl">
      <h1 className="text-2xl font-bold">تعديل متجر</h1>
      <Input name="name" defaultValue={store.name} required />
      <Input name="category" defaultValue={store.category} required />
      <Textarea name="description" defaultValue={store.description} required />
      <Input name="targetAudience" defaultValue={store.targetAudience} required />
      <Input name="toneOfVoice" defaultValue={store.toneOfVoice} required />
      <Input name="country" defaultValue={store.country} required />
      <Input name="socialLinks" defaultValue={(store.socialLinks as { raw?: string } | null)?.raw ?? ""} />
      <Input name="brandColors" defaultValue={(store.brandColors as { raw?: string } | null)?.raw ?? ""} />
      <Button type="submit">حفظ</Button>
    </form>
  );
}
