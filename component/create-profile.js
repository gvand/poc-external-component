const { writeFileSync, readdirSync } = require('fs');

const files = readdirSync('./dist');

writeFileSync('./dist/stats.json',
  JSON.stringify(
    files.map(fileName => `http://localhost:9002/${fileName}`),
    null, '  ')
);
