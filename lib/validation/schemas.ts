import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const storeSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  targetAudience: z.string().min(2),
  toneOfVoice: z.string().min(2),
  country: z.string().min(2),
  socialLinks: z.string().optional(),
  brandColors: z.string().optional()
});

export const productSchema = z.object({
  storeId: z.string().cuid(),
  name: z.string().min(2),
  price: z.coerce.number().positive(),
  description: z.string().min(10),
  category: z.string().min(2),
  features: z.string().min(2),
  targetCustomer: z.string().min(2),
  imageUrl: z.string().url().optional().or(z.literal(""))
});

export const generationSchema = z.object({
  productId: z.string().cuid(),
  tone: z.enum(["FUNNY", "LUXURY", "EMOTIONAL", "DIRECT_SALES", "YOUTHFUL", "FORMAL"]),
  contentType: z.enum([
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
  ])
});
