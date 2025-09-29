import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const [,, inputFile='public/feeds.xlsx', outFile='public/feeds.json'] = process.argv;

if (!fs.existsSync(inputFile)) {
  console.error('Input file not found:', inputFile);
  process.exit(1);
}

const wb = xlsx.readFile(inputFile);
const sheetName = wb.SheetNames[0]; // assume first sheet
const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

// Normalize into categories
const categories = {};
rows.forEach(row => {
  const category = (row.category || 'Uncategorized').toString().trim();
  if (!categories[category]) categories[category] = [];
  categories[category].push({
    title: (row.title || '').toString().trim(),
    xmlUrl: (row.xmlUrl || row.xmlurl || row.rss || '').toString().trim(),
    htmlUrl: (row.htmlUrl || row.htmlurl || row.link || '').toString().trim(),
    notes: (row.notes || '').toString().trim(),
  });
});

// Convert to array for easier ordering in UI
const out = Object.keys(categories).map(cat => ({
  category: cat,
  feeds: categories[cat]
}));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', outFile);
