
var package = require('./package.json');
var jsdoc = require('./.jsdoc.json');
var path = require('path');
var fs = require('fs');

const directory = 'docs';
var currentDocsPath = path.join(jsdoc.opts.destination, package.name, package.version);

// delete content of docs folder and its current old version contents
var deletePreviousDocs = function (inDir) {
  if (fs.existsSync(inDir)) {
    fs.readdirSync(inDir).forEach((file, index) => {
      const curDir = path.join(inDir, file);
      if (fs.lstatSync(curDir).isDirectory()) { // recurse
        deletePreviousDocs(curDir);
      } else { // delete file
        fs.unlinkSync(curDir);
      }
    });
    fs.rmdirSync(inDir);
  }
}

deletePreviousDocs(path.join('docs'));

var copyFolderSync = function (currentDocsPath, directory) {

  // make docs folder
  fs.mkdirSync(directory);

  // copy current docs for this version to docs folder
  fs.readdirSync(currentDocsPath).forEach(element => {
    if (fs.lstatSync(path.join(currentDocsPath, element)).isFile()) {
      fs.copyFileSync(path.join(currentDocsPath, element), path.join(directory, element));
    } else {
      copyFolderSync(path.join(currentDocsPath, element), path.join(directory, element));
    }
  });

}

copyFolderSync(currentDocsPath, directory);


