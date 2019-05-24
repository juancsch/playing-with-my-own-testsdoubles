// Introduction to test doubles:
//
describe('a very simple test stub', function () {

    function someStuff () {
        return 5 * 2 + 1 * 89
    }
    function add (a) {
       return a + someStuff()
    }

    it('adds the given number to some stuff', function () {
         someStuff = function () {
             return 1
         }
         expect(add(5)).toEqual(6)
    })

    /*
      // variant:
      var someStuff, add;
      beforeEach(function(){
      someStuff = function(){
          return 5 * 2 + 1 * 89;
      }
      add = function(a){
          return a + someStuff();
      }
    });
    */

})

// TODO: stub out methods from objects

describe('a very simple test spy', function () {
    function someStuff () {
        console.log('so exciting!!!')
    }
    function doSomething () {
        someStuff()
    }

    it('does something with some stuff', function () {
         var invoked = false
         someStuff = function () {
             invoked = true
         }
         doSomething()

         expect(invoked).toBeTruthy()
    })
})

describe('a very simple test spy now using objects', function () {
    var collaborator = function () {
        return {
          someStuff: function () {
              console.log('yeah some stuff!')
          }
        }
    }
    var systemUnderTest = function (dependency) {
        return {
          doSomething: function () {
              dependency.someStuff()
              console.log('system under test is working')
          }
        }
    }

    it('does something with some stuff', function () {
        var dependency = collaborator()
        var called = false
        dependency.someStuff = function () {
            called = true
        }
        var sut = systemUnderTest(dependency)

        sut.doSomething()

        expect(called).toBeTruthy()
    })

    it('does something with some stuff - using Jasmine spies', function () {
        var dependency = collaborator()
        spyOn(dependency, 'someStuff')
        var sut = systemUnderTest(dependency)

        sut.doSomething()

        expect(dependency.someStuff).toHaveBeenCalled()
    })

    it('does something with some stuff - using a custom made spy creator', function () {

		function spy (obj, methodName) {
            var theSpy = {
               called: false,
               hasBeenCalled: function () {
                  return this.called
               }
            }
            theSpy[methodName] = function () {
               this.called = true
            }
            return theSpy
		}

        var dependency = collaborator()
        var theSpy = spy(dependency, 'someStuff')
        var sut = systemUnderTest(theSpy)

        sut.doSomething()

        expect(theSpy.hasBeenCalled()).toBeTruthy()
    })

    it('does something with some stuff replacing the whole object', function () {
        var called = false
        var dependency = {
             someStuff: function () {
                 called = true
             }
        }
        var sut = systemUnderTest(dependency)

        sut.doSomething()

        expect(called).toBeTruthy()
    })

    it('does something with some stuff replacing the whole object with constructor', function () {

		function collab () {
            this.someStuff = function () {
                console.log('lalala')
            }
        }
        var dependency = new collab()

		var called = false
        dependency.someStuff = function () {
            called = true
		}

        var sut = systemUnderTest(dependency)

        sut.doSomething()

        expect(called).toBeTruthy()
    })
})

describe('how to deal with asyncrhonous stuff ', function () {
    function doSomethingAsync (callbackWhenYouFinish) {
       setTimeout(function () {
           var theResultOfSomeComplexCalculation = 777
           callbackWhenYouFinish(theResultOfSomeComplexCalculation)
           console.log('done!')
       }, 5000) // do it whenever you can, after 5 seconds
    }
    function funcUnderTest (callback) {
         doSomethingAsync(callback)
    }
    it('can convert asynchronous tasks into synchronous with stubs', function () {
        doSomethingAsync = function (callback) {
            callback(777)
        }

        var calculatedUsingTheAsyncFunction = false
        var result = null

        funcUnderTest(function (r) {
            calculatedUsingTheAsyncFunction = true
            result = r
        })

        expect(calculatedUsingTheAsyncFunction).toBeTruthy()
        expect(result).toEqual(777)
    })
})

describe('a very simple mock object', function () {
    var collaborator = function () {
        return {
          someStuff: function () {
              console.log('yeah some stuff!')
          }
        }
    }
    var systemUnderTest = function (dependency) {
        return {
          doSomething: function () {
              dependency.someStuff()
              console.log('system under test is working')
          }
        }
    }

    it('does something with some stuff', function () {
        // set the expectation before
        // invoke the sut
        // verify that expectations are satisfied
    })
})

// ------------------------------     An example:
// Production code:
//

// User object:
function User (username, email) {
    this.username = username
    this.email = email
}
User.prototype.mailTo = function () {
    return this.username + ' - ' + this.email + ' - '
}

// Widget
function createFormWidget (usernameField, emailField, btn) {
   var self = {}

   btn.click(function () {
       var username = usernameField.val()
       var email = emailField.val()
       self.trigger({ username: username, email: email })
   })

   var handlers = []

   self.addSubscriber = function (callback) {
       handlers.push(callback)
   }
   self.trigger = function (user) {
       handlers.forEach(function (callback) {
           callback(user)
       })
   }

   self.destroy = function () {
       btn.unbind()
   }

   return self
}

// Widget
function createUsersViewerWidget (panel) {
   var self = {}
   self.renderUsers = function (users) {
       users.forEach(function (user) {
           self.addUser(user)
       })
   }
   self.addUser = function (user) {
       var content = user.mailTo()
       panel.append(content)
       panel.append('<br/>')
   }
   return self
}

// Controller
function createController (formWidget, viewerWidget, client) {
   var self = {}

  self.destroy = function () {
        formWidget.destroy()
   }

   self.loadUsers = function () {
       // has to ask the client for users
       // then it has to

   }
   return self
}

// AJAX client
function createClient () {
   var self = {}

   self.saveUser = function (user) {
       $.post('/saveNewUser', user)
   }
   self.retrieveUsers = function (callback) {
       $.get('/getUsers', callback)
   }
   return self
}

// Factory

function buildFormWidget () {
   return createFormWidget($('[name="username"]'),
                           $('[name="email"]'),
                           $('button'))
}

function buildViewerWidget (element) {
   return createUsersViewerWidget(element || $('#users'))
}

function createApp (viewerWidgetElement) {
   var formWidget = buildFormWidget()
   var viewerWidget = buildViewerWidget(viewerWidgetElement)
   var client = createClient()
   var controller = createController(formWidget, viewerWidget, client)
   return controller
}
