#!/bin/bash

PLUGIN="guidepost"
VERSION=$(awk '/Version:/{print $NF}' $PLUGIN.php)

WORKING_DIR=`pwd`

rm -rf $WORKING_DIR/release
mkdir -p release/$PLUGIN

rm -rf $WORKING_DIR/build
npm run build

rsync -av --progress --exclude={'.*','node_modules','release','src','vendor','wordpress','composer*','package*','phpcs.xml','README.md','webpack*'} $WORKING_DIR/* $WORKING_DIR/release/$PLUGIN
cd $WORKING_DIR/release/
zip -r "${PLUGIN}-${VERSION}.zip" $PLUGIN
cd $WORKING_DIR/