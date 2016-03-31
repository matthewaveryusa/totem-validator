'use strict';
var should = require('should'),
  validator = require('../src/validator.js');

describe('validators', function () {

  describe('validateCommentRequest',function () {
    it('should succeed', function () {
      let request = { userId: 1, entryId: 2, comment: "hello"};
      validator.validateCommentRequest(request).should.be.exactly(true);
    });
    
    it('should fail', function () {
      let request = { userId: "test", entryId: 2, comment: "hello"};
      validator.validateCommentRequest(request).should.be.exactly(false);
    });
  });
  
});