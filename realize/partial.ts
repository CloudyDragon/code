type MyPartial<T> = {[key in keyof T]?: T[key] | undefined}
type Test3 = {
  name: 1
  age: 2
}
type NewTest2 = MyPartial<Test3> // { name?: 1; age?: 2; }
type NewTest3 = Partial<Test3> // { name?: 1; age?: 2; }