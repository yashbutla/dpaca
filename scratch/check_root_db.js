const Database = require('better-sqlite3');

// Check root dev.db
const db = new Database('./dev.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables in root dev.db:', tables.map(t => t.name).join(', '));

if (tables.length > 0) {
  try {
    const heroSlides = db.prepare('SELECT title, imageUrl FROM "HeroSlide"').all();
    console.log('\n=== HERO SLIDES ===');
    heroSlides.forEach(s => console.log(' -', s.title.substring(0, 40), '->', s.imageUrl));
  } catch (e) { console.log('HeroSlide failed:', e.message); }

  try {
    const gallery = db.prepare('SELECT caption, imageUrl FROM "GalleryItem"').all();
    console.log('\n=== GALLERY ===');
    gallery.forEach(g => console.log(' -', g.caption, '->', g.imageUrl));
  } catch (e) { console.log('GalleryItem failed:', e.message); }

  try {
    const timeline = db.prepare('SELECT title, imageUrl FROM "TimelineEvent"').all();
    console.log('\n=== TIMELINE EVENTS ===');
    timeline.forEach(t => console.log(' -', t.title, '->', t.imageUrl));
  } catch (e) { console.log('TimelineEvent failed:', e.message); }

  try {
    const testimonials = db.prepare('SELECT alumniName, imageUrl FROM "Testimonial"').all();
    console.log('\n=== TESTIMONIALS ===');
    testimonials.forEach(t => console.log(' -', t.alumniName, '->', t.imageUrl));
  } catch (e) { console.log('Testimonial failed:', e.message); }
}

db.close();
