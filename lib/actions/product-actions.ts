"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/lib/validation/schemas";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");

  const parsed = productSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid input");

  const store = await prisma.store.findFirst({ where: { id: parsed.data.storeId, userId: session.user.id } });
  if (!store) throw new Error("Store not found");

  const product = await prisma.product.create({
    data: {
      storeId: store.id,
      name: parsed.data.name,
      slug: `${slugify(parsed.data.name)}-${Date.now()}`,
      price: parsed.data.price,
      description: parsed.data.description,
      category: parsed.data.category,
      features: parsed.data.features.split("\n").map((f) => f.trim()).filter(Boolean),
      targetCustomer: parsed.data.targetCustomer,
      images: parsed.data.imageUrl ? { create: [{ url: parsed.data.imageUrl }] } : undefined
    }
  });

  redirect(`/stores/${store.id}/products/${product.id}`);
}

export async function deleteProductAction(productId: string) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");

  const product = await prisma.product.findFirst({
    where: { id: productId, store: { userId: session.user.id } }
  });

  if (!product) throw new Error("Not found");
  await prisma.product.delete({ where: { id: productId } });
  redirect("/dashboard");
}
