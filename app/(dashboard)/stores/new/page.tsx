import { createStoreAction } from "@/lib/actions/store-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewStorePage() {
  return (
    <section className="max-w-3xl" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold">إنشاء متجر</h1>
      <form action={createStoreAction} className="space-y-3">
        <Input name="name" placeholder="اسم المتجر" required />
        <Input name="category" placeholder="تصنيف المتجر" required />
        <Textarea name="description" placeholder="وصف المتجر" required />
        <Input name="targetAudience" placeholder="العملاء المستهدفون" required />
        <Input name="toneOfVoice" placeholder="نبرة العلامة" required />
        <Input name="country" placeholder="الدولة" required />
        <Input name="socialLinks" placeholder="روابط السوشال (JSON أو نص)" />
        <Input name="brandColors" placeholder="ألوان العلامة" />
        <Button type="submit">حفظ المتجر</Button>
      </form>
    </section>
  );
}
