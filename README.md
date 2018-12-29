# TYPAC - TYped PACkage manager

[![Build Status](https://dev.azure.com/ewgeniux/typac/_apis/build/status/ewgenius.typac?branchName=master)](https://dev.azure.com/ewgeniux/typac/_build/latest?definitionId=1?branchName=master)
[![Build Status](https://travis-ci.org/ewgenius/typac.svg?branch=master)](https://travis-ci.org/ewgenius/typac)

Every time you need to do something like this ```npm install --save <package>``` and then ```npm install --save-dev @types/<package>``` *typac* is just for you!

![Imgur](http://i.imgur.com/V6d1zDw.gif)

## Description

Cli tool for installing npm package with corresponding ```@types``` typings package (if it exists).

## Install

```npm install -g typac```

or

```yarn global add typac```

## Usage
- ```typac <package>``` - install ```<package>``` in dependencies section and corresponding type definitions package in devDependencies section
- ```typac <package> -d``` or ```typac <package> --dev``` - install ```<package>``` and corresponding type definitions package, both in devDependencies section
- ```typac <package> -s``` or ```typac <package> --save``` - install ```<package>``` and corresponding type definitions package, both in dependencies section
- ```typac <package 1> [<package 2> ...]``` - install several packages

## TODO
* [ ] more complete tests
* [ ] npm/yarn error handling

#

Named by [@ploddi](https://github.com/ploddi)