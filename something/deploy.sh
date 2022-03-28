#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

echo 'www.sadcat.mn' > CNAME

git init
git add -A
git commit -m 'deploy'

cd -