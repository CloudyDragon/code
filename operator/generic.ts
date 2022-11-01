// 泛型
// function foo1<T, U>(a: T, b: U): T & U{
//   return {
//     ...a,
//     ...b
//   }
// }

// foo1<string, number>("4", 2);
// foo1<string, number>("4", 2);

// type ArrayList<T> = T[]

// let ccc: ArrayList<String> = []



let map: Map<number, string> = new Map<number, string>();
map.set(1, 2) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// function ArrayList<T>(): T[]{
//   return []
// }

class ArrayList<T> extends Array<T> {
  // constructor() { // es6可以省略
  //   super()
  // }
}


let list = new ArrayList<number>();
list.push('23') // Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(list)
