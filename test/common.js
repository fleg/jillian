'use strict';

var jillian = require('../index.js'),
	expect = require('expect.js');

describe('common', function() {
	it('should be ok without options', function() {
		expect(jillian(
			{foo: 1},
			{properties: {foo: {type: 'integer'}}}
		).valid).to.be.ok();
	});

	it('should return errors', function() {
		expect(jillian(
			{foo: '1'},
			{properties: {foo: {type: 'integer'}}}
		).valid).not.ok(1);
	});
});
