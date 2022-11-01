var PromisePolyfill = require('promise-polyfill');

PromisePolyfill.deferred = function() {
    let obj = {}
    obj.promise = new PromisePolyfill((resolve, reject) => {
        obj.resolve = resolve
        obj.reject = reject
    })
    return obj
}

PromisePolyfill.resolve().then(() => {
    console.log(0);
    return PromisePolyfill.resolve(4);
}).then((res) => {
    console.log(res)
})

PromisePolyfill.resolve().then(() => {
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


module.exports = PromisePolyfill