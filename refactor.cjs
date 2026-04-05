const fs = require('fs');

const file = fs.readFileSync('src/stitch-components/StitchLanding.tsx', 'utf8');

function extract(regex) {
  const match = file.match(regex);
  return match ? match[1] : '';
}

const navbar = extract(/{(?:\/\*)?\s*TopNavBar Component\s*(?:\*\/)?}\s*(<nav[\s\S]*?<\/nav>)/);
const hero = extract(/{(?:\/\*)?\s*Hero Section\s*(?:\*\/)?}\s*(<section[\s\S]*?<\/section>)/);
const rewards = extract(/{(?:\/\*)?\s*Eco-Rewards Bento Section\s*(?:\*\/)?}\s*(<section[\s\S]*?<\/section>)/);
const events = extract(/{(?:\/\*)?\s*Upcoming Eco-Events Section\s*(?:\*\/)?}\s*(<section[\s\S]*?<\/section>)/);
const impact = extract(/{(?:\/\*)?\s*Impact Metric Feature\s*(?:\*\/)?}\s*(<section[\s\S]*?<\/section>)/);
const footer = extract(/{(?:\/\*)?\s*Footer Component\s*(?:\*\/)?}\s*(<footer[\s\S]*?<\/footer>)/);

function writeComponent(name, jsx) {
  if (!jsx) return;
  const content = `import React from 'react';\n\nexport default function ${name}() {\n  return (\n    <>\n      {/* ${name} */}\n      ${jsx}\n    </>\n  );\n}\n`;
  fs.writeFileSync(`src/stitch-components/${name}.tsx`, content);
}

writeComponent('StitchNavbar', navbar);
writeComponent('StitchHero', hero);
writeComponent('StitchRewards', rewards);
writeComponent('StitchEvents', events);
writeComponent('StitchImpact', impact);
writeComponent('StitchFooter', footer);

const landingContent = `import React from 'react';
import StitchNavbar from './StitchNavbar';
import StitchHero from './StitchHero';
import StitchRewards from './StitchRewards';
import StitchEvents from './StitchEvents';
import StitchImpact from './StitchImpact';
import StitchFooter from './StitchFooter';

export default function StitchLanding() {
  return (
    <div className="bg-background text-on-background w-full min-h-screen font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <StitchNavbar />
      <main className="pt-24">
        <StitchHero />
        <StitchRewards />
        <StitchEvents />
        <StitchImpact />
      </main>
      <StitchFooter />
    </div>
  );
}
`;

fs.writeFileSync('src/stitch-components/StitchLanding.tsx', landingContent);
console.log("Modules created successfully.");
