const fs = require('fs');
const folderName = process.argv[2] || 'project';

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.js`, '');
    fs.writeFileSync(`${folderName}/app.css`, '');
} catch (e) {
    console.log("Oops something went wrong!!!");
    console.log(e);
}
