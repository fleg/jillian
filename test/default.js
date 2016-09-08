'use strict';

var jillian = require('../index.js'),
	expect = require('expect.js');

describe('default', function() {
	it('should be ok with default value', function() {
		var obj = {};
		expect(jillian(
			obj,
			{properties: {foo: {type: 'integer', 'default': 1}}},
			{defaultValue: true}
		).valid).to.be.ok();
		expect(obj.foo).to.equal(1);
	});
});
