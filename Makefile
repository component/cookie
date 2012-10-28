
build: components index.js
	@component build

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@mocha-phantomjs test/index.html

.PHONY: clean test
