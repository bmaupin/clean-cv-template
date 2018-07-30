#!/bin/bash

for htmlfile in *.html; do
    google-chrome-stable --headless --no-sandbox --disable-gpu --print-to-pdf file://$(pwd)/$htmlfile
    mv output.pdf "${htmlfile%.html}.pdf"
done
