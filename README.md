# Playing with my test doubles

Implement my own test doubles in javascript, without any external library.

## Test doubles
[TL;DR](https://martinfowler.com/bliki/TestDouble.html)

Gerard Meszaros is working on a book to capture patterns for using the various Xunit frameworks. One of the awkward things he's run into is the various names for stubs, mocks, fakes, dummies, and other things that people use to stub out parts of a system for testing. To deal with this he's come up with his own vocabulary which I think is worth spreading further.

The generic term he uses is a Test Double (think stunt double). Test Double is a generic term for any case where you replace a production object for testing purposes. There are various kinds of double that Gerard lists:

- **dummy** [to code](test/sut-dummy.spec.js)

  objects are passed around but never actually used. Usually they are just used to fill parameter lists.

- **stub** [to code](test/sut-stub.spec.js)

  provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.

- **spy** [to code](test/sut-spy.spec.js)

  are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.

- **mock** [to code](test/sut-mock.spec.js)

  are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.

- **fake**
  objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an InMemoryTestDatabase is a good example).

[Mocks arent stubs by Martin Fowler](https://martinfowler.com/articles/mocksArentStubs.html)
