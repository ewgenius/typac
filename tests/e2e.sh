#!/bin/bash

# ******************************************************************************
# This tests typac commands
# Some commands are taken from create-react-app https://github.com/facebookincubator/create-react-app
# ******************************************************************************

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# CLI and app temporary locations
# http://unix.stackexchange.com/a/84980
temp_cli_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_cli_path'`
temp_app_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_app_path'`

# Error messages are redirected to stderr
handle_error() {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2;
  cleanup
  echo 'Exiting with error.' 1>&2;
  exit 1
}

handle_exit() {
  cleanup
  echo 'Exiting without error.' 1>&2;
  exit
}

init_test_dir() {
  temp_app_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_app_path'`
  echo "Testing at path: $temp_app_path"
  cd $temp_app_path
  touch package.json
  echo "{}" > package.json
}

# ******************************************************************************
# This tests typac commands
# ******************************************************************************

cd ..
root_path=$PWD

init_test_dir
"$root_path"/bin/typac.js react 2>&1 | tee "$temp_app_path"/log.txt
if [ -e "$temp_app_path"/node_modules/react ] && [ -e "$temp_app_path"/node_modules/@types/react ]
then
  printf "\033[0;32m'typac.js react' [npm]: Succeeded\033[0m\n"
else
  ls -la "$temp_app_path"/node_modules
  exit 1
fi

init_test_dir
touch yarn.lock
"$root_path"/bin/typac.js react 2>&1 | tee "$temp_app_path"/log.txt
if [ -e "$temp_app_path"/node_modules/react ] && [ -e "$temp_app_path"/node_modules/@types/react ]
then
  printf "\033[0;32m'typac.js react' [yarn]: Succeeded\033[0m\n"
else
  ls -la "$temp_app_path"/node_modules
  exit 1
fi

init_test_dir
touch yarn.lock
"$root_path"/bin/typac.js @babel/core @babel/code-frame 2>&1 | tee "$temp_app_path"/log.txt
if [ -e "$temp_app_path"/node_modules/@babel/core ] && [ -e "$temp_app_path"/node_modules/@babel/code-frame ] && [ -e "$temp_app_path"/node_modules/@types/babel-core ] && [ -e "$temp_app_path"/node_modules/@types/babel-code-frame ]
then
  printf "\033[0;32m'typac.js @babel/core @babel/code-frame' [yarn]: Succeeded\033[0m\n"
else
  ls -la "$temp_app_path"/node_modules
  exit 1
fi
