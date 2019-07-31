const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();

const artboardName = process.argv[2];
const artboardPath = path.resolve(__dirname, '..', 'artboards', `${artboardName}`);

if (typeof artboardName != 'string') {
  console.error('Artboard\'s name is invalid. Please try again.');
  process.exit();
} else if (!checkExistence(artboardPath)) {
  console.error('Artboard does not exist. Please create a new one.');
  process.exit();
} else {
  // watch JS
  browserSync.watch(path.join(artboardPath, 'scripts', '*.js')).on('change', () => {
    browserSync.reload();
  });

  browserSync.init({
    server: artboardPath,
    serveStatic: [{
      route: ['/assets'],
      dir: path.join(__dirname, '..', 'includes')
    }]
  });
}

function checkExistence(pathName) {
  return fs.existsSync(pathName);
}