'use strict';

var jillian = require('../index.js'),
	expect = require('expect.js');

describe('modifier', function() {
	var modifier = function(val) {
		return val + 100;
	};

	it('should be ok without modifier', function() {
		expect(function() {
			jillian(
				{foo: 1},
				{properties: {foo: {type: 'integer'}}},
				{throwError: true}
			);
		}).to.not.throwError();
	});

	it('should be ok with modifier', function() {
		expect(function() {
			var obj = {foo: 1};
			jillian(
				obj,
				{properties: {foo: {type: 'integer', modifier: modifier}}},
				{throwError: true}
			);
			expect(obj.foo).to.equal(101);
		}).to.not.throwError();
	});
});
