type MyPick<T, U extends keyof T> = { [key in U]: T[key] }
interface User4 {
  name: '1'
  age: 233
}

type B5 = MyPick<User4, 'name'> // { name: '1' }
type B6 = Pick<User4, 'name'> // { name: '1' }
