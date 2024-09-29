-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT,
    "retailerSku" TEXT,
    "available" BOOLEAN,
    "legacyOfferId" INTEGER,
    "name" TEXT,
    "price" INTEGER,
    "originalPrice" INTEGER,
    "discount" INTEGER,
    "humanVolume" TEXT,
    "volume" INTEGER,
    "volumeType" TEXT,
    "itemsPerPack" INTEGER,
    "discountEndsAt" TEXT,
    "priceType" TEXT,
    "gramsPerUnit" INTEGER,
    "unitPrice" INTEGER,
    "originalUnitPrice" INTEGER,
    "score" INTEGER,
    "imageUrl" TEXT,
    "slug" TEXT,
    "maxSelectQuantity" INTEGER,
    "canonicalUrl" TEXT,
    "maxPerOrder" INTEGER
);
