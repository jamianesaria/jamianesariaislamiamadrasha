import sharp from "sharp";

async function generateIcons() {
  const source = "public/jamia-logo-v2.png";
  console.log("Generating Google-compliant multiples-of-48 icons from", source);

  // 1. Google 1x (48x48)
  await sharp(source).resize(48, 48).png().toFile("public/favicon-48x48.png");
  // 2. Google 2x & Next icon.png (96x96)
  await sharp(source).resize(96, 96).png().toFile("public/favicon-96x96.png");
  await sharp(source).resize(96, 96).png().toFile("src/app/icon.png");
  // 3. Google 3x (144x144)
  await sharp(source).resize(144, 144).png().toFile("public/favicon-144x144.png");
  // 4. Google 4x & Android (192x192)
  await sharp(source).resize(192, 192).png().toFile("public/favicon-192x192.png");
  // 5. High-res PWA (512x512)
  await sharp(source).resize(512, 512).png().toFile("public/favicon-512x512.png");
  // 6. Apple touch icon (180x180)
  await sharp(source).resize(180, 180).png().toFile("public/apple-icon.png");
  await sharp(source).resize(180, 180).png().toFile("src/app/apple-icon.png");

  console.log("All icons generated successfully!");
}

generateIcons().catch(console.error);

