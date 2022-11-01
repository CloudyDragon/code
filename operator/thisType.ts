interface Aa {
  a: string
  b: number
  foo: (...args: any) => any
}

let opt: Aa & ThisType<{ cc: 'string'}> = {
  a: '1',
  b: 2,
  foo() {
    this.cc = 'string'
  }
}