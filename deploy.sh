#!/bin/bash

# abort on errors
set -e

# build
pnpm run prod_build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'oliver.akins.me' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Oliver-Akins/top-lists.git master:gh-pages

cd -