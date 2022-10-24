-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "released" BOOLEAN NOT NULL DEFAULT false,
    "singerId" INTEGER,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_email_key" ON "Artist"("email");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_singerId_fkey" FOREIGN KEY ("singerId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
