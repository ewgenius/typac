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

cleanup() {
  echo 'Cleaning up.'
  cd "$root_path"
  # Uncomment when snapshot testing is enabled by default:
  # rm ./packages/react-scripts/template/src/__snapshots__/App.test.js.snap
  rm -rf test
}

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
  cleanup
  mkdir test
  cd test
  touch package.json
  echo "{}" > package.json
}

# ******************************************************************************
# This tests typac commands
# ******************************************************************************

cd ..
root_path=$PWD

init_test_dir
"$root_path"/bin/typac.js react

init_test_dir
touch yarn.lock
"$root_path"/bin/typac.js react

init_test_dir
touch yarn.lock
"$root_path"/bin/typac.js @babel/core @babel/code-frame