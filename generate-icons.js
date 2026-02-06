// Quick script to generate static PNG icons from SVG
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateIcons() {
  const svgPath = path.join(__dirname, 'public', 'favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  try {
    // Generate 180x180 Apple touch icon
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
    console.log('✓ Generated apple-touch-icon.png (180x180)');

    // Generate 192x192 Android icon
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-192.png'));
    console.log('✓ Generated icon-192.png (192x192)');

    // Generate 512x512 Android icon
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-512.png'));
    console.log('✓ Generated icon-512.png (512x512)');

    console.log('\n✓ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
