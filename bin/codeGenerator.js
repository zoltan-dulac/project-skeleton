/* eslint-disable no-console */
/*
 * condeGenerator.js is an example node application that uses
 * config.js to generate skeleton code for a multi-component
 * application.
 *
 */

const myArgs = process.argv.slice(2);
const command = process.argv[1];

const Config = require('config-xml-js');
const fs = require('fs');
const path = require('path');

function camelToSnake(string) {
  return string.replace(/[\w]([A-Z])/g, function(m) {
    return m[0] + '-' + m[1];
  }).toLowerCase();
}


// Creates all the directories in the path targetDir.
// From https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}

if (myArgs.length !== 2 && myArgs.length !== 3) {
  console.error(`Error! Usage: ${command} <XML_FILE> <JS_CLASSNAME> {<PARENT_COMPONENT>}`);
  return;
}

const file = myArgs[0];
const jsClassName = myArgs[1];
const cssClassName = camelToSnake(myArgs[1]);
let parent = '';
if (myArgs.length === 3) {
  parent = myArgs[2];
}

const config = new Config();
config.nodeInit(file);
const macros = {
  JS_CLASSNAME: jsClassName,
  CSS_CLASSNAME: cssClassName,
  PARENT: parent
};


const componentDir = config.getScriptedValue('.componentDir', macros);

// First ... create the component directory if it doesn't exist
if (fs.existsSync(componentDir)) {
  console.error(`Error: Directory ${componentDir} exists.`);
  console.error(`Please use a different component name than ${jsClassName}`);
  return;
}

mkDirByPathSync(componentDir);

// Next, write the js, loader and scss files from the xml template.
fs.writeFileSync(`${componentDir}/index.js`, config.getScriptedValue('.js', macros), function(err) {
  if (err) {
    throw err;
  }
});
console.log('index.js saved.');

if (parent === '') {
  fs.writeFileSync(`${componentDir}/loader.js`, config.getScriptedValue('.loader', macros), function(err) {
    if (err) {
      throw err;
    }
  });
} else {
  console.log('Since this is a subcomponent, no loader is needed.');
}

console.log('loader.js saved.');


fs.writeFileSync(`${componentDir}/style.scss`, config.getScriptedValue('.scss', macros), function(err) {
  if (err) {
    throw err;
  }
});

console.log('style.scss saved.');

console.log('');
console.log('Done!');
if (parent === '') {
  console.log('');
  console.log('');
  console.log('');
  console.log('******************************************************************************');
  console.log('*');
  console.log('* IMPORTANT!!!!! ');
  console.log('* --------------');
  console.log('* ');
  console.log('* If this is to be a higher level component that has a backend equivalent');
  console.log('* please put the following line is src/js/components/loaders.js');
  console.log('*');
  console.log(`* components.${jsClassName} = require('components/${jsClassName}/loader.js').default;`);
  console.log('*');
  console.log('******************************************************************************');
  console.log('');
  console.log('');
  console.log('');
}
