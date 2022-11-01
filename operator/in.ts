interface User {
  name?: string
  readonly age: number
}

type User1 = {
  +readonly [key in keyof User]+?: User[key]
}
type User2 = {
  -readonly [key in keyof User]-?: User[key]
}

type User3 = {
  [key in keyof User2 as `get${Capitalize<string & key>}`]: () => {}
}






