'use strict';

const reqres = require('..');

describe('sinon', () => {

  it('uses the configured stub library to stub methods', () => {
    class Stub {
      returns() {}
    }
    function Spy() {}
    reqres.sinon = {
      stub: () => new Stub(),
      spy: () => Spy
    };

    const res = reqres.res();

    res.append.should.be.an.instanceOf(Stub);
    res.send.should.equal(Spy);
  });

});
