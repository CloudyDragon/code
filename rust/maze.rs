const MAX: usize = 15;
fn main() {
  
  let mut map: [[i32;MAX];MAX] = [[0;MAX];MAX];

  let mut i = 0;
  while i < MAX {
    map[i][0] = 1;
    map[i][MAX - 1] = 1;

    map[0][i] = 1;
    map[MAX - 1][i] = 1;
    i += 1;
  }
  set_way(&mut map, 1, 1);
  my_print(map);

}

fn set_way(map: &mut [[i32;MAX];MAX], i: usize, j: usize) -> bool {
  if map[i][j] == 2 {
    return true;
  } else {
    if map[i][j] == 0 { // 表示未走过
      map[i][j] = 2;
      if set_way(map, i + 1, j) { // 向下走
        return true;
      } else if set_way(map, i, j + 1) { // 向右走
        return true;
      } else if set_way(map, i - 1, j) { // 向上走
        return true;
      } else if set_way(map, i, j - 1) { // 向左走
        return true;
      } else {
        map[i][j] = 3
        ;
        return false;
      }
    } else {
      return false;
    }
  }
}

fn my_print(map: [[i32;MAX];MAX]) {
  for v1 in map.iter() {
    let mut str: String = String::new();
    for v2 in v1.iter() {
      if v2 == &1 {
        str.push_str("□ ");
      } else if v2 == &2 {
        str.push_str("\x1b[0;91m□ \x1b[0m");
      } else {
        str.push_str("  ");
      }
    }
    println!("{}", str);
  }
}
