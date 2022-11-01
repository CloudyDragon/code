
fn main() {
  let str = String::from("我在这里！ qaq");
  let w1 = &str[9..12];
  let w2 = &str[12..15];
  // // let s = String::from("hello world");

  // // let w1 = &s[0..5];
  // // let w2 = &s[6..11];
  println!("w1 = {} w2 = {}  len = {}", w1, w2, first_word(&str));
}
fn first_word(s: &String) -> &str {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
      if item == b' ' {
          return &s[0..i];
      }
  }

  &s[..]
}