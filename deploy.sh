#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

echo 'http://www.sadcat.mn/' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:munkh-prvbt/somethings.git main:gh-pages

cd -