'use strict';

var jillian = require('../index.js'),
	_ = require('underscore'),
	expect = require('expect.js');

describe('filter', function() {
	var filter = function(val) {
		return val + 100;
	};

	it('should be ok without filter', function() {
		expect(function() {
			jillian({
				foo: 1
			}, {
				foo: {type: 'integer'}
			}, {throwError: true});
		}).to.not.throwError();
	});

	it('should be ok with filter', function() {
		expect(function() {
			var obj = {foo: 1};
			jillian(obj, {
				foo: {type: 'integer', filter: filter}
			}, {throwError: true});
			expect(obj.foo).to.equal(101);
		}).to.not.throwError();
	});
});