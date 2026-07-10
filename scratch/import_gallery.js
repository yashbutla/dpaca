const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const srcRoot = path.join(__dirname, '..', 'extracted_photos', 'WEBSITE PHOTO');
const destRoot = path.join(__dirname, '..', 'public', 'images', 'gallery');

// Ensure destRoot exists
if (!fs.existsSync(destRoot)) {
  fs.mkdirSync(destRoot, { recursive: true });
}

// Function to clean string for filenames
function cleanFilename(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const cleanBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_') // replace non-alphanumeric with underscore
    .replace(/_+/g, '_')         // shrink multiple underscores
    .trim();
  return cleanBase + ext.toLowerCase();
}

// Function to clean directory names for folders
function cleanDirname(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .trim();
}

function getCategoryAndSubcategory(relPath) {
  const parts = relPath.split(/[\\/]/).map(p => p.trim()).filter(Boolean);
  
  let category = "Infrastructure";
  let subcategory = "General";

  if (parts.length === 0) {
    return { category, subcategory };
  }

  const p1 = parts[0].toUpperCase();
  const p2 = parts[1] ? parts[1].toUpperCase() : "";
  const p3 = parts[2] ? parts[2].toUpperCase() : "";

  // 1. CLASS ROOM
  if (p1.includes("CLASS ROOM")) {
    category = "Education";
    subcategory = "Class Room";
  }
  // 2. COMPUTER LAB
  else if (p1.includes("COMPUTER LAB")) {
    category = "Vocational";
    subcategory = "Computer Lab";
  }
  // 3. VOCATIONAL ACTIVY
  else if (p1.includes("VOCATIONAL")) {
    category = "Vocational";
    if (p2.includes("BOYS")) {
      subcategory = "Observation Home Boys Activity";
    } else if (p2.includes("SCIENCE")) {
      subcategory = "Science Summer Camp";
    } else {
      subcategory = "Vocational Training";
    }
  }
  // 4. TAILORING CLASS (usually under ACTICITY)
  else if (p1.includes("ACTICITY") && p2.includes("TAILORING")) {
    category = "Vocational";
    subcategory = "Tailoring Class";
  }
  // 5. self defence
  else if (p1.includes("ACTICITY") && p2.includes("DEFENCE")) {
    category = "Vocational";
    subcategory = "Self Defence Training";
  }
  // 6. SPORT
  else if (p1.includes("SPORT")) {
    category = "Recreation";
    if (p2.includes("NASHIK")) {
      subcategory = "Nashik Baal Mahotsav";
    } else if (p2.includes("BAAL")) {
      subcategory = "Baal Mahotsav Sports";
    } else if (p2.includes("THAI")) {
      subcategory = "Thai Boxing";
    } else {
      subcategory = "Sports & Games";
    }
  }
  // 7. TRIP
  else if (p1.includes("TRIP")) {
    category = "Recreation";
    if (p2.includes("BHANDAAR") || p3.includes("BHANDAAR")) {
      subcategory = "Bhandardara Trip";
    } else if (p2.includes("BHIMA")) {
      subcategory = "Bhimashankar Trip";
    } else if (p2.includes("SWEET")) {
      subcategory = "Sweet Home Trip";
    } else {
      subcategory = "Educational Trips";
    }
  }
  // 8. YOGA
  else if (p1.includes("YOGA")) {
    category = "Recreation";
    subcategory = "Yoga & Wellness";
  }
  // 9. GARDEN
  else if (p1.includes("GARDEN")) {
    category = "Infrastructure";
    subcategory = "Garden & Organic Farming";
  }
  // 10. HEALTH CHECK UP
  else if (p1.includes("HEALTH")) {
    category = "Infrastructure";
    subcategory = "Health Check Up Camps";
  }
  // 11. NEW OFFICE
  else if (p1.includes("NEW OFFICE") || p1.includes("INOGRATION")) {
    category = "Infrastructure";
    subcategory = "Office Inauguration";
  }
  // 12. wedding programme
  else if (p1.includes("WEDDING") || p1.includes("MARRIAGE")) {
    category = "Events";
    subcategory = "Alumni Wedding Programme";
  }
  // 13. ANNUAL FUNCTION
  else if (p1.includes("ANNUAL FUNCTION")) {
    category = "Events";
    subcategory = "Annual Function";
  }
  // 14. ANNUAL MEETING
  else if (p1.includes("ANNUAL MEETING")) {
    category = "Events";
    subcategory = "Annual Meeting";
  }
  // 15. EVENTS
  else if (p1.includes("EVENTS")) {
    category = "Events";
    if (p2.includes("BAAL") || p2.includes("CHILD")) {
      subcategory = "Children's Day (Baal Din)";
    } else if (p2.includes("SHIV")) {
      subcategory = "Shiv Jayanti";
    } else {
      subcategory = "Special Events";
    }
  }
  // 16. 1 MAY 25
  else if (p1.includes("1 MAY")) {
    category = "Events";
    subcategory = "Maharashtra Day (1 May)";
  }
  // 17. 26 JAN
  else if (p1.includes("26 JAN")) {
    category = "Events";
    subcategory = "Republic Day (26 Jan)";
  }
  // 18. ACTICITY other
  else if (p1.includes("ACTICITY")) {
    category = "Recreation";
    if (p2.includes("DASRA") || p2.includes("PHUL")) {
      subcategory = "Dasara Phul Mala Activity";
    } else if (p2.includes("DIWALI")) {
      subcategory = "Diwali Activities";
    } else if (p2.includes("SUMMER")) {
      subcategory = "Summer Camp Activities";
    } else {
      subcategory = "Recreational Activities";
    }
  }
  // 19. Collector visit
  else if (p1.includes("COLLECTOR") || p1.includes("VISIT") || /[\u0900-\u097F]/.test(p1)) {
    category = "Events";
    subcategory = "District Collector Visit";
  }
  // 20. NEWS
  else if (p1.includes("NEWS")) {
    category = "Infrastructure";
    subcategory = "Press Coverage & News";
  }
  // 21. PPT
  else if (p1.includes("PPT")) {
    category = "Infrastructure";
    subcategory = "Presentation Slides";
  }

  return { category, subcategory };
}

async function main() {
  console.log("Starting gallery import...");
  
  // Clear existing gallery items in database
  console.log("Clearing existing gallery database records...");
  await prisma.galleryItem.deleteMany({});
  
  const itemsToCreate = [];
  let count = 0;
  
  function walk(dir) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        // It's a file, verify it's an image
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          const relPath = path.relative(srcRoot, fullPath);
          const { category, subcategory } = getCategoryAndSubcategory(relPath);
          
          // Generate clean destination path
          const cleanCatFolder = cleanDirname(category);
          const cleanSubcatFolder = cleanDirname(subcategory);
          const cleanFile = cleanFilename(file);
          
          const destDir = path.join(destRoot, cleanCatFolder, cleanSubcatFolder);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          const destFilePath = path.join(destDir, cleanFile);
          
          // Copy file
          fs.copyFileSync(fullPath, destFilePath);
          
          // Image URL for browser
          const imageUrl = `/images/gallery/${cleanCatFolder}/${cleanSubcatFolder}/${cleanFile}`;
          
          // Add to bulk creation list
          itemsToCreate.push({
            imageUrl,
            caption: `${subcategory} - Photo`,
            category,
            subcategory,
            isFeatured: count < 6 // Feature the first 6 images
          });
          
          count++;
        }
      }
    }
  }

  walk(srcRoot);
  
  console.log(`Inserting ${itemsToCreate.length} records into SQLite database via Prisma...`);
  
  // Perform bulk creation
  const result = await prisma.galleryItem.createMany({
    data: itemsToCreate
  });
  
  console.log(`Successfully imported ${result.count} images into the gallery database and copied files!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
