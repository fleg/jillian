'use strict';

var Validator = require('jsonschema').Validator;

var coercionsHash = {
	'integer': function(value) {
		if (Number(value) === parseInt(value, 10)) {
			return parseInt(value, 10);
		} else {
			return value;
		}
	},
	'number': function(value) {
		if (!isNan(Number(value))) {
			return Number(value);
		} else {
			return value;
		}
	},
	'boolean': function(value) {
		if ('true' === value || '1' === value || 1 === value) {
			return true;
		}

		if ('false' === value || '0' === value || 0 === value) {
			return false;
		}

		return value;
	},
	'null': function(value) {
		if (value === 'null') {
			return null;
		} else {
			return value;
		}
	}
};

var preValidateProperty = function(instance, property, schema, options, ctx) {
	if (coercionsHash[schema.type]) {
		instance[property] = coercionsHash[schema.type](instance[property]);
	}
};

module.exports = function(instance, schema) {
	var validator = new Validator();

	var result = validator.validate(instance, schema, {
		preValidateProperty: preValidateProperty,
		throwError: true
	});

	return result;
};
