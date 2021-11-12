```html

<div id="app">
  <component :is="url"></component>
  <a href="#foo">foo</a>
  <a href="#bar">bar</a>
</div>
<script>
window.addEventListener('hashchange', () => {
  app.url = window.location.hash.slice(1)
})

const app = new Vue({
  el: "#app",
  data: {
    url: window.location.hash.slice(1)
  },
  components: {
    foo: { template: `<div>foo</div>` },
    bar: { template: `<div>bar</div>` },
  }
})

</script>
```


```html
<script>
const Foo = { template: `<div>foo</div>` }
const Bar = { template: `<div>Bar</div>` }
const NotFound = { template: `<div>NotFound</div>` }

const routeTable = {
  'foo': Foo,
  'bar': Bar,
}

window.addEventListener('hashChange', () => {
  app.url = window.location.hash.slice(1)
})

const app = new Vue({
  el: "#app",
  data: {
    url: window.location.hash.slice(1)
  },
  render (h) {
    return h('div', [
      h(routeTable[this.url] || NotFound),
      h('a', { attrs: { href: '#foo' } }, 'foo'),
      h('a', { attrs: { href: '#bar' } }, 'bar'),
    ])
  }
})

</script>

```