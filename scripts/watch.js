const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();

const buildSass = require('./build-sass.js');

const artboardName = process.argv[2];
const artboardPath = path.resolve(__dirname, '..', 'artboards', `${artboardName}`);

if (typeof artboardName != 'string') {
  console.error('Artboard\'s name is invalid. Please try again.');
  process.exit();
} else if (!checkExistence(artboardPath)) {
  console.error('Artboard does not exist. Please create a new one.');
  process.exit();
} else {

  // watch SASS
  const inputSassDir = 'styles';
  const outputSassDir = 'assets';
  // build once
  buildSass(artboardPath, inputSassDir, outputSassDir);
  
  browserSync.watch(path.join(artboardPath, inputSassDir, '*.scss')).on('change', () => {
    buildSass(artboardPath, inputSassDir, outputSassDir);
    browserSync.reload();
  });

  // watch JS
  browserSync.watch(path.join(artboardPath, 'scripts', '*.js')).on('change', () => {
    browserSync.reload();
  });

  browserSync.init({
    server: artboardPath,
    serveStatic: [{
      route: ['/assets'],
      dir: path.join(artboardPath, '..', 'includes')
    }]
  });
}

function checkExistence(pathName) {
  console.log(pathName);
  return fs.existsSync(pathName);
}