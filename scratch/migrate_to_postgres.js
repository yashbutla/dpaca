const Database = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// 1. Connect to SQLite
const db = new Database('./dev.db');

// 2. Connect to PostgreSQL
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Please set the DATABASE_URL environment variable!");
  process.exit(1);
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrate() {
  console.log("Starting database migration from SQLite to Neon Postgres...");

  const tables = [
    { name: 'HeroSlide', model: prisma.heroSlide },
    { name: 'GalleryItem', model: prisma.galleryItem },
    { name: 'TimelineEvent', model: prisma.timelineEvent },
    { name: 'Testimonial', model: prisma.testimonial },
    { name: 'CsrProject', model: prisma.csrProject },
    { name: 'ContactEnquiry', model: prisma.contactEnquiry },
    { name: 'SystemSetting', model: prisma.systemSetting },
    { name: 'Partner', model: prisma.partner },
    { name: 'BoardMember', model: prisma.boardMember },
    { name: 'Founder', model: prisma.founder },
  ];

  for (const table of tables) {
    console.log(`\nMigrating table ${table.name}...`);

    // Read rows from SQLite
    let rows;
    try {
      rows = db.prepare(`SELECT * FROM ${table.name}`).all();
    } catch (e) {
      console.warn(`Could not read table ${table.name} from SQLite:`, e.message);
      continue;
    }
    console.log(`Found ${rows.length} rows in SQLite.`);

    // Clear existing rows in Postgres
    await table.model.deleteMany({});
    console.log(`Cleared existing default seed rows in Postgres.`);

    // Insert rows into Postgres
    for (const row of rows) {
      const cleanedData = { ...row };
      
      // SQLite stores booleans as 0/1 integers; convert them back to JS booleans
      if (table.name === 'HeroSlide') {
        cleanedData.published = cleanedData.published === 1 || cleanedData.published === true;
        cleanedData.order = Number(cleanedData.order);
      }
      if (table.name === 'GalleryItem') {
        cleanedData.isFeatured = cleanedData.isFeatured === 1 || cleanedData.isFeatured === true;
      }
      if (table.name === 'ContactEnquiry') {
        cleanedData.resolved = cleanedData.resolved === 1 || cleanedData.resolved === true;
      }
      if (table.name === 'BoardMember' || table.name === 'Founder') {
        cleanedData.order = Number(cleanedData.order);
      }
      // SQLite DateTime values are stored as ISO 8601 strings or numeric timestamps. Parse to Date objects.
      if (cleanedData.createdAt) {
        cleanedData.createdAt = new Date(cleanedData.createdAt);
      }
      if (cleanedData.date) {
        cleanedData.date = new Date(cleanedData.date);
      }

      await table.model.create({
        data: cleanedData
      });
    }
    console.log(`Successfully migrated ${rows.length} rows to Postgres.`);
  }

  console.log("\nMigration completed successfully!");
}

migrate()
  .catch(console.error)
  .finally(async () => {
    db.close();
    await prisma.$disconnect();
    await pool.end();
  });
