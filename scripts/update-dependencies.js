/**
 * -p package path
 * -v package version
 */

const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const args = process.argv.slice(2);
let targetPackagePrefix = null;
let targetPackageVersion = 'latest';

args.forEach((arg, index) => {
  if (arg === '-p' && args[index + 1]) {
    targetPackagePrefix = args[index + 1];
  } else if (arg === '-v' && args[index + 1]) {
    targetPackageVersion = args[index + 1];
  }
});

if (!targetPackagePrefix) {
  console.error('Error: Package prefix (-p) is required.');
  process.exit(1);
}

function updateDependenciesRecursively(startPath) {
  if (!fs.existsSync(startPath)) return;

  const stats = fs.statSync(startPath);
  if (stats.isDirectory()) {
    if (path.basename(startPath) === 'node_modules') {
      return;
    }

    const packageJsonPath = path.join(startPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      updateDependenciesForPath(startPath);
    }
    fs.readdirSync(startPath).forEach(sub => {
      updateDependenciesRecursively(path.join(startPath, sub));
    });
  }
}

function updateDependenciesForPath(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    ['dependencies', 'devDependencies', 'peerDependencies', 'resolutions'].forEach(depType => {
      if (packageJson[depType]) {
        Object.keys(packageJson[depType]).forEach(dep => {
          if (dep.startsWith(targetPackagePrefix)) {
            console.log(`Updating ${dep} to version ${targetPackageVersion} in ${packagePath}`);
            const flag = depType === 'devDependencies' ? '-D' : '';
            execSync(`pnpm update ${flag} ${dep}@${targetPackageVersion}`, { stdio: 'inherit', cwd: packagePath });
          }
        });
      }
    });
  }
}

const rootDir = path.resolve(__dirname, '..');
updateDependenciesForPath(rootDir);

const packagesDir = path.join(rootDir, 'packages');
updateDependenciesRecursively(packagesDir);
