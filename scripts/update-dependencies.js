/**
 * -p 包路径
 * -v 版本
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

// 函数用于递归地更新指定目录下的所有 package.json 文件
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

// 函数用于更新指定路径下的 package.json 中的特定依赖
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

// 更新项目根目录下的 package.json
const rootDir = path.resolve(__dirname, '..');
updateDependenciesForPath(rootDir);

// 递归地更新 packages 目录下的每个包（包括嵌套的项目，但排除 node_modules）
const packagesDir = path.join(rootDir, 'packages');
updateDependenciesRecursively(packagesDir);
