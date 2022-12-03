#!/bin/sh

if [ -z "$(git status --porcelain)" ]; then
  old_branch=$(git branch --show-current)
  git branch -f deployment
  git checkout deployment


  rm -rf docs
  mkdir docs

  cd train
  npm run bundle
  cd ..

  git add -A
  git commit -m "build(deploy): deploying "$(git rev-parse --short HEAD)
  git push --force
  git checkout $old_branch
else 
  echo "Error: commit all changes before attempting deploying"
  exit 1
fi