const fs = require('fs');

const html = fs.readFileSync('src/stitch-components/extracted/code.html', 'utf8');

// Match the tailwind config block
const match = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*<\/script>/);
if (!match) {
  console.error("No tailwind config found");
  process.exit(1);
}

// Extract using regex or Function constructor
let configStr = match[1];
let parsed;
try {
  parsed = new Function('return ' + configStr)();
} catch(e) {
  console.error("Error parsing config", e);
  process.exit(1);
}

const colors = parsed.theme.extend.colors;
let cssVars = `\n@theme {\n`;

for (const [key, val] of Object.entries(colors)) {
  cssVars += `  --color-${key}: ${val};\n`;
}
cssVars += `}\n`;

let indexCss = fs.readFileSync('src/index.css', 'utf8');

// If there's already a @theme block for colors we might want to be careful, 
// but we can just append it at the end of the file. Tailwind v4 will merge @theme blocks.
fs.writeFileSync('src/index.css', indexCss + cssVars);
console.log("Appended styles to src/index.css");
