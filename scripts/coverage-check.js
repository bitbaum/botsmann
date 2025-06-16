const fs = require('fs');
const data = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
const pct = data.total.statements.pct;
if (pct < 80) {
  console.error(`Coverage ${pct}% is below 80%`);
  process.exit(1);
} else {
  console.log(`Coverage ${pct}%`);
}
