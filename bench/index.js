'use strict';

var Benchmark = require('benchmark'),
	conform = require('conform'),
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
		foo: {type: 'integer', required: true},
		bar: {
			type: 'object',
			properties: {
				foobar: {type: 'string', required: true},
				baz: {
					type: 'array',
					required: true,
					maxLength: 10,
					uniqueItems: true,
					items: {type: 'integer'}
				}
			}
		}
	}
}

suite
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