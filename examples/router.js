'use strict';

require('../test/helpers');

const router = require('express').Router();
router.route('/foo')
  .get((req, res, next) => {
    req.user = req.session.username;
    next();
  })
  .post((req, res, next) => {
    req.session.username = req.body.user;
    next();
  });

const reqres = require('../');

describe('my router', () => {

  let req;
  let res;

  beforeEach(() => {
    req = reqres.req({ url: '/foo', session: { username: 'hmpo' } });
    res = reqres.res();
  });

  it('sets username from session to req.user', (done) => {
    router(req, res, () => {
      req.user.should.equal('hmpo');
      done();
    });
  });

  it('sets POST-ed username to session', (done) => {
    req.method = 'POST';
    req.body = {
      user: 'user'
    };
    router(req, res, () => {
      req.session.username.should.equal('user');
      done();
    });
  });

});
