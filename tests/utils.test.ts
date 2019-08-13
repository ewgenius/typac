import { typifyPackageName, installArguments, PackageManager } from '../src/utils';

describe('Utils.typifyPackageName', () => {
  it('should handle packages without namespace', () => {
    expect(typifyPackageName('react')).toEqual('@types/react');
  });

  it('should handle packages with namespace', () => {
    expect(typifyPackageName('@babel/core')).toEqual('@types/babel-core');
    expect(typifyPackageName('@babel/code-frame')).toEqual('@types/babel-code-frame');
    expect(typifyPackageName('@babel/webpack-plugin')).toEqual('@types/babel-webpack-plugin');
  });
});

describe('Utils.installArguments', () => {
  const testPackages = ['react', 'react-dom'];

  test.each([
    [PackageManager.NPM, [], false, false, ''],
    [PackageManager.NPM, testPackages, false, false, 'install react react-dom'],
    [PackageManager.NPM, testPackages, true, false, 'install --save react react-dom'],
    [PackageManager.NPM, testPackages, false, true, 'install --save-dev react react-dom'],
    [PackageManager.YARN, [], false, false, ''],
    [PackageManager.YARN, testPackages, false, false, 'add react react-dom'],
    [PackageManager.YARN, testPackages, true, false, 'add react react-dom'],
    [PackageManager.YARN, testPackages, false, true, 'add --dev react react-dom'],
  ])(
    'should handle install command',
    (manager: PackageManager, packages: string[], save: boolean, dev: boolean, expected: string) => {
      expect(installArguments(manager, packages, save, dev).join(' ')).toEqual(expected);
    });
});
