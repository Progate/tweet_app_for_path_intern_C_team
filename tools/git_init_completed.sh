#!/bin/bash

# Test if git init has been completed and there is at least one commit.

# setup
PROJECT_DIR=$(dirname $(cd $(dirname $0); pwd))

RED='\033[0;31m'
NC='\033[0m' # No Color

cd "$PROJECT_DIR"

# git init check

## 1. Test if git repository exists in $GIT_DIR.
res=$(git rev-parse --show-toplevel)
if [ "$res" != "$PWD" ]; then
  echo -e "${RED}Error: git repository does not exist in ${PWD} directory.${NC}"
  exit 1
fi;

# initial commit check
## "4b825dc642cb6eb9a060e54bf8d69288fbee4904" is the SHA of the empty-tree
## https://stackoverflow.com/questions/9765453/is-gits-semi-secret-empty-tree-object-reliable-and-why-is-there-not-a-symbolic
res=$(git rev-list --count 4b825dc642cb6eb9a060e54bf8d69288fbee4904 HEAD)
if [[ $res -le 0 ]]; then
  echo -e "${RED}Error: the first git commit has not been made.${NC}"
  echo -e "${RED}Please: 'git add .' and 'git commit -m \"initial commit\"'.${NC}"
  exit 1
fi;

echo "ok"
exit 0
