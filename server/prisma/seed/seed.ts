/**
 * ! Executing this script will delete all data in your database and seed it with 10 product.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import {products} from './data';

async function main() {
  for (const product of products) {
    const {
      id,
      sku,
      retailerSku,
      available,
      name,
      price,
      originalPrice,
      discount,
      humanVolume,
      volume,
      volumeType,
      itemsPerPack,
      discountEndsAt,
      priceType,
      gramsPerUnit,
      unitPrice,
      originalUnitPrice,
      score,
      imageUrls,
      slug,
      maxSelectQuantity,
      canonicalUrl,
      maxPerOrder,
    } = product;
    await prisma.product.create({
      data: {
        sku,
        retailerSku,
        available,
        name,
        price,
        originalPrice,
        discount,
        humanVolume,
        volume,
        volumeType,
        itemsPerPack,
        discountEndsAt,
        priceType,
        gramsPerUnit,
        unitPrice,
        originalUnitPrice,
        score,
        imageUrl: imageUrls[0],
        slug,
        maxSelectQuantity,
        canonicalUrl,
        maxPerOrder,
      },
    });
  }

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
