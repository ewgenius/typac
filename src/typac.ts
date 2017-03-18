import * as programm from 'commander';
import * as spawn from 'cross-spawn';

const pckg = require('../package.json');

interface ITypacProgramm {
  args: string[];
  dev: boolean;
  yarn: boolean;
}

programm
  .version(pckg.version)
  .usage('[options] package_name [package_name_1 ...]')
  .option('-d, --dev', 'save all to dev')
  .option('-y, --yarn', 'use yarn', true)
  .parse(process.argv);

const prog = (programm as any) as ITypacProgramm;

const packages = prog.args;
const { dev, yarn } = prog;

console.log(packages, dev, yarn);

let manager;
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

spawn.sync(manager, args, { stdio: 'inherit' });
spawn.sync(manager, argsTyped, { stdio: 'inherit' });
