const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const Emitter = require('events');
const emitter = new Emitter();
const eventName = 'goodbye';


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
  })
}
init();

stdout.write('Hi, checker! Enter text to safe it in a file, please! \n');

stdin.on('data', data=> {
  process.on('SIGINT', () => {
    stdout.write('Good luck and bye!');
    process.exit();
  });
  const text = data.toString();
  const isExit = text.includes('exit') && (text.indexOf('exit') == text.length - 6);

  if(isExit) {
    stdout.write('Good luck and bye!');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), text, (error) => {
      if (error) return console.error(error.message);
      console.log('Text is added');
    });
  }
})
