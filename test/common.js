'use strict';

var jillian = require('../index.js'),
	expect = require('expect.js');

describe('common', function() {
	it('should be ok without options', function() {
		var result = jillian({foo: 1}, {foo: {type: 'integer'}});
		expect(result.errors).to.be.empty();
	});

	it('should return errors', function() {
		var result = jillian({foo: '1'}, {foo: {type: 'integer'}});
		expect(result.errors).to.have.length(1);
	});
});
