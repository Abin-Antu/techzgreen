const fs = require('fs');
let html = fs.readFileSync('.stitch/designs/landing.html', 'utf8');
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyHtml = bodyMatch ? bodyMatch[1] : html;
// Replace class= with className=
let jsx = bodyHtml.replace(/class=/g, 'className=');
// Fix any unclosed tags or comments if needed
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
let component = `import React from 'react';

export default function StitchLanding() {
  return (
    <div className="bg-background text-on-background w-full min-h-screen font-body">
${jsx}    </div>
  );
}
`;
fs.mkdirSync('src/stitch-components', {recursive: true});
fs.writeFileSync('src/stitch-components/StitchLanding.tsx', component);
