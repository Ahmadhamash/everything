"use server";

import { ContentType, Tone } from "@prisma/client";
import { auth } from "@/lib/auth";
import { generateWithGemini } from "@/lib/ai/gemini";
import { buildPrompt } from "@/lib/ai/prompts";
import { prisma } from "@/lib/prisma";
import { generationSchema } from "@/lib/validation/schemas";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export async function generateContentAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) throw new Error("Unauthorized");

  const parsed = generationSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid request");

  const plan = await prisma.subscriptionPlan.upsert({
    where: { userId_currentMonth: { userId: session.user.id, currentMonth: currentMonth() } },
    update: {},
    create: { userId: session.user.id, name: "FREE", currentMonth: currentMonth(), monthlyLimit: 10 }
  });

  if (plan.usedGenerations >= plan.monthlyLimit) {
    throw new Error("You reached your monthly generation limit");
  }

  const product = await prisma.product.findFirst({
    where: { id: parsed.data.productId, store: { userId: session.user.id } },
    include: { store: true }
  });

  if (!product) throw new Error("Product not found");

  const prompt = buildPrompt({
    storeName: product.store.name,
    storeCategory: product.store.category,
    productName: product.name,
    productDescription: product.description,
    targetCustomer: product.targetCustomer,
    tone: parsed.data.tone,
    contentType: parsed.data.contentType
  });

  const result = await generateWithGemini(prompt);

  await prisma.$transaction([
    prisma.generatedContent.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        type: parsed.data.contentType as ContentType,
        tone: parsed.data.tone as Tone,
        prompt,
        output: result,
        rawText: JSON.stringify(result)
      }
    }),
    prisma.usageLog.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        storeId: product.store.id,
        type: parsed.data.contentType as ContentType
      }
    }),
    prisma.subscriptionPlan.update({
      where: { id: plan.id },
      data: { usedGenerations: { increment: 1 } }
    })
  ]);

  return result;
}
