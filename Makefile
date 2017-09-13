build : clean
	node_modules/.bin/tsc

clean :
	rm -rf public/js/*

publish : build
	surge -d sketchbook.surge.sh -p ./public
