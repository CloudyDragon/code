So the difference between `mutations` and `actions` is `muatations` are the code or
muataions和actions的区别是，mutation 是用来

the functions that acturall changes your state, actually mutates youre state.
改变你的状态的

And the must be synchronous.
而且它们必须是同步的
The reason that they must be synchronous is because Vuex has a `devtools` intearation.
它们必须同步的原因是因为Vuex具有devtools集成

If you've seen the `devtools` integration, you know there's the time travel feature 
如果你用过devtools, 会发现一个叫时间旅行者的功能

and we have snapshots of your state whenever a mutation happens
每当发生mutation, 我们都会提供状态快照

If you wangt to take snapshots then it is critical that the mutations
如果你想拍内存快照，那么同步突变至关重要

be synchronous because you can compare the before and after immediately after the function is called.
保持同步，因为你可以在调用函数后立即比较前后差异

if a mutation can contain arbitrary asynchronous operations,
如果mutation包含任意异步操作

the after you call the `mutation` you don't really know hao long your have to wait until your state has actually changed.

在你调用mutation之后，你不知道要等多久状态才会改变

So that can make the snapshot comparisons a lot barder to implement.
这样会使快照比较难以实现

So and also, asynchronicity and the actual muataion of your code is better separated,
所以你的异步代码最好和mutation代码分开

So essentially in VueX the concept of `actions` and `mutations` are really just
所以本质上在VueX中，action和mutations的概念实际上只是

meant to separate asyncrhonousity from the actual procedures of muatating your code.
把异步代码和状态更改代码分开