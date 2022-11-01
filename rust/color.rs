fn main() {
  let mut i = 0;
  while i < 256 {
      if (i >= 30 && i <= 37)
      || (i >= 31 && i <= 47)
      || (i >= 90 && i <= 97)
      || (i >= 100 && i <= 107) {
      let mut str = String::from("\x1b[0;");
      str.push_str(&i.to_string());
      str.push_str("m ");
      str.push_str(&i.to_string());
      str.push_str( " = □ \x1b[0m  ");
      print!("{}", str);
      if i % 10 == 0 {
        print!("\n");
      }
    }
    i += 1;
  }
}