import { generateContentAction } from "@/lib/actions/ai-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

const tones = ["FUNNY", "LUXURY", "EMOTIONAL", "DIRECT_SALES", "YOUTHFUL", "FORMAL"];
const contentTypes = [
  "INSTAGRAM_CAPTION",
  "FACEBOOK_POST",
  "REEL_SCRIPT",
  "TIKTOK_SCRIPT",
  "PRODUCT_DESCRIPTION",
  "SHORT_AD_COPY",
  "LONG_AD_COPY",
  "WHATSAPP_MESSAGE",
  "HASHTAGS",
  "LANDING_COPY",
  "FAQ",
  "OFFER_IDEAS"
];

export default async function StudioPage() {
  const session = await auth();
  const products = await prisma.product.findMany({ where: { store: { userId: session!.user.id } } });

  const mockMode = process.env.AI_MOCK_MODE === "true" || !process.env.GEMINI_API_KEY;

  return (
    <section className="max-w-3xl space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">استوديو المحتوى</h1>
      {mockMode && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          أنت الآن في وضع تجريبي مجاني (Mock Mode). النتائج ليست من Gemini الحقيقي.
        </div>
      )}
      <form
        action={async (formData) => {
          "use server";
          await generateContentAction(formData);
        }}
        className="space-y-3 rounded-xl border bg-white p-4"
      >
        <select name="productId" className="w-full rounded border px-3 py-2" required>
          <option value="">اختر منتجًا</option>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select name="contentType" className="w-full rounded border px-3 py-2" required>
          {contentTypes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="tone" className="w-full rounded border px-3 py-2" required>
          {tones.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <Button type="submit">توليد وحفظ المحتوى</Button>
      </form>
    </section>
  );
}
