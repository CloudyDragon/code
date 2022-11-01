type MyReadonly<T> = { readonly [key in keyof T]: T[key] }

let o1 = {
  a: 1,
  b: 2
}

let obj1: MyReadonly<typeof o1> = o1

obj1.a = 233 //错误 ： Cannot assign to 'a' because it is a read-only property.

let o2 = [1, 2, 3]
let obj2: MyReadonly<typeof o2> = o2
obj2.push // 错误 ：Property 'push' does not exist on type 'readonly number[]'.