# bookstore

## Review (原生DEMO)

### HTML
页面数据可以通过 js 嵌入

### CSS
- 涉及宽度，可以使用比例或者 vw、vh 一类处理，自适应
- 书的排列属于常规布局，尝试使用 flex 或者非 float 模式处理
- 布局的方式很多，合适的场景用合适的方式，这里的代码有比 float 更好的选择




### JavaScript
- 学习阶段代码别全 copy，借鉴可以自己敲，理解内部逻辑
- 接口设计时可以考虑更通用的场景， `db_get_trolley_obj` 可以把存的数据 `key` 值作为入参，如果存储的数据不止购物车，多个 key 场景
- 事件监听可以用 `addEventListener`，没必要每个 `item` 单独绑定 `onclick` 事件，代码量可以缩小大半
