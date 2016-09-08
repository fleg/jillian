'use strict';

var Validator = require('jsonschema').Validator;

var coercionsHash = {
	integer: function(value) {
		if (Number(value) === parseInt(value, 10)) {
			return parseInt(value, 10);
		} else {
			return value;
		}
	},
	number: function(value) {
		if (isFinite(value)) {
			return Number(value);
		} else {
			return value;
		}
	},
	'boolean': function(value) {
		if (value === 'true' || value === '1' || value === 1) {
			return true;
		}

		if (value === 'false' || value === '0' || value === 0) {
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

module.exports = function(instance, schema, options) {
	var validator = new Validator();

	options = options || {};
	options.coercions = Boolean(options.coercions);
	options.throwError = Boolean(options.throwError);
	options.objectMode = Boolean(options.objectMode);
	options.refs = options.refs || [];

	options.refs.forEach(function(ref) {
		validator.addSchema(ref);
	});

	var result = validator.validate(instance, schema, {
		preValidateProperty: function(instance, property, schema) {
			if (options.coercions && coercionsHash[schema.type]) {
				instance[property] = coercionsHash[schema.type](instance[property]);
			}
		},
		postValidateProperty: function(instance, property, schema) {
			if (typeof schema.validate === 'function') {
				var ok = schema.validate(instance[property], instance, property);
				if (!ok) {
					return 'property `' + property +
						'` hasn\'t pass check:\n' + schema.validate.toString() + '\n' +
						'actual value is `' + instance[property] + '`';
				}
			}

			if (typeof schema.filter === 'function') {
				instance[property] = schema.filter(instance[property]);
			}
		},
		throwError: options.throwError
	});

	return result;
};
