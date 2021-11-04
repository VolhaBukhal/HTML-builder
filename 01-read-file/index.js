const {stdout} = process;
const path = require('path');
const fs = require('fs');

fs.readFile(path.join(path.dirname(__filename), 'text.txt'), (err, data) => {
  if(err) {
    return console.error(err.message);
  }
  const text = data.toString();
  stdout.write(text);
})
