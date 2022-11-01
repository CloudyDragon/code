use std::io;
fn main() {
  println!("Please input your string.");
  let mut str: String = String::new();
  io::stdin()
    .read_line(&mut str)
    .expect("Failed to read line");
  // let new_str: Vec<&str> = str.split(" ").collect(); // 以空格切割字符串
  // for v in new_str.iter() {
  //   println!("{}", v);
  // }
  for word in str.split_whitespace() {
    // dbg!(word);
    println!("{}", word.parse());
  }
}
