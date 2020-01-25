#!/bin/bash

PLUGIN="guidepost"
VERSION=$(awk '/Version:/{print $NF}' $PLUGIN.php)
WORKING_DIR=`pwd`

mkdir -p $WORKING_DIR/release/svn
svn co "http://svn.wp-plugins.org/${PLUGIN}" $WORKING_DIR/release/svn

rm -rf $WORKING_DIR/release/svn/trunk/*
rm -rf $WORKING_DIR/release/svn/assets/*
rsync -av --progress $WORKING_DIR/release/$PLUGIN/* $WORKING_DIR/release/svn/trunk
rsync -av --progress $WORKING_DIR/.wordpress-org/* $WORKING_DIR/release/svn/assets

cd $WORKING_DIR/release/svn
svn status | grep '^!' | awk '{print $2}' | xargs svn delete
svn add * --force
svn commit -m "Pushing ${VERSION}"

svn cp trunk tags/$VERSION
svn commit -m "Taggin version ${VERSION}"

cd $WORKING_DIR
echo "https://downloads.wordpress.org/plugin/${PLUGIN}.${VERSION}.zip"