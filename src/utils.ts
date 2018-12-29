const PREFIX = '@types/';

export function typifyPackageName(name: string): string {
  if (name && name.length > 0 && name[0] === '@') {
    return PREFIX + name.slice(1).replace('/', '-');
  }
  return PREFIX + name;
}
