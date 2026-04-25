"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { storeSchema } from "@/lib/validation/schemas";
import { redirect } from "next/navigation";

export async function createStoreAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");

  const parsed = storeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid input");

  const store = await prisma.store.create({
    data: {
      userId: session.user.id,
      ...parsed.data,
      slug: `${slugify(parsed.data.name)}-${Date.now()}`,
      socialLinks: parsed.data.socialLinks ? { raw: parsed.data.socialLinks } : undefined,
      brandColors: parsed.data.brandColors ? { raw: parsed.data.brandColors } : undefined
    }
  });

  redirect(`/stores/${store.id}/products/new`);
}

export async function updateStoreAction(storeId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");
  const parsed = storeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid input");

  const store = await prisma.store.findFirst({ where: { id: storeId, userId: session.user.id } });
  if (!store) throw new Error("Store not found");

  await prisma.store.update({
    where: { id: storeId },
    data: {
      ...parsed.data,
      socialLinks: parsed.data.socialLinks ? { raw: parsed.data.socialLinks } : undefined,
      brandColors: parsed.data.brandColors ? { raw: parsed.data.brandColors } : undefined
    }
  });

  redirect("/dashboard");
}
