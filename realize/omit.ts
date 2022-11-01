// type MyOmit<T, K extends keyof T> = { [U in Exclude<keyof T, K>]:T[U] }
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> // 排除K需要分配律，所以需要写Exclude单独的函数

interface User5 {
  name: 'sdsd'
  age: 233
}

type R11 = MyOmit<User5, 'name'> // { age: 233 }
type R12 = Omit<User5, 'name'> // { age: 233 }