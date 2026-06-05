import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const newContent = content
    .replace(/orange-100/g, 'theme-100')
    .replace(/orange-300/g, 'theme-300')
    .replace(/orange-400/g, 'theme-400')
    .replace(/orange-500/g, 'theme-500')
    .replace(/orange-600/g, 'theme-600')
    .replace(/orange-850/g, 'theme-850')
    // and red
    .replace(/red-500/g, 'theme-500')
    .replace(/red-600/g, 'theme-600');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
