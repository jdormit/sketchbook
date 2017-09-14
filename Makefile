build : format clean
	node_modules/.bin/tsc

clean :
	rm -rf public/js/*

publish : build
	node_modules/.bin/surge -d sketchbook.surge.sh -p ./public

format :
	find ./src -type f -name *.ts -exec node_modules/.bin/prettier --write --tab-width 4 {} \;
