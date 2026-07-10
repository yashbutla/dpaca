const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Adding new home banners...');

  // Add Option 1: Yoga & Wellness
  const slide1 = await prisma.heroSlide.create({
    data: {
      title: 'Nurturing Mind, Body, and Spirit.',
      subtitle: 'Daily yoga and wellness sessions to promote mental health, physical fitness, and holistic growth for all sheltered children.',
      imageUrl: '/images/gallery/recreation/yoga_wellness/whatsapp_image_2025_06_21_at_11_20_27_am.jpeg',
      order: 3,
      published: true,
    }
  });
  console.log('Added Slide 1:', slide1.title);

  // Add Option 2: Self Defence Training
  const slide2 = await prisma.heroSlide.create({
    data: {
      title: 'Empowering Children with Strength & Confidence.',
      subtitle: 'Vocational self-defence courses to build courage, discipline, and personal safety awareness.',
      imageUrl: '/images/gallery/vocational/self_defence_training/whatsapp_image_2026_01_06_at_2_12_41_pm.jpeg',
      order: 4,
      published: true,
    }
  });
  console.log('Added Slide 2:', slide2.title);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
