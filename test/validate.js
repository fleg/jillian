'use strict';

var jillian = require('../index.js'),
	_ = require('underscore'),
	expect = require('expect.js');

describe('validate', function() {
	var validate = function(val) {
		return val < 10;
	};

	it('should be ok without validate', function() {
		expect(function() {
			jillian({
				foo: 1
			}, {
				foo: {type: 'integer'}
			}, {throwError: true});
		}).to.not.throwError();
	});

	it('should pass validate', function() {
		expect(function() {
			jillian({
				foo: 1
			}, {
				foo: {type: 'integer', validate: validate}
			}, {throwError: true});
		}).to.not.throwError();
	});

	it('should not pass validate', function() {
		expect(function() {
			jillian({
				foo: 100
			}, {
				foo: {type: 'integer', validate: validate}
			}, {throwError: true});
		}).to.throwError(/property `foo` hasn\'t pass check/);
	});
});