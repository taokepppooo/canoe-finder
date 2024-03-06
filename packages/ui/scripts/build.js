import { build } from 'esbuild';
import Icons from 'unplugin-icons/esbuild';
import fs from 'fs';
import path from 'path';

function generateEntryPoints(baseDir) {
  const entryPoints = {};
  const directories = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  directories.forEach((dir) => {
    const files = fs.readdirSync(path.join(baseDir, dir));
    files.forEach((file) => {
      if (path.extname(file) === '.ts') {
        const name = path.join(dir, path.basename(file, '.ts'));
        const fullPath = path.join(baseDir, dir, file);
        entryPoints[name] = fullPath;
      }
    });
  });

  return entryPoints;
}

function addCssEntryPoints(entryPoints, baseDir, subDir = '') {
  const directoryPath = subDir ? path.join(baseDir, subDir) : baseDir;
  const items = fs.readdirSync(directoryPath, { withFileTypes: true });

  items.forEach((item) => {
    if (item.isDirectory()) {
      addCssEntryPoints(entryPoints, baseDir, path.join(subDir, item.name));
    } else if (path.extname(item.name) === '.css') {
      const name = `style/${subDir ? subDir + '/' : ''}${path.basename(item.name, '.css')}`;
      const fullPath = path.join(directoryPath, item.name);
      entryPoints[name] = fullPath;
    }
  });
}

const entryPoints = generateEntryPoints('src');
addCssEntryPoints(entryPoints, 'style');

build({
  entryPoints: entryPoints,
  bundle: true,
  outdir: 'dist',
  plugins: [Icons({})],
  loader: { '.ts': 'ts', '.css': 'css' },
  assetNames: '[dir]/[name]-[hash]',
  target: 'esnext',
});
