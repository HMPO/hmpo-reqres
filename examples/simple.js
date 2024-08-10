'use strict';

require('../test/helpers');

const middleware = (req) => {
  req.session.path = req.path;
};

const reqres = require('../');

describe('my middleware', () => {

  let req;

  beforeEach(() => {
    req = reqres.req();
  });

  it('request has properties', () => {
    middleware(req);
  });

});
