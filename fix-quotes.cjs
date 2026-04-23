const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const contractions = [
  "don't", "doesn't", "it's", "we've", "we'll", "won't", "can't",
  "that's", "there's", "they're", "you'd", "you'll", "you're",
  "Reframe's", "driver's", "town's", "city's", "program's", "truck's"
];

let totalFixed = 0;
for (const f of files) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;

  for (const word of contractions) {
    const escaped = word.replace("'", "\\'");
    // Only replace inside single-quoted strings (where it causes issues)
    // Replace the word with its escaped version
    content = content.split(word).join(escaped);
  }

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('Fixed:', f);
    totalFixed++;
  }
}
console.log('Total fixed:', totalFixed, 'files');
