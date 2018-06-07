const path = require('path');
const cp = require('child_process');

const newArtName = process.argv[2];

const _makeNewDir = `mkdir artboards/${newArtName} && mkdir artboards/${newArtName}/assets`;
const _copyTemplateFiles = `cp -r templates/default/* artboards/${newArtName}/`;

if (typeof newArtName != 'string') {
  console.error('Artboard\'s name is not of type string. Please try again.');
  process.exit();
} else {
  cp.exec(_makeNewDir, (error, stdout, stderr) => {
    console.log('Creating new artboard ........... 🤪');
    if (error) {
      console.error(error);
    } else {
      console.log('Injecting default template ........... 🐝');
      cp.exec(_copyTemplateFiles, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`New artboard generated under artboards/${newArtName} 🤟`);
        }
      });
    }
  });
}