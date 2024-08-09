# hmpo-reqres

Stub request and response objects for testing express applications and middleware

Creates default request and response object with configurable values, and methods stubbed with [sinon.stub](https://sinonjs.org/releases/latest/stubs/).

## Usage

[Using default request properties](./examples/simple.js):

```javascript
const middleware = (req, res, next) => {
  req.session.path = req.path;
};
const reqres = require("reqres");

describe("my middleware", () => {
  let req;
  let res;

  beforeEach(() => {
    (req = reqres.req()), (res = reqres.res());
  });

  it("request has properties", () => {
    middleware(req, res, (err) => {
      req.session.path.should.equal("/");
      done(err);
    });
  });
});
```

[Testing a router](./examples/router.js):

```javascript
const router = require("express").Router();
router
  .route("/foo")
  .get((req, res, next) => {
    req.user = req.session.username;
    next();
  })
  .post((req, res, next) => {
    req.session.username = req.body.user;
    next();
  });
const reqres = require("reqres");

describe("my router", () => {
  let req;
  let res;

  beforeEach(() => {
    req = reqres.req({ url: "/foo", session: { username: "hmpo" } });
    res = reqres.res();
  });

  it("sets username from session to req.user", (done) => {
    router(req, res, () => {
      req.user.should.equal("hmpo");
      done();
    });
  });

  it("sets POST-ed username to session", (done) => {
    req.method = "POST";
    req.body = { user: "user" };
    router(req, res, () => {
      req.session.username.should.equal("user");
      done();
    });
  });
});
```

[Testing response methods](./examples/response.js):

All methods which would normally send a response (and so end the middleware chain) e.g. `json`, `send` will emit an "end" event, so this can be bound onto for running assertions.

```javascript
const router = require("express").Router();
router.route("/foo").get((req, res) => {
  res.json({ user: req.session.username });
});
const reqres = require("reqres");

describe("my router", () => {
  let req;
  let res;

  beforeEach(() => {
    req = reqres.req({ url: "/foo", session: { username: "hmpo" } });
    res = reqres.res();
  });

  it("responds with json showing user from session", (done) => {
    router.handle(req, res);
    res.on("end", () => {
      res.json.should.have.been.calledWithExactly({ user: "hmpo" });
      done();
    });
  });
});
```

## Customisation

If you want to use a different version of sinon to that which is included in reqres - or indeed a completely different stub/spy library - then you can set the sinon property to your own local version.

```javascript
const reqres = require("reqres");
reqres.sinon = require("sinon");
```
