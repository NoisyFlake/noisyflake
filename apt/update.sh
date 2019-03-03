#!/bin/sh
rm -rf Packages.bz2

dpkg-scanpackages -m . /dev/null >Packages
bzip2 Packages
