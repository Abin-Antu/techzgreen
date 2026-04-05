const fs = require('fs');
const path = require('path');
const dir = 'src/stitch-components';

const files = fs.readdirSync(dir);
for (const f of files) {
  if (f.endsWith('.tsx')) {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/import React from 'react';\n*/g, '');
    fs.writeFileSync(filePath, content);
  }
}
console.log('Fixed imports');
