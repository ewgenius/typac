# TYPAC - TYped PACkage manager

Every time you need to do something like this ```npm install --save <package>``` and then ```npm install --save-dev @types/<package>``` *typac* is just for you!

## Description

Cli tool for installing npm package with corresponding ```@types``` typings package (if it exists).

## Usage

- ```typac <package>``` - install ```<package>``` in dependencies and corresponding type definitions package in devDependencies
- ```typac <package> -d``` or ```typac <package> --dev``` - install ```<package>``` and corresponding type definitions package, both in devDependencies

Name by @ploddy