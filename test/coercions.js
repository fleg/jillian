'use strict';

var jillian = require('../index.js'),
	_ = require('underscore'),
	expect = require('expect.js');

var suites = {
	integer: {
		pass: [1337, -1337, '1337', '-1337', '+1337'],
		fail: ['13+37']
	},
	number: {
		pass: [1337, 13.37, -1337, -13.37, '1337', '13.37',
			'-1337', '-13.37', '+1337', '+13.37'],
		fail: ['13+37', '13,37']
	},
	'boolean': {
		pass: [true, false, 'true', 'false', 0, 1, '0', '1'],
		fail: [undefined, 'undefined']
	},
	'null': {
		pass: [null, 'null'],
		fail: [undefined, 'undefined']
	}
};

describe('coercions', function() {
	_(suites).each(function(suite, type) {
		describe(type, function() {
			_(suite.pass).each(function(value) {
				it(
					'should be ok with ' + (typeof value) + ' `' + value + '`',
					function() {
						expect(function() {
							jillian(
								{foo: value},
								{foo: {type: type, required: true}},
								{coercions: true, throwError: true}
							);
						}).to.not.throwError();
					}
				);
			});

			_(suite.fail).each(function(value) {
				it(
					'should throw error with ' + (typeof value) + ' `' + value + '`',
					function() {
						expect(function() {
							jillian(
								{foo: value},
								{foo: {type: type, required: true}},
								{coercions: true, throwError: true}
							);
						}).to.throwError();
					}
				);
			});
		});
	});
});
