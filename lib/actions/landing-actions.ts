"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function createLandingPageAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");

  const storeId = String(formData.get("storeId"));
  const productId = String(formData.get("productId"));
  const title = String(formData.get("title"));
  const hero = String(formData.get("hero"));
  const benefits = String(formData.get("benefits")).split("\n").filter(Boolean);
  const cta = String(formData.get("cta"));
  const whatsappNumber = String(formData.get("whatsappNumber") || "");

  const store = await prisma.store.findFirst({ where: { id: storeId, userId: session.user.id } });
  if (!store) throw new Error("Store not found");

  const page = await prisma.landingPage.create({
    data: {
      storeId,
      productId,
      title,
      hero,
      benefits,
      cta,
      whatsappNumber,
      slug: slugify(`${title}-${Date.now()}`),
      published: true
    }
  });

  redirect(`/p/${page.slug}`);
}
