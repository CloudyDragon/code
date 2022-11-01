
impl Solution {
  pub fn hannota(a: &mut Vec<i32>, b: &mut Vec<i32>, c: &mut Vec<i32>) {
      foo(a.len(), a, b, c);
  }
}
struct Solution {
}
fn main() {
  let mut a: Vec<i32> = vec![2, 1, 0];
  let mut b: Vec<i32> = Vec::new();
  let mut c: Vec<i32> = Vec::new();
  Solution::hannota(&mut a, &mut b, &mut c);
  for i in &c {
      println!("{}", i);
  }
}
fn foo(size: usize, a: &mut Vec<i32>, b: &mut Vec<i32>, c: &mut Vec<i32>) {
  if size == 0 {
      return;
  } else if a.len() == 1 {
      c.push(a.remove(a.len() - 1));
      return;
  }
  foo(size - 1, a, c, b);
  if a.len() >= 1 {
      c.push(a.remove(a.len() - 1));    
  }
  
  foo(size - 1, b, a, c);
}
