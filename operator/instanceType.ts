class TestClass1 {
  x: number;
  y: number;
  constructor() {
    this.x = 0
    this.y = 0
  }
}
 
type T22 = InstanceType<typeof TestClass1>;
type T23 = typeof TestClass1
let s: T22 = new TestClass1()

