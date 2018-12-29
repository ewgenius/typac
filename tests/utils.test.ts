import { typifyPackageName } from '../src/utils';

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
