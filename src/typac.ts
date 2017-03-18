import * as fs from 'fs';
import * as path from 'path';
import * as programm from 'commander';
import { spawnSync } from 'child_process';

const pckg = require('../package.json');

interface ITypacProgramm {
  args: string[];
  dev: boolean;
  save: boolean;
  yarn: boolean;
}

const useYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));

programm
  .version(pckg.version)
  .usage('[options] package_name [package_name_1 ...]')
  .option('-d, --dev', 'save all to devDependencies')
  .option('-s, --save', 'save all to dependencies')
  .option('-y, --yarn', 'use yarn', useYarn)
  .parse(process.argv);

const prog = (programm as any) as ITypacProgramm;

const packages = prog.args;
const { dev, save, yarn } = prog;

console.log(packages, dev, save, yarn);

if (dev && save) {
  console.log('invalid arguments');
  process.exit(1);
}

let manager;
let installCommand;
let args;
let argsTyped;

if (yarn) {
  manager = 'yarnpkg';
  args = [
    'add',
  ];
  if (dev) {
    args.push('-D');
  }
  installCommand = ['add'];
  argsTyped = [
    'add',
    '-D',
  ];
} else {
  manager = 'npm';
  args = [
    'install',
    dev ? '--save-dev' : '--save',
  ];
  installCommand = ['install'];
  argsTyped = [
    'install',
    '--save-dev',
  ];
}

args.push(...packages);
argsTyped.push(...packages.map((p) => '@types/' + p));

const command = manager + ' ' + args.join(' ');
const commandTyped = manager + ' ' + argsTyped.join(' ');

console.log(command);
console.log(commandTyped);

const spawnParams = {
  stdio: 'inherit',
  cwd: process.cwd()
};

spawnSync(manager, args, spawnParams);
spawnSync(manager, argsTyped, spawnParams);
