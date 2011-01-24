#!/bin/bash
# Georg Apitz
# 22.01.2011
# script to build the Textwerk SproutCore frontend
# and copy it into the Rails public directory and make according changes
# run as ./buildTextwerk.sh

# expects sproutcore gem installed for build tools
# expect to be run from lilypad_sc root

#set the app name
appname='textwerk'

# clear the build folder
`rm -rf tmp/build/static/textwerk`
`rm -rf tmp/build/static/standard_theme`
# build the app
echo "building the SC app"
`sc-build $appname  -rc` ## add this to have buildnumber be current: --build='current'

# get the build number
export APP_BUILD_NUMBER=`sc-build-number $appname`
export SCUI_BUILD_NUMBER=`sc-build-number scui`
export SC_BUILD_NUMBER=`sc-build-number sproutcore`
export STANDARD_THEME_BUILD_NUMBER=`sc-build-number standard_theme`

# remove the old static files in RAILS dir if there
echo "removing the SC app from public folder"
`rm -rf ../tw/public/static`

# copy the build over to RAILS app
echo "copying the SC app to public folder"
`cp -r tmp/build/static ../tw/public/`

# remove the old index file for the tw app from public/en
echo "removing index.html from public/en folder"
`rm -rf ../tw/public/en/index.html`

# copy the index file for the textwerk app to public/en
echo "copying index.html to public/en folder"
`cp -r tmp/build/static/textwerk/en/$APP_BUILD_NUMBER/index.html ../tw/public/en/`

#echo "copying resources folder to tw/public/static/textwerk/en/current/ folder"
`cp -r tmp/build/static/textwerk/en/$APP_BUILD_NUMBER/resources ../tw/public/static/textwerk/en/current`

# creating symlinks, not needed right now, and not supported by heroku since it is a read only file system
# echo "creating symlinks"
#`ln -sf $APP_BUILD_NUMBER ../tw/public/static/lilypad/en/current`
#
#`ln -sf $SCUI_BUILD_NUMBER ../tw/public/static/scui/en/current`
#
#`ln -sf $SC_BUILD_NUMBER ../tw/public/static/sproutcore/en/current`
#
#`ln -sf $STANDARD_THEME_BUILD_NUMBER ../tw/public/static/otixo_theme/en/current`

