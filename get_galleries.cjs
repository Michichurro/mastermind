const fs = require('fs');
const path = require('path');

const publicProjectsDir = path.join(__dirname, 'public', 'projects');

const folders = ['Alvar', 'benave-home', 'Derosca', 'norte-19', 'Nuda'];
const idMap = {
  'Alvar': 'alvar',
  'benave-home': 'benave-home',
  'Derosca': 'derosca',
  'norte-19': 'norte-19',
  'Nuda': 'nuda'
};

const result = {};

folders.forEach(folder => {
  const dirPath = path.join(publicProjectsDir, folder);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
      .filter(f => /\.(png|jpe?g|mp4|webm)$/i.test(f))
      .map(f => `/projects/${folder}/${f}`);
    result[idMap[folder]] = files;
  }
});

console.log(JSON.stringify(result, null, 2));
