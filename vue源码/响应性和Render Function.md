Each component has a render function.
每一个组件都有一个渲染函数

And this render function, when we run it,
而这个渲染函数，当我们运行它时，

it's essentially wrapped inside an `autorun` that we implemented eailier.
它实际上包装在我们之前实现的autorun函数

So that's why when it renders, we're collecting all these dependencies by invokeing these `getters` on our `data` properties.
当渲染的时候，我们收集他们的依赖。通过调用我们data属性的getters

And when we have this additional concept, kind of watcher,
我们有了这个额外的概念，一种观察者，

that each component has a watcher that's responsible for collecting dependencies, cleaning them up, and notifying everything.
每个组件都有一个负责监视的观察者收集依赖项，清理它们并通知所有内容。

And the component render functions returns Virtual DOM.
组件渲染函数返回虚拟DOM.

So you see the loop here because we're inside `autorun` where we render.
你会看到这里是循环，因为我们的渲染放在autorun中

The render will be called over and over again, whenever the property that we depend on viewing the render changes.
渲染会被反复调用，只要我们依赖的渲染属性发生变化

So each component has sort of it's own `autorun` loop.
每个组件都有自己的自动循环渲染

And a component tree consists of many of these components,
组件树由许多这些组件组成

each as a dependecy boundary, so each component tracks its own dependencies
每个组件都只负责自己的依赖

So, this is in fact an advantage when you have a huge component tree,
因此，当你游泳巨大的组件树时，这实际上是一个优势

beacuse you can hava the data dependencies change.
因为你可以更改数据依赖关系

Your data may be mutated from anywhere, but
你的数据可以在任何地方发生改变、但是

because each component tracks its own dependencies inside a big component tree
因为每个组件都只负责自己的依赖在这个组件树中

we precisely know which components are affected by arbitrary data manipulation.
我们确切的知道哪些组件受到哪些数据的影响 

So, we never over render, we don't
所以，它不会过度渲染

have the problem of having too many components being rerendered unnecessarily
不会造成过多的组件重新渲染

because we have a precise dependency tracking system in place.
因为我们有一个精确的依赖跟踪系统

So that's an architectural advantage that gets rid of some sort of optimization efforts that you need to do in
因此，这是一种架构优势，可摆脱一些优化工作

a more top down based rendering model that React uses.
React使用的基于自上而下的渲染模型。

But we also pay the overhead of converting these data into getters and setters.
但是，我们还付出了将这些数据转换为`getter`和`setter`的开销。