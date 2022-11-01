// A promise must be in one of three states: pending, fulfilled, or rejected.
// 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
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

// 2.1.1 处于pending状态，一个promise满足：
//      2.1.1.1 可以迁移至执行态或拒绝态
  
  if (this.status === PENDING) {
    this.res = v
    // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
    // execution context： https://es5.github.io/#x10.3

    // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）
    // 执行上下文 ：https://es5.github.io/#x10.3
    setTimeout(() => {
      this.status = FULFILLED
      this.onFulfilledCallbacks.forEach(fn => fn())
    }, 0)
    
  }
  
}
PromiseA.prototype.reject = function(reason) {

// 2.1.1 When pending, a promise:
//      2.1.1.1 may transition to either the fulfilled or rejected state.

// 2.1.1 处于pending状态，一个promise满足：
//      2.1.1.1 可以迁移至执行态或拒绝态
  if (this.status === PENDING) {
    this.res = reason

    // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
    // execution context： https://es5.github.io/#x10.3

    // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）
    // 执行上下文 ：https://es5.github.io/#x10.3
    setTimeout(() => {
      this.status = REJECTED
      this.onRejectedCallbacks.forEach(fn => fn())
    }, 0)
    
  }
}

// A promise must provide a then method to access its current or eventual value or reason.
// A promise’s then method accepts two arguments:
// promise.then(onFulfilled, onRejected)

// 一个 promise 必须提供一个 then 方法以访问其当前值、终值和拒因(也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值）
// promise 的 then 方法接受两个参数：
// promise.then(onFulfilled, onRejected)
PromiseA.prototype.then = function(onFulfilled, onRejected) {
  var that = this

  // 2.2.2.1 If onFulfilled is not a function, it must be ignored.

  // 2.2.2.1 如果 onFulfilled 不是函数，其必须被忽略
  var onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value };

  // 2.2.2.2 If onRejected is not a function, it must be ignored.

  // 2.2.2.2 如果 onRejected 不是函数，其必须被忽略
  var onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason;}


  // 2.2.7 then must return a promise [3.3].

  // 2.2.7 then方法必须返回一个promise对象[注3.3]
  var promise2 = new PromiseA((resolve, reject) => {

    function foo1() {
      try {
        // 2.2.2 If onFulfilled is a function:
        //      2.2.2.1 it must be called after promise is fulfilled, with promise’s value as its first argument.

        // 2.2.2 如果 onFulfilled 是函数
        //      2.2.2.1 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
        var x = onFulfilled(that.res)

        // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).

        // 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
        resolvePromise(promise2, x, resolve, reject)

      } catch (e) {
        // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.

        // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
        reject(e)
      }
    }
    function foo2() {
      try {
        // 2.2.3 If onRejected is a function:
        //      2.2.3.1 it must be called after promise is rejected, with promise’s reason as its first argument.

        // 2.2.3 如果 onRejected 是函数：
        //      2.2.3.1 当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的拒因
        var x = onRejected(that.res)
        
        // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).

        // 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {

        // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
        reject(e)
      }
    }

    // 2.2.2 If onFulfilled is a function:
    //      2.2.2.2 it must not be called before promise is fulfilled.
    if (that.status === FULFILLED) { 
      // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
      // execution context: https://es5.github.io/#x10.3

      // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）
      // 执行上下文 ：https://es5.github.io/#x10.3
      setTimeout(foo1, 0)

      // 2.2.3 If onRejected is a function:
      //      2.2.3.2 it must not be called before promise is rejected

      // 2.2.3 如果 onRejected 是函数
      //      2.2.3.2 在 promise 被拒绝执行前其不可被调用
    } else if (that.status === REJECTED) {
      // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].
      // execution context: https://es5.github.io/#x10.3

      // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）
      // 执行上下文 ：https://es5.github.io/#x10.3
      setTimeout(foo2, 0)
      
    } else if (that.status === PENDING) {
      // 2.2.6 then may be called multiple times on the same promise.
      // 2.2.6 then 方法可以被同一个 promise 调用多次

      //      2.2.6.1 If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
      //      2.2.6.1 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
      that.onFulfilledCallbacks.push(foo1)

      //      2.2.6.2 If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
      //      2.2.6.2 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
      that.onRejectedCallbacks.push(foo2)
    }
   })
  
  return promise2
}


function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为拒因拒绝执行 promise
  if (x === promise2) {
    reject(new TypeError('Chaining cycle detected for promise'));

  // 2.3.2 If x is a promise, adopt its state[3.4].

  // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态 [注3.4]
  } else if (x instanceof PromiseA) {
    
    // 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected
    // 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject);

    // 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value

    // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
    } else if (x.status === FULFILLED) {
      resolve(x.res)

    // 2.3.2.3 If/when x is rejected, reject promise with the same reason.
    // 如果 x 处于拒绝态，用相同的拒因拒绝 promise
    } else if (x.status === REJECTED) {
      reject(x.res)
    }

  // 2.3.3 Otherwise, if x is an object or function;

  // 2.3.3 否则，如果 x 为对象或者函数：
 } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {

    // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.

    // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为拒因拒绝 promise
    try {
      var then = x.then
      if(typeof then === 'function') {
        var isCalled = false;
        
        // 2.3.3.3.4 If calling then throws an exception e.

        // 2.3.3.3.4 如果调用 then 方法抛出了异常 e：
        try {
          // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
          
          // 2.3.3.3  如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
          then.call(x, function(y) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored

            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            if (isCalled) return
            isCalled = true
  
            resolvePromise(promise2, y, resolve, reject)
          }, function(r) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored

            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            if (isCalled) return
            isCalled = true
  
            reject(r)
          })
        } catch(e) {
          // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored

          // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
          if (isCalled) return
          isCalled = true
          reject(e)
        }
      
      // 2.3.3.4 If then is not a function, fulfill promise with x

      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      } else {
        resolve(x)
      }
    } catch(e) {
      reject(e)
    }

  // 2.3.4 If x is not an object or function, fulfill promise with x

  // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
  } else {
    resolve(x)
  }
}

// 测试要加的代码
PromiseA.deferred = function() {
  let obj = {}
  obj.promise = new PromiseA((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })
  return obj
}

module.exports = PromiseA