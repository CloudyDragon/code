// A promise must be in one of three states: pending, fulfilled, or rejected.
const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'
function PromiseA(func) {
  this.status = PENDING
  this.res = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []
  try {
    func(this.resolve.bind(this), this.reject.bind(this))
  } catch(e) {
    this.reject(e)
  }
}


PromiseA.prototype.resolve = function(v) {

// 2.1.1 When pending, a promise:
//      2.1.1.1 may transition to either the fulfilled or rejected state.
  
  if (this.status === PENDING) {

    // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
    // [execution context](https://es5.github.io/#x10.3)
    setImmediate(() => {
      this.status = FULFILLED
      this.res = v
      this.onFulfilledCallbacks.forEach(fn => fn())
    }, 0)
  }
  
}
PromiseA.prototype.reject = function(reason) {

// 2.1.1 When pending, a promise:
//      2.1.1.1 may transition to either the fulfilled or rejected state.
  if (this.status === PENDING) {

    // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
    // [execution context](https://es5.github.io/#x10.3)
    setImmediate(() => {
      this.status = REJECTED
      this.res = reason
      this.onRejectedCallbacks.forEach(fn => fn())
    }, 0)
    
  }
}

// A promise must provide a then method to access its current or eventual value or reason.
// A promise’s then method accepts two arguments:
// promise.then(onFulfilled, onRejected)
PromiseA.prototype.then = function(onFulfilled, onRejected) {
  var that = this
  var onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value };

  var onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason;}

  // 2.2.7 then must return a promise [3.3].
  var promise2 = new PromiseA((resolve, reject) => {

    // 2.2.2 If onFulfilled is a function:
    //      2.2.2.2 it must not be called before promise is fulfilled.
    if (that.status === FULFILLED) { 

      
          // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
          // [execution context](https://es5.github.io/#x10.3)
          setImmediate(function(){
            // 2.2.2.1 If onFulfilled is not a function, it must be ignored.
            if (typeof onFulfilled === 'function') {
              try {

                // 2.2.2 If onFulfilled is a function:
                //      2.2.2.1 it must be called after promise is fulfilled, with promise’s value as its first argument.
                var x = onFulfilled(that.res)

                // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
                resolvePromise(promise2, x, resolve, reject)

              } catch (e) {
                // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
                reject(e)
              }
            } else {
              reject(onFulfilled)
            }
          }, 0)

      // 2.2.3 If onRejected is a function:
      //      2.2.3.2 it must not be called before promise is rejected
    } else if (that.status === REJECTED) {

      // 2.2.2.2 If onRejected is not a function, it must be ignored.
      if (typeof onRejected === 'function') {

          // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
          // [execution context](https://es5.github.io/#x10.3)
          setImmediate(function() {
            try {

              // 2.2.3 If onRejected is a function:
              //      2.2.3.1 it must be called after promise is rejected, with promise’s reason as its first argument.
              var x = onRejected(that.res)
              
              // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {

              // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
              reject(e)
            }
          }, 0)
      }
      
    } else if (that.status === PENDING) {
      // 2.2.6 then may be called multiple times on the same promise.
      //      2.2.6.1 If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
      that.onFulfilledCallbacks.push(function () {
         // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
          // [execution context](https://es5.github.io/#x10.3)
            try {

              // 2.2.2 If onFulfilled is a function:
              //      2.2.2.1 it must be called after promise is fulfilled, with promise’s value as its first argument.
              var x = onFulfilled(that.res)

              // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
              resolvePromise(promise2, x, resolve, reject)

            } catch (e) {
              // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
              reject(e)
            }
      })

      // 2.2.6.2 If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
      that.onRejectedCallbacks.push(function() {
          // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
          // [execution context](https://es5.github.io/#x10.3)
            try {
              // 2.2.3 If onRejected is a function:
              //      2.2.3.1 it must be called after promise is rejected, with promise’s reason as its first argument.
              var x = onRejected(that.res)
              
              // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {

              // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
              reject(e)
            }
        })
    }
   })
  
  return promise2
}


function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (x === promise2) {
    reject(new TypeError('Chaining cycle detected for promise'));
  // 2.3.2 If x is a promise, adopt its state[3.4].
  } else if (x instanceof PromiseA) {
    
    // 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject);
    // 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value
    } else if (x.status === FULFILLED) {
      resolve(x.res)

    // 2.3.2.3 If/when x is rejected, reject promise with the same reason.
    } else if (x.status === REJECTED) {
      reject(x.res)
    }

  // 2.3.3 Otherwise, if x is an object or function;
 } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {

    // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
    try {
      var then = x.then
      if(typeof then === 'function') {
        var isCalled = false;
        
        // 2.3.3.3.4 If calling then throws an exception e.
        try {
          // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
          then.call(x, function(y) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored
            if (isCalled) return
            isCalled = true
  
            resolvePromise(promise2, y, resolve, reject)
          }, function(r) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored
            if (isCalled) return
            isCalled = true
  
            reject(r)
          })
        } catch(e) {
          // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored
          if (isCalled) return
          isCalled = true
          reject(e)
        }
      
      // 2.3.3.4 If then is not a function, fulfill promise with x
      } else {
        resolve(x)
      }
    } catch(e) {
      reject(e)
    }
  // 2.3.4 If x is not an object or function, fulfill promise with x
  } else {
    resolve(x)
  }
}

PromiseA.resolve = function(v) {
  return new PromiseA((resolve, reject) => {
    resolve(v)
  })
}

PromiseA.resolve().then(() => {
  console.log(0);
  return PromiseA.resolve(4);
}).then((res) => {
  console.log(res)
})

PromiseA.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
PromiseA.deferred = function() {
  let obj = {}
  obj.promise = new PromiseA((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })
  return obj
}

module.exports = PromiseA

