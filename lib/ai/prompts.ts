export const basePrompt = `أنت خبير تسويق عربي محترف للمتاجر الصغيرة في الأردن والخليج.
اكتب نصًا عربيًا طبيعيًا، مقنعًا، عالي التحويل، بدون مبالغة أو وعود كاذبة.
اللهجة: عربية مفهومة بلمسة أردنية/خليجية.
أعد النتيجة كـ JSON صالح فقط.`;

export const contentTypePromptMap: Record<string, string> = {
  INSTAGRAM_CAPTION: "اكتب كابشن إنستغرام جذاب مع CTA واضح.",
  FACEBOOK_POST: "اكتب منشور فيسبوك مطوّل نسبيًا مع نقاط إقناع.",
  REEL_SCRIPT: "اكتب سكربت ريلز 30 ثانية مع Hook في أول 3 ثواني.",
  TIKTOK_SCRIPT: "اكتب سكربت تيك توك سريع الإيقاع.",
  PRODUCT_DESCRIPTION: "اكتب وصف منتج يركز على الفوائد والاستخدام.",
  SHORT_AD_COPY: "اكتب إعلان قصير جدًا مناسب ل Meta ads.",
  LONG_AD_COPY: "اكتب إعلان طويل مع عرض المشكلة والحل والشهادة الاجتماعية.",
  WHATSAPP_MESSAGE: "اكتب رسالة واتساب مبيعات ودية تدفع للطلب.",
  HASHTAGS: "اكتب 15 هاشتاغ عربي مناسب للمنتج.",
  LANDING_COPY: "اكتب نص صفحة هبوط: Hero + Benefits + CTA.",
  FAQ: "اكتب 6 أسئلة شائعة مع إجاباتها.",
  OFFER_IDEAS: "اقترح 5 أفكار عروض لزيادة المبيعات."
};

export function buildPrompt(input: {
  storeName: string;
  storeCategory: string;
  productName: string;
  productDescription: string;
  targetCustomer: string;
  tone: string;
  contentType: string;
}) {
  return `${basePrompt}

نوع المحتوى: ${input.contentType}
النبرة: ${input.tone}
المتجر: ${input.storeName}
فئة المتجر: ${input.storeCategory}
المنتج: ${input.productName}
وصف المنتج: ${input.productDescription}
العميل المستهدف: ${input.targetCustomer}
تعليمات إضافية: ${contentTypePromptMap[input.contentType]}

أعد JSON بالشكل التالي:
{
  "title": "",
  "body": "",
  "bullets": [""],
  "cta": ""
}`;
}
