struct ListNode {
  next: Box<Option<ListNode>>,
  val: i32
}
struct MyLinkedList {
  size: usize,
  head: Box<Option<ListNode>>
}
impl MyLinkedList {

  fn new() -> Self {
    MyLinkedList {
      size: 0,
      head: Box::new(Option::None)
    }
  }
  
  fn get(&self, index: i32) -> i32 {
    index
  }
  
  fn add_at_head(&mut self, val: i32) {
    self.head = Box::new(Some(ListNode {
      next: Box::new(Option::None),
      val: val
    }));
  }
  
  // fn add_at_tail(&mut self, val: i32) {
    
  // }
  
  // fn add_at_index(&self, index: i32, val: i32) {

  // }
  
  // fn delete_at_index(&self, index: i32) {

  // }
}

fn main() {
  // let mut obj = MyLinkedList::new();
  // obj.add_at_head(2);
  // dbg!(obj.size);
  // dbg!(obj.head.val);
  let list = ListNode {
    next: Box::new(Some(ListNode {
      next: Box::new(Option::None),
      val: 1
    })),
    val: 0
  };
  dbg!(list.next);
}