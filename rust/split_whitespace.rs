use std::io;

fn main() {
  let mut input = String::new();
  io::stdin()
    .read_line(&mut input).unwrap();
  let s = input.split_whitespace();
  for v in s {
    let a: i32 = v.parse::<i32>().unwrap(); // 输入字符串数字，转数字
    dbg!(a);
  }
}
