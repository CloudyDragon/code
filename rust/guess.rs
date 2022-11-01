use std::io;
fn main() {
  println!("Please input your guess.");

  let mut guess = String::new();
  io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");
  
  println!("You guessed: {}", guess);

  let mut i = 0;
  let c = guess.char_indices();
  let mut str = String::from("");
  for (i, v) in c {
    dbg!(v);
    str.push_str(v);
  }
   // dbg!(i);
}