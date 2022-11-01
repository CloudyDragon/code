interface A1 {
  name: string
}

interface A2 {
  age: number
}

interface B1 {
  name: string
  age: number
}

type D1 = B1 extends A1 ? 'yes' : 'no' // yes
type D2 = A1 extends B1 ? 'yes' : 'no' // no

type D3 = (A1 & A2) extends B1 ? 'yes' : 'no' // yes
type D4 = (number & string) extends number ? 'yes' : 'no' // yes
type D23 = (number | string) extends number ? 'yes' : 'no' // no
type D24 = (number | string) extends unknown ? 'yes' : 'no' // yes
type D22 = number extends number | string ? 'yes' : 'no' // yes

// 分配率
type ToArray<T> = T extends any ? T[] : never
type D5 = ToArray<string | number> // string[] | number[]
type D6 = ToArray<string & number> // never

type D7 = ToArray<never> // never

// 去掉分配律的方式
type toArray2<T> = [T] extends [any] ? T[] : never
type D55 = toArray2<string | number> // (string | number)[]