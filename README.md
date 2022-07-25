# gio-web-nodes-parser

Library of parsing nodes used by GrowingIO WebJS SDK

GrowingIO WebJS SDK 使用的解析页面节点的库。

### 安装

```
npm install --save @gio/node
```

### 使用方式

```
new GioNode(element [, actionType [, directInteract]])
```

参数

| 参数           | 类型                                         | 必选 | 默认值 | 说明                         |
| -------------- | -------------------------------------------- | ---- | ------ | ---------------------------- |
| element        | Element                                      | √    | 无     | 元素节点                     |
| actionType     | 'click' \| 'change' \| 'submit' \| 'heatmap' | ×    | 无     | 当前响应事件类型             |
| directInteract | boolean                                      | ×    | false  | 是否直接交互（触发事件）节点 |

actionType取值heatmap时，不会自动向上查找有效父元素，直接获取当前元素信息

### 属性

##### parentElement

​ 获取父节点

##### ignore

​ 节点是否标记了忽略，存在`data-growing-ignore=true`

##### origin

​ 原始节点

##### **target**

​ 计算后的目标节点

##### fullXpath

​ 完整的xpath，不进行截取的

##### xpath

​ 截取后的xpath

##### **skeleton**

​ 完整的xpath骨架

##### **info**

​ 节点的信息，形如

````javascript
{
  index: '1',
  href: 'https://growingio.com',
  content: '元素内容',
  xpath: '/div.item/div#ctx/span/a',
  fullXpath: '/div.body/div.item/div#ctx/span/a',
  skeleton: '/div/div/div/span/a'
}
````

### 方法

##### **traceable**

`node.traceable`

​ 判断当前节点应不应该被追踪，返回true|false

##### trackInfos

`node.rackInfos()`

​ 冒泡获取所有可追踪的节点信息

##### actions

`node.actions()`

​ 获取当前节点可支持的事件列表，值包括`clck`,`chng`,`sbmt`

##### circledElement

`node.circledElement()`

​ 根据当前元素返回可圈选的元素
