#!/bin/sh

if [ -d ./templates/_complex-content ] || [ -d ./templates/_blocks ] || [ -d ./templates/component-gallery ]
then
    echo Complex Content is already installed OR you have conflicting directories in your templates folder.
else
    mkdir ./templates/_complex-content && \
    mkdir ./templates/_blocks && \
    mkdir ./templates/component-gallery && \
    mkdir ./cc-temp && \
    cd ./cc-temp && \
    curl -SL https://github.com/Pageworks/papertrain/archive/v0.1.1.zip | tar -xf - -C ./ && \
    cd ../ && \
    mv ./cc-temp/papertrain-0.1.1 ./modules && \
    rmdir ./cc-temp && \
    echo Complex Content has been installed.
fi