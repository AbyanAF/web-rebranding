-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Buat table baru dengan semua field baru
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT,
    "email" TEXT,
    "address" TEXT,
    "profilePicture" TEXT,
    "updatedAt" DATETIME  -- <-- TANPA NOT NULL dulu, biar bisa nambah kolom
);

-- Copy data lama, isi updatedAt dengan createdAt (atau waktu sekarang)
INSERT INTO "new_Admin" (
    "id", "username", "password", "salt", "createdAt", "updatedAt"
)
SELECT 
    "id", "username", "password", "salt", "createdAt", "createdAt"  -- pakai createdAt sebagai updatedAt awal
FROM "Admin";

-- Hapus table lama dan rename
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";

-- Buat ulang index unique
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;