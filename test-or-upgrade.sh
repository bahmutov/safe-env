#!/bin/bash

set -o xtrace

if [ "$TRAVIS_EVENT_TYPE" = "cron" ]; then
  echo "Upgrading dependencies using next-update"
  npm i -g next-update
  next-update --allow minor --latest false
  git status
  # if package.json is modified we have
  # new upgrades
  if git diff --name-only | grep package.json > /dev/null; then
    echo "There are new versions of dependencies 💪"
    git add package.json
    git diff package.json
    git config --global user.email "next-update@ci.com"
    git config --global user.name "next-update"
    git commit -m "chore(deps): upgrade dependencies using next-update"
    # push back to GitHub using token
    git remote remove origin
    # TODO read origin from package.json
    # or use github api module github
    # like in https://github.com/semantic-release/semantic-release/blob/caribou/src/post.js
    git remote add origin https://next-update:$GH_TOKEN@github.com/bahmutov/safe-env.git
    git push origin HEAD:master
  else
    echo "No new versions found ✋"
  fi
else
  echo "Not a cron job, normal test"
  npm test
fi

