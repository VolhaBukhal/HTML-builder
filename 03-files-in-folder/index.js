const fs = require('fs').promises;
const path = require('path');

const pathDir = path.join(path.dirname(__filename), 'secret-folder');

async function parseDir() {
  try {
    const files = await fs.readdir(pathDir);
    for( let file of files) {
      const filePath = path.join(pathDir, file);  
      const stats = await fs.stat(filePath);
      if(stats.isFile()) {
        const fileName = path.parse(file).name;
        const fileExtention = path.extname(file).slice(1);
        const fileSize = stats.size / 1000;
        console.log(`${fileName} - ${fileExtention} - ${fileSize}kb`);
      }
    }
  } catch (error) {
    return console.error(error.message);  
  }
}
parseDir();

