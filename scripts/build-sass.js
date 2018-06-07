const path = require('path');
const fs = require('fs');
const sass = require('node-sass');
const cp = require('child_process');

const defaultConfig = {
  defaultInputName: 'main.scss',
  defaultOutputName: 'main.css'
};

function buildSass(artboardPath, inputDir, outputDir) {
  const artboardSass = path.join(artboardPath, inputDir);
  const inputFilePath = path.join(artboardSass, defaultConfig.defaultInputName);
  const outputFilePath = path.join(artboardPath, outputDir, defaultConfig.defaultOutputName);
  
  const buildCmd = `node-sass --include-paths ${artboardSass} ${inputFilePath} ${outputFilePath}`;

  cp.exec(buildCmd, (err, stdout, stderr) => {
    const { defaultInputName, defaultOutputName } = defaultConfig;
    if (err) {
      console.error(err);
      process.exit();
    }
    console.log(
      `${defaultInputName} --> ${path.join(outputDir, defaultOutputName)} --> 👍`
    );
  });
}

module.exports = buildSass;