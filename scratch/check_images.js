const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  console.log(`Directory does not exist: ${imagesDir}`);
  process.exit(1);
}

const files = fs.readdirSync(imagesDir);
console.log(`Found ${files.length} files in ${imagesDir}:`);

files.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
  console.log(`- ${file}: ${fileBuffer.length} bytes, MD5: ${hash}`);
});
