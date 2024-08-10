'use strict';

const reqres = require('..');

describe('req', () => {

  let req;

  before(() => {
    reqres.sinon = require('sinon');
  });

  beforeEach(() => {
    req = reqres.req();
  });

  describe('originalUrl', () => {

    it('is constructed from url and baseUrl properties', () => {
      reqres.req({ url: '/foo' }).originalUrl.should.equal('/foo');
      reqres.req({ url: '/foo', baseUrl: '/base' }).originalUrl.should.equal('/base/foo');
    });

  });

  describe('object properties are reset', () => {

    it('params', () => {
      req.params.foo = 'bar';
      reqres.req({}).params.should.eql({});
    });

    it('body', () => {
      req.body.foo = 'bar';
      reqres.req({}).body.should.eql({});
    });

    it('session', () => {
      req.session.foo = 'bar';
      reqres.req({}).session.should.eql({});
    });

    it('cookies', () => {
      req.cookies.foo = 'bar';
      reqres.req({}).cookies.should.eql({});
    });

    it('query', () => {
      req.query.foo = 'bar';
      reqres.req({}).query.should.eql({});
    });

  });

  describe('app', () => {

    it('has get and set methods', () => {
      req.app.get.should.be.a('function');
      req.app.set.should.be.a('function');
    });

  });

});
