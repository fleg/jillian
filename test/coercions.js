'use strict';

var jillian = require('../index.js'),
	_ = require('underscore'),
	expect = require('expect.js');

var suites = {
	'integer': [1337, '1337'],
	'number': [1337, 13.37, '13.37'],
	'boolean': [true, false, 'true', 'false', 0, 1, '0', '1'],
	'null': [null, 'null']
};

describe('coercions', function() {
	_(suites).each(function(suite, type) {
		describe(type, function() {
			var schema = {
				type: 'object',
				properties: {
					foo: {type: 'type', required: true}
				}
			};
			_(suite).each(function(value) {
				it((typeof value) + ' `' + value + '`', function() {
					expect(function() {
						jillian({foo: value}, schema);
					}).to.not.throwError();
				});
			});
		});
	});
});