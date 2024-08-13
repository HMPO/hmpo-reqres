'use strict';

const reqres = require('..');
const EventEmitter = require('events').EventEmitter;

describe('res', () => {

  let res;

  before(() => {
    reqres.sinon = require('sinon');
  });

  beforeEach(() => {
    res = reqres.res();
  });

  it('implements EventEmitter', () => {
    res.should.be.an.instanceOf(EventEmitter);
  });

  describe('emits "end" event when methods that send responses are called', () => {
    const methods = [
      'json',
      'jsonp',
      'redirect',
      'render',
      'send',
      'sendFile',
      'sendStatus'
    ];

    methods.forEach((method) => {
      it(method, (done) => {
        res[method]();
        res.on('end', done);
      });
    });

  });

  describe('app', () => {

    it('has get and set methods', () => {
      res.app.get.should.be.a('function');
      res.app.set.should.be.a('function');
    });

  });

});
