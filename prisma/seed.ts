import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@aistorebuilder.com";
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Demo Owner",
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

  const store = await prisma.store.create({
    data: {
      userId: user.id,
      name: "متجر العناية",
      slug: "demo-store",
      category: "جمال",
      description: "منتجات عناية أصلية",
      targetAudience: "نساء 18-40",
      toneOfVoice: "ودي",
      country: "Jordan"
    }
  });

  await prisma.product.create({
    data: {
      storeId: store.id,
      name: "سيروم فيتامين سي",
      slug: "vitamin-c-serum",
      price: 12.5,
      description: "سيروم يمنح نضارة ويخفف البهتان.",
      category: "عناية بالبشرة",
      features: ["امتصاص سريع", "مناسب لكل أنواع البشرة"],
      targetCustomer: "النساء المهتمات بالنضارة اليومية"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
