#!/bin/bash

BRANCH=$1

if [ -z "$BRANCH" ]; then
  echo "Usage: ./safe-branch.sh branch-name"
  exit 1
fi

git status
echo "Make sure working tree is clean before continuing."
read -p "Continue? (y/n) " yn

if [ "$yn" != "y" ]; then
  exit 1
fi

git checkout main
git pull origin main
git checkout -b $BRANCH
git push -u origin $BRANCH

echo "Branch $BRANCH created and pushed safely."