"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/schemas";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid input");

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) throw new Error("Email already used");

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      plans: {
        create: {
          name: "FREE",
          monthlyLimit: 10,
          currentMonth: new Date().toISOString().slice(0, 7)
        }
      }
    }
  });

  if (!user) throw new Error("Could not create account");
  redirect("/login");
}
