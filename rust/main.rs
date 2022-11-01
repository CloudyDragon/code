#[derive(Debug)]
struct Node {
    pub val: i32,
    pub next: Option<Box<Node>>
}

impl Node {
    #[inline]
    fn new(val: i32) -> Node {
        Node {
            next: None,
            val
        }
    }

    fn add(&mut self, val: i32) {
        self.next = Some(Box::new(Node { next: None, val }));
    }
}

fn main() {
    let mut head = Node::new(0);
    head.add(1);
    head.add(2);
    println!("{:?}", head);
}