const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');

function init() {
  const pathFile = 'text.txt';
  fs.access(pathFile, fs.F_OK, (err) => {
    if(err) {
      fs.writeFile(
        path.join(__dirname, 'text.txt'),
        '',
        (err) => {
          if(err) throw err;
        }
      );
    }
  });
}
init();

stdout.write('Hi, checker! Enter text to safe it in a file, please! \n');

stdin.on('data', data=> {
  process.on('SIGINT', () => {
    stdout.write('Good luck and bye!');
    process.exit();
  });
  let text = data.toString().trim();
  const isExit = text.includes('exit') && (text.indexOf('exit') == text.length - 4);

  if(isExit) {
    stdout.write('Good luck and bye!');
    process.exit();
  } else {
    text = text + '\n';
    fs.appendFile(path.join(__dirname, 'text.txt'), text, (error) => {
      if (error) return console.error(error.message);
    });
  }
});
