'use strict';
var _ = require('lodash'),
  validator = require('is-my-json-valid'),
  validatorOptions = {
    formats: {
      'username': /^[0-9a-zA-Z_]+$/
    }
  };
  var properties = {
    id: {required: true, type: 'number'},
    stringId: {required: true, type: 'string'},
    firstName: {required: true, type: 'string', minLength: 1, maxLength: 50},
    nullableFirstName: {required: true, type: ['string','null'], minLength: 1, maxLength: 50},
    lastName: {required: true, type: 'string', minLength: 1, maxLength: 50},
    nullableLastName: {required: true, type: ['string','null'], minLength: 1, maxLength: 50},
    email: {required: true, type: 'string', minLength: 5, maxLength: 50, format: 'email'},
    locale: {required: true, type: 'string', minLength: 1, maxLength: 10},
    stringToken: {required: true, type: 'string', minLength: 1, maxLength: 256},
    username: {required: true, type: 'string', minLength: 1, maxLength: 20, format: 'username'},
    password: {required: true, type: 'string', minLength: 1, maxLength: 256},
    mediaName: {required: true, type: 'string', minLength: 1, maxLength: 50},
    nullableMediaName: {required: true, type: ['string','null'], minLength: 1, maxLength: 50},
    color: {required: true, type: 'number', minimum: 0},
    nullableColor: {required: true, type: ['number','null'], minimum: 0},
    telephoneNumber: {required: true, type: 'string', minLength: 1, maxLength: 50},
    nullableTelephoneNumber: {required: true, type: ['string','null'], minLength: 1, maxLength: 50},
    lng: {required: true, type: 'number', minimum: -180, maximum: 180},
    lat: {required: true, type: 'number', minimum: -90, maximum: 90},
    alt: {required: true, type: 'number', minimum: -6378000},
    title: {required: true, type: 'string', minLength: 1, maxLength:150},
    nullableTitle: {required: true, type: ['string', 'null'], minLength: 1, maxLength:150},
    comment: {required: true, type: 'string', minLength: 1, maxLength:5000},
    entryType: {required: true,  'enum': ['video', 'picture', 'drop']},
    provider: {required: true, 'enum': ['totem', 'facebook']}
  };
  var optionals = {};
  _.forEach(properties, function(key, value){
    var ret = _.assign(key);
    ret.required = false;
    optionals[value + 'O'] = key;
  });
  properties = _.merge(properties, optionals);

exports.properties = properties;

exports.validateInternalFacebookResponse = validator({
    required: true,
    type: 'object',
    properties: {
      'id': properties.stringId,
      'first_name': properties.firstName,
      'last_name': properties.lastName,
      'locale': properties.locale,
      'email': properties.emailO
    },
    additionalProperties: true,
    greedy: true,
    verbose: true
  });

exports.validateFacebookAuthRequest = validator({
    required: true,
    type: 'object',
    properties: {
      'username': properties.username,
      'token': properties.stringToken,
      'email': properties.emailO,
      'telephoneNumber': properties.nullableTelephoneNumberO,
      'mediaName': properties.nullableMediaNameO,
      'color': properties.colorO
    },
    additionalProperties: false,
    greedy: true,
    verbose: true
  },validatorOptions);

exports.validateFacebookAuthSessionRequest = validator({
    required: true,
    type: 'object',
    properties: {
      'token': properties.stringToken
    },
    additionalProperties: false,
    greedy: true,
    verbose: true
  });

exports.validateTotemAuthSessionRequest = validator({
    required: true,
    type: 'object',
    properties: {
      username: properties.username,
      password: properties.password
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  },validatorOptions);

exports.validateTotemAuthRequest = validator({
    required: true,
    type: 'object',
    properties: {
      username: properties.username,
      password: properties.password,
      email: properties.email,
      firstName: properties.nullableFirstNameO,
      lastName: properties.nullableLastNameO,
      telephoneNumber: properties.nullableTelephoneNumberO,
      mediaName: properties.nullableMediaNameO,
      color: properties.colorO
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  },validatorOptions);

exports.validateCommentRequest = validator({
    required: true,
    type: 'object',
    properties: {
      userId: properties.id,
      entryId: properties.id,
      comment: properties.comment
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });

exports.validateCreateEntryRequest = validator({
    required: true,
    type: 'object',
    properties: {
      totemId: {required: true, type: 'number'},
      lng: properties.lng,
      lat: properties.lat,
      alt: properties.alt,
      title: properties.nullableTitle,
      type: properties.entryType,
      mediaName: properties.mediaName
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });



exports.validateCreateHubRequest = validator({
    required: true,
    type: 'object',
    properties: {
      lng: properties.lng,
      lat: properties.lat,
      alt: properties.alt,
      color: properties.color,
      title: properties.title,
      comment: properties.comment,
      mediaName: properties.mediaName
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });


exports.validateCreateTotemRequest = validator({
    required: true,
    type: 'object',
    properties: {
      lng: properties.lng,
      lat: properties.lat,
      alt: properties.alt,
      color: properties.color,
      title: properties.nullableTitle,
      mediaName: properties.mediaName
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });


exports.validateFacebookCredentialUpdate = validator({
    required: true,
    type: 'object',
    properties: {
      provider: properties.provider,
      token: properties.stringToken
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });

exports.validateTotemCredentialUpdate = validator({
    required: true,
    type: 'object',
    properties: {
      provider: properties.provider,
      password: properties.password
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  });

exports.validateUserUpdate = validator({
    required: true,
    type: 'object',
    properties: {
      username: properties.usernameO,
      firstName: properties.nullableFirstNameO,
      lastName: properties.nullableLastNameO,
      email: properties.emailO,
      telephoneNumber: properties.nullableTelephoneNumberO,
      color: properties.colorO,
      mediaName: properties.nullableMediaNameO,
      providerObject: { required: false, type: 'object', properties: {
        provider: properties.provider,
        password: properties.passwordO,
        token: properties.stringTokenO
      },
        greedy:true,
        verbose:true,
        additionalProperties: false
      }
    },
    additionalProperties: false,
    greedy:true,
    verbose:true
  },validatorOptions);
