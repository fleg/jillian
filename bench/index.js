'use strict';

var Benchmark = require('benchmark'),
	conform = require('conform'),
	Ajv = require('ajv'),
	jillian = require('../index');

var suite = new Benchmark.Suite();

var obj = {
	foo: 1,
	bar: {
		foobar: 'foobar',
		baz: [1, 2, 3, 5]
	}
};

var schema = {
	properties: {
		foo: {type: 'integer'},
		bar: {
			type: 'object',
			properties: {
				foobar: {type: 'string'},
				baz: {
					type: 'array',
					maxLength: 10,
					uniqueItems: true,
					items: {type: 'integer'}
				}
			}
		}
	}
};

var ajv = new Ajv().compile(schema);

suite
	.add('ajv', function() {
		ajv(obj)
	})
	.add('conform', function() {
		conform.validate(obj, schema);
	})
	.add('jillian', function() {
		jillian(obj, schema);
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run();
