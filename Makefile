build : format clean
	node_modules/.bin/tsc

clean :
	rm -rf public/js/*

publish : build
	surge -d sketchbook.surge.sh -p ./public

format :
	find ./src -type f -name *.ts -exec prettier --write --tab-width 4 {} \;
