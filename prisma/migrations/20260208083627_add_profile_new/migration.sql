/*
  Warnings:

  - Made the column `updatedAt` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Admin" ("address", "createdAt", "email", "fullName", "id", "password", "profilePicture", "salt", "updatedAt", "username") SELECT "address", "createdAt", "email", "fullName", "id", "password", "profilePicture", "salt", "updatedAt", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
