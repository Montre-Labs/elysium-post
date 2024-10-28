-- CreateTable
CREATE TABLE "contact_topics" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "contact_topics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_topics_contactId_topic_key" ON "contact_topics"("contactId", "topic");

-- AddForeignKey
ALTER TABLE "contact_topics" ADD CONSTRAINT "contact_topics_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
