import * as programm from 'commander';
const pckg = require('../package.json');

interface ITypacProgramm {
  args: string[];
}

programm
  .version(pckg.version)
  .usage('[options] package_name [package_name_1 ...]')
  .option('-d, --dev', 'save all to dev')
  .option('-m, --manager <manager>', 'set npm or yarn explicit')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

const prog = (programm as any) as ITypacProgramm;

const packages = prog.args;

console.log(packages);
