export type MockResult = {
  title: string;
  body: string;
  bullets: string[];
  cta: string;
};

export function generateMockArabicContent(contentType?: string): MockResult {
  const typeLabel = contentType ? `(${contentType})` : "";

  return {
    title: `محتوى تجريبي مجاني ${typeLabel}`.trim(),
    body: "هذا نص تجريبي لمساعدتك على اختبار المنصة بدون أي API مدفوع. يمكنك استبداله عند تفعيل مفتاح Gemini.",
    bullets: [
      "رسالة تسويقية واضحة وسريعة",
      "لهجة عربية مناسبة للأردن والخليج",
      "دعوة شراء مباشرة"
    ],
    cta: "اطلب الآن عبر واتساب"
  };
}
