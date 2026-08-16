-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "taxId" TEXT,
    "address" TEXT,
    "city" TEXT,
    "billingAddress" TEXT,
    "billingCity" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ידני',
    "temperature" TEXT,
    "leadType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'חדש',
    "inquiredAt" DATETIME,
    "handedOverAt" DATETIME,
    "ownerId" TEXT,
    "externalId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contact_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("company", "createdAt", "email", "externalId", "id", "name", "phone", "role", "source", "tenantId") SELECT "company", "createdAt", "email", "externalId", "id", "name", "phone", "role", "source", "tenantId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE INDEX "Contact_tenantId_idx" ON "Contact"("tenantId");
CREATE INDEX "Contact_status_idx" ON "Contact"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
