const PREFIX = '@types/';

export function typifyPackageName(name: string): string {
  if (name && name.length > 0 && name[0] === '@') {
    return PREFIX + name.slice(1).replace('/', '-');
  }
  return PREFIX + name;
}

export enum PackageManager {
  NPM = 'npm',
  YARN = 'yarn'
}

const Arguments = {
  install: {
    [PackageManager.NPM]: 'install',
    [PackageManager.YARN]: 'add',
  },
  save: {
    [PackageManager.NPM]: '--save',
    [PackageManager.YARN]: '',
  },
  saveDev: {
    [PackageManager.NPM]: '--save-dev',
    [PackageManager.YARN]: '--dev',
  }
};

export function installArguments(
  manager: PackageManager,
  packages: string[],
  save: boolean = false,
  dev: boolean = false
): string[] {
  if (!packages || !packages.length) {
    return [];
  }

  const args = [Arguments.install[manager]];

  if (save) {
    args.push(Arguments.save[manager]);
  } else if (dev) {
    args.push(Arguments.saveDev[manager]);
  }

  return args.concat(packages).filter((a: string) => !!a);
}
