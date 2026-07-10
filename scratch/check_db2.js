const Database = require('better-sqlite3');
const db = new Database('./prisma/dev.db');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name).join(', '));

try {
  // Try lowercase table names (Prisma sometimes uses them)
  const heroSlides = db.prepare('SELECT * FROM "HeroSlide"').all();
  console.log('\n=== HERO SLIDES ===');
  heroSlides.forEach(s => console.log(s.title, '->', s.imageUrl));
} catch (e) {
  console.log('HeroSlide query failed:', e.message);
}

try {
  const gallery = db.prepare('SELECT imageUrl, caption FROM "GalleryItem"').all();
  console.log('\n=== GALLERY ===');
  gallery.forEach(g => console.log(g.caption, '->', g.imageUrl));
} catch (e) {
  console.log('GalleryItem query failed:', e.message);
}

try {
  const timeline = db.prepare('SELECT imageUrl, title FROM "TimelineEvent"').all();
  console.log('\n=== TIMELINE EVENTS ===');
  timeline.forEach(t => console.log(t.title, '->', t.imageUrl));
} catch (e) {
  console.log('TimelineEvent query failed:', e.message);
}

try {
  const testimonials = db.prepare('SELECT imageUrl, alumniName FROM "Testimonial"').all();
  console.log('\n=== TESTIMONIALS ===');
  testimonials.forEach(t => console.log(t.alumniName, '->', t.imageUrl));
} catch (e) {
  console.log('Testimonial query failed:', e.message);
}

db.close();
