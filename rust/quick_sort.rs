fn main() {
    // let mut arr: [i32; 10] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let mut arr: Vec<i32> = vec![10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    print!("{:?}", arr);
    quick_sort(&mut arr);
}
fn quick_sort(_arr: &mut Vec<i32>) {
    
    println!("{:?}", _arr.to_array());
}
