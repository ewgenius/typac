import * as fs from 'fs';
import * as path from 'path';
import * as programm from 'commander';
import { spawnSync, SpawnSyncOptions } from 'child_process';
import { typifyPackageName } from './utils';

const pckg = require('../package.json');

interface ITypacProgramm {
  args: string[];
  dev: boolean;
  save: boolean;
}

const useYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));

programm
  .version(pckg.version)
  .usage('[options] package_name [package_name_1 ...]')
  .option('-d, --dev', 'save all to devDependencies')
  .option('-s, --save', 'save all to dependencies')
  .parse(process.argv);

const prog = (programm as any) as ITypacProgramm;

const packages = prog.args;
const { dev, save } = prog;

if (dev && save) {
  console.log('--dev and --save flags are mutually exclusive, only one allowed');
  process.exit(1);
}

let manager;
let args; // arguments for package install
let argsTyped; // arguments fro ypings install

if (useYarn) {
  manager = 'yarnpkg';
  args = [
    'add',
  ];
  if (dev) {
    args.push('-D');
  }
  argsTyped = ['add'];
  if (!save) {
    argsTyped.push('-D');
  }
} else {
  manager = 'npm';
  args = [
    'install',
    dev ? '--save-dev' : '--save'
  ];
  argsTyped = [
    'install',
    save ? '--save' : '--save-dev'
  ];
}

args.push(...packages);
argsTyped.push(...packages.map((p) => typifyPackageName(p)));

const command = manager + ' ' + args.join(' ');
const commandTyped = manager + ' ' + argsTyped.join(' ');

console.log('installing', packages.length, `package${packages.length > 1 ? 's' : ''} with`, useYarn ? 'yarn' : 'npm');

const spawnParams: SpawnSyncOptions = {
  stdio: 'inherit',
  cwd: process.cwd()
};

console.log('running', command);
spawnSync(manager, args, spawnParams);
console.log('running', commandTyped);
spawnSync(manager, argsTyped, spawnParams);
