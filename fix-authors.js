const fs = require('fs');

let content = fs.readFileSync('lib/mockData.ts', 'utf8');

// Replace all author object literals with author array references
content = content.replace(/author: \{ en: 'Michael Chen', dv: '[^']+' \}/g, "author: authors[2], // Michael Chen");
content = content.replace(/author: \{ en: 'Jennifer Williams', dv: '[^']+' \}/g, "author: authors[3], // Jennifer Williams");
content = content.replace(/author: \{ en: 'Robert Taylor', dv: '[^']+' \}/g, "author: authors[4], // Robert Taylor");
content = content.replace(/author: \{ en: 'Sarah Johnson', dv: '[^']+' \}/g, "author: authors[0], // Sarah Johnson");
content = content.replace(/author: \{ en: 'Ahmed Rahman', dv: '[^']+' \}/g, "author: authors[1], // Ahmed Rahman");

fs.writeFileSync('lib/mockData.ts', content, 'utf8');
console.log('Authors updated successfully!');
