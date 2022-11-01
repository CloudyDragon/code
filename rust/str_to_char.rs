use std::io;
fn main() {
    println!("Please input your string.");
    let mut str = String::new();
    io::stdin()
    .read_line(&mut str)
    .expect("Failed to read line");
    for (_i, v) in str.char_indices() {// 使用char_indices进行分割解析出单个字符
      dbg!(v);
    }
}