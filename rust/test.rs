


fn largest_char<T: std::cmp::PartialOrd + Clone>(list: &[T]) -> T {
  let mut largest = list[0].clone();
  for item in list.iter() {
    if item > &largest {
      largest = item.clone();
    }
  }

  largest
}

fn main() {
  let number_list = vec![34, 50, 25, 100, 65];
  let result = largest_char(&number_list);
  println!("The largest number is {}", result);

  let char_list = vec!['y', 'm', 'a', 'q'];
  let result = largest_char(&char_list);
  println!("The largest char is {}", result);
}