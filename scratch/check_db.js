const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Hero Slides ---');
  const slides = await prisma.heroSlide.findMany();
  slides.forEach(s => console.log(`Slide: ${s.title}\nImage: ${s.imageUrl}\n`));

  console.log('--- Timeline Events ---');
  const events = await prisma.timelineEvent.findMany();
  events.forEach(e => console.log(`Event: ${e.title}\nImage: ${e.imageUrl}\n`));

  console.log('--- Testimonials ---');
  const testimonials = await prisma.testimonial.findMany();
  testimonials.forEach(t => console.log(`Testimonial: ${t.alumniName}\nImage: ${t.imageUrl}\n`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
