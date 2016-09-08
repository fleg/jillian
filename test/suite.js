'use strict';

var _ = require('underscore'),
	glob = require('glob'),
	expect = require('expect.js'),
	jillian = require('../index.js');

var refs = [
	require('jsonschema/schema/draft-03/schema.json'),
	require('jsonschema/schema/draft-03/hyper-schema.json'),
	require('jsonschema/schema/draft-04/schema.json'),
	require('jsonschema/schema/draft-04/hyper-schema.json')
];

var files = _(glob.sync('test/suite/tests/**/*.json', {
	realpath: true,
	ignore: ['**/zeroTerminatedFloats.json', '**/refRemote.json',
		'**/maxLength.json'
	]
})).map(function(path) {
	return require(path);
});


describe('json schema suites', function() {
	_(files).each(function(suites) {
		_(suites).each(function(suite) {
			describe(suite.description, function() {
				_(suite.tests).each(function(test) {
					it(test.description, function() {
						var res = jillian(
							test.data,
							suite.schema,
							{refs: refs}
						);
						expect(res.valid).to.equal(test.valid);
					});
				});
			});
		});
	});
});
