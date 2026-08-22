const { execSync } = require('child_process');
const pkg = require('../package.json');

const version = pkg.version;
const tag = `v${version}`;

try {
  // check se tag existe
  execSync(`git rev-parse ${tag}`, { stdio: 'ignore' });
  console.log(`✅ Tag ${tag} já existe`);
} catch {
  // criar tag
  execSync(`git tag ${tag}`);
  execSync(`git push origin ${tag}`);
  console.log(`🏷️ Tag ${tag} criada e enviada`);
}
