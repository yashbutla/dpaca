// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing records
  await prisma.heroSlide.deleteMany({});
  await prisma.galleryItem.deleteMany({});
  await prisma.timelineEvent.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.csrProject.deleteMany({});
  await prisma.contactEnquiry.deleteMany({});
  await prisma.systemSetting.deleteMany({});
  await prisma.partner.deleteMany({});
  await prisma.boardMember.deleteMany({});
  await prisma.founder.deleteMany({});

  // 2. Add System Settings
  const settings = [
    { key: 'email', value: 'info@dpaca-ahilyanagar.org' },
    { key: 'phone', value: '+91 241 234 5678' },
    { key: 'address', value: 'District probation and after Care association observation home and children Home, zarekar lane near sabjail, ahilyanagar.' },
    { key: 'hours', value: 'Monday - Saturday: 10:00 AM - 6:00 PM (Sunday Closed)' },
    { key: 'registration', value: 'E-87 Ahilyanagar' },
  ];
  for (const s of settings) {
    await prisma.systemSetting.create({ data: s });
  }

  // 2.5 Add Partners
  const partnersList = [
    { name: 'CSA – Catalysts for Social Action' },
    { name: 'Cummins India' },
    { name: 'Feeding India' },
    { name: 'Shirdi Sansthan' },
  ];
  for (const p of partnersList) {
    await prisma.partner.create({ data: p });
  }


  // 3. Add default Hero Slider
  await prisma.heroSlide.create({
    data: {
      title: 'Empowering Vulnerable Communities, Championing Justice & Rehabilitation.',
      subtitle: 'Established in 1942, the District Probation and After Care Association (popularly known as the Observation Home of Ahilyanagar) is a pioneering social service organization dedicated to supporting individuals in need.',
      imageUrl: '/images/hero-classroom.jpg',
      order: 1,
      published: true,
    }
  });

  await prisma.heroSlide.create({
    data: {
      title: 'Over 80 Years of Uncompromising Child Welfare & Care.',
      subtitle: 'Serving children from underprivileged backgrounds across Maharashtra. Providing nutrition, education, safety, and a stepping stone to a bright future.',
      imageUrl: '/images/hero-care.jpg',
      order: 2,
      published: true,
    }
  });

  // 4. Add initial Gallery Items
  const gallery = [
    { imageUrl: '/images/gallery-1.jpg', caption: 'Active classroom learning session', category: 'Education', isFeatured: true },
    { imageUrl: '/images/gallery-2.jpg', caption: 'Recreational playground activity', category: 'Recreation', isFeatured: true },
    { imageUrl: '/images/gallery-3.jpg', caption: 'Vocational training lab setup', category: 'Vocational', isFeatured: true },
    { imageUrl: '/images/gallery-4.jpg', caption: 'Shishugruha safe infant nursery', category: 'Shishugruha', isFeatured: true },
    { imageUrl: '/images/gallery-5.jpg', caption: 'Nutritional boarding dining hall', category: 'Infrastructure', isFeatured: false },
    { imageUrl: '/images/gallery-6.jpg', caption: 'Administrative office block exterior', category: 'Infrastructure', isFeatured: false },
  ];
  for (const g of gallery) {
    await prisma.galleryItem.create({ data: g });
  }

  // 5. Add Timeline Events (Latest Updates)
  await prisma.timelineEvent.create({
    data: {
      title: 'Successful Alumni Meet',
      date: new Date('2025-01-26'),
      summary: 'Organized to help connect past students (who have grown up to become doctors, engineers, police officers, judges, and business owners) and grow our work organically.',
      imageUrl: '/images/update-alumni.jpg',
    }
  });

  await prisma.timelineEvent.create({
    data: {
      title: 'Reintegrating Lives',
      date: new Date('2025-02-21'),
      summary: 'Active steps taken to rehabilitate children from the observation home, including organizing the marriage of an orphan girl and generating sufficient donations to start the young couple on a firm footing.',
      imageUrl: '/images/update-marriage.jpg',
    }
  });

  // 6. Add Testimonials
  await prisma.testimonial.create({
    data: {
      alumniName: 'Ahilyanagar Alumni Association',
      profession: 'Alumni Cohort (Doctors, Judges, Engineers, Officers)',
      story: 'Past students of our institution include doctors, engineers, police officers, judges, social welfare officers, managerial personnel in industries, manufacturing workers, teachers, college professors, and staff members who have gained employment within the institution.',
      imageUrl: '/images/testimonial-bg.jpg',
    }
  });

  // 7. Add CSR Projects
  const projects = [
    { name: 'Office Block', dimensions: '1,200 sq ft Administrative Space', cost: '₹18,00,000', status: 'Seeking Funding' },
    { name: 'Residential Block', dimensions: '3,000 sq ft Dormitory Facilities', cost: '₹45,00,000', status: 'Urgent Requirement' },
    { name: 'Shishu Gruha Building', dimensions: '1,500 sq ft Nursery & Care Unit', cost: '₹25,00,000', status: 'Seeking Funding' },
    { name: 'Playground', dimensions: 'Equipped Recreational Outdoor Space', cost: '₹8,00,000', status: 'Fully Funded' },
    { name: 'Amphitheatre', dimensions: 'Open-Air Assembly & Performance Area', cost: '₹12,00,000', status: 'Seeking Funding' },
    { name: 'Library', dimensions: 'Equipped Reading Room & Computer Lab', cost: '₹10,00,000', status: 'Urgent Requirement' },
  ];
  for (const p of projects) {
    await prisma.csrProject.create({ data: p });
  }

  // 8. Add Mock Contact Enquiries
  await prisma.contactEnquiry.create({
    data: {
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@tatafoundation.org',
      phone: '+91 98234 56789',
      message: 'We are interested in evaluating the Shishu Gruha construction project for our CSR fiscal support. Please share the detailed engineering plan.',
      resolved: false,
    }
  });

  await prisma.contactEnquiry.create({
    data: {
      name: 'Sunita Deshmukh',
      email: 'sunita.d@gmail.com',
      phone: '+91 88888 77777',
      message: 'I would like to volunteer as a weekend teacher for the children at the Observation Home. Please let me know the application procedure.',
      resolved: true,
    }
  });

  // 9. Add Board Members
  const boardMembers = [
    { name: "Dr. Pankaj Ashiya (I.A.S); Collector", position: "Ex-officio President of DPACA", imageUrl: null, order: 1 },
    { name: "Adv. Achyut Digambar Chaudhary", position: "Vice President, DPACA", imageUrl: null, order: 2 },
    { name: "Adv. Govind Ramrao Mirikar", position: "Honorary Secretary", imageUrl: null, order: 3 },
    { name: "Adv. Jayvant Balvant Bhapkar", position: "Honorary Secretary", imageUrl: null, order: 4 },
    { name: "Dr. Shakil Fatima Bashirahmed Shaikh", position: "Honorary Secretary", imageUrl: null, order: 5 },
    { name: "Adv. Vishwas Dattatray Athare", position: "Honorary Treasurer", imageUrl: null, order: 6 },
    { name: "Dr. Amit Kamlakar Badve", position: "Board Member", imageUrl: null, order: 7 },
    { name: "Dr. Prachi Jaydeep Deshmukh", position: "Board Member", imageUrl: null, order: 8 },
    { name: "Dr. Kanchn Surendra Raccha", position: "Board Member", imageUrl: null, order: 9 },
    { name: "Dr. Meera Kulkarni", position: "Board Member", imageUrl: null, order: 10 },
    { name: "Smt. Vinita Ashutosh Gune", position: "Board Member", imageUrl: null, order: 11 },
    { name: "Smt. Jyoti Arun Pisute", position: "Board Member", imageUrl: null, order: 12 },
    { name: "Smt. Anuradha Athare", position: "Board Member", imageUrl: null, order: 13 },
  ];
  for (const b of boardMembers) {
    await prisma.boardMember.create({ data: b });
  }

  // 10. Add Founders
  const foundersList = [
    {
      name: "Late Sardar R. G. Mirikar",
      title: "Co-Founder & Social Reformer",
      initials: "RM",
      bio: "A prominent leader who combined social reform with dedicated community action, laying down the core philosophy of juvenile care and rehabilitative shelter.",
      imageUrl: null,
      order: 1
    },
    {
      name: "Late D. Y. Chaudhari",
      title: "Legal Counsel & Child Protection",
      initials: "DC",
      bio: "A legal scholar and advocate who established the administrative rules and protective frameworks to safeguard juvenile rights under statutory provisions.",
      imageUrl: null,
      order: 2
    },
    {
      name: "Late Prof. M. V. Ghaskadbi",
      title: "Academic Visionary & Educationist",
      initials: "MG",
      bio: "An intellectual and visionary educationist who structured the academic, moral, and vocational training models designed to make every child self-sufficient.",
      imageUrl: null,
      order: 3
    }
  ];
  for (const f of foundersList) {
    await prisma.founder.create({ data: f });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
