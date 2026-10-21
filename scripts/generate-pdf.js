const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'download');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Standard valid PDF 1.4 syntax
const lines = [
  '%PDF-1.4',
  '1 0 obj',
  '<< /Type /Catalog /Pages 2 0 R >>',
  'endobj',
  '2 0 obj',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  'endobj',
  '3 0 obj',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  'endobj',
  '4 0 obj',
  '<< /Length 580 >>',
  'stream',
  'BT',
  '/F1 16 Tf',
  '140 800 Td',
  '(JAMIA NESARIA ISLAMIA MADRASHA & ORPHANAGE) Tj',
  '/F1 11 Tf',
  '20 -22 Td',
  '(Markun, Tongi, Gazipur - Admission Application Form) Tj',
  '/F1 10 Tf',
  '-30 -30 Td',
  '(Session: 2026-2027 | Student Admission Circular & Form) Tj',
  '0 -25 Td',
  '(1. Student Name: ____________________________________________________) Tj',
  '0 -22 Td',
  '(2. Father Name: _____________________________________________________) Tj',
  '0 -22 Td',
  '(3. Mother Name: _____________________________________________________) Tj',
  '0 -22 Td',
  '(4. Birth Certificate / NID No: ______________________________________) Tj',
  '0 -22 Td',
  '(5. Date of Birth: ______________________ Age: _________ Years) Tj',
  '0 -22 Td',
  '(6. Desired Department: [ ] Maktab  [ ] Hifz  [ ] Kitab  [ ] Orphanage) Tj',
  '0 -22 Td',
  '(7. Residence Type: [ ] Residential  [ ] Non-Residential) Tj',
  '0 -22 Td',
  '(8. Contact Mobile: 01716296379 / 01734319426 / 01901447160) Tj',
  '0 -35 Td',
  '(Official Website: jamianesaria.com | Tongi, Gazipur) Tj',
  'ET',
  'endstream',
  'endobj',
  '5 0 obj',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  'endobj',
  'xref',
  '0 6',
  '0000000000 65535 f ',
  '0000000009 00000 n ',
  '0000000058 00000 n ',
  '0000000115 00000 n ',
  '0000000236 00000 n ',
  '0000000870 00000 n ',
  'trailer',
  '<< /Size 6 /Root 1 0 R >>',
  'startxref',
  '939',
  '%%EOF'
];

fs.writeFileSync(path.join(dir, 'admission-form.pdf'), lines.join('\n'));
console.log('PDF created successfully at public/download/admission-form.pdf');

