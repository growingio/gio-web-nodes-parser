# gio-web-nodes-parser

[![npm version](https://badge.fury.io/js/gio-web-nodes-parser.svg)](https://badge.fury.io/js/gio-web-nodes-parser)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> 专为 GrowingIO Web SDK 设计的 DOM 节点解析库

**一句话说明**: 输入一个 DOM 元素，输出包含 XPath、内容、位置、列表索引等完整信息的节点数据，用于用户行为分析和页面元素追踪。

## 🎯 能解决什么问题

- ✅ **精确定位页面元素** - 生成多层次的 XPath 路径，确保元素唯一性
- ✅ **智能识别列表结构** - 自动计算列表项索引，支持真实列表和伪列表
- ✅ **收集父节点信息** - 根据事件类型智能决定是否收集父节点链
- ✅ **提取元素内容** - 获取用户可见的文本内容和链接信息
- ✅ **计算位置信息** - 提供精确的像素级位置数据（Hybrid 模式）

## 📦 安装

```bash
npm install gio-web-nodes-parser
```

## 🚀 基础使用

### 1. Web 端 - 单个元素解析

```javascript
import { GioWebNode } from 'gio-web-nodes-parser';

// 解析按钮点击
const button = document.querySelector('#submit-btn');
const webNode = new GioWebNode(button, 'click');
const result = webNode.trackNodes();

console.log(result);
// 输出完整的节点信息数组
```

### 2. Hybrid 端 - 批量元素解析

```javascript
import { GioHybridNode } from 'gio-web-nodes-parser';

// 配置设备信息
const deviceInfo = {
  scale: 2,
  winWidth: 375,
  winHeight: 667,
  webviewTop: 0,
  webviewLeft: 0,
  webviewWidth: 375,
  webviewHeight: 667,
  webviewZLevel: 0,
};

// 批量解析页面所有可追踪元素
const hybridNode = new GioHybridNode(deviceInfo);
const allNodes = hybridNode.trackNodes(document.body);

console.log(`找到 ${allNodes.length} 个可追踪元素`);
```

## 📊 输出什么数据

### Web 端输出示例

点击一个列表中的按钮，会输出：

```javascript
[
  {
    // 🎯 定位信息
    xpath: '/div/ul/li[2]/button', // 用于快速定位的路径
    fullXpath: '/div#header/ul.nav/li[2]/button.submit', // 包含ID和类名的完整路径
    skeleton: '/div/ul/li/button', // 结构骨架（忽略索引）
    xcontent: '/#header/.nav//.submit', // 样式内容部分

    // 📝 内容信息
    content: '立即购买', // 用户看到的文本
    hyperlink: 'https://shop.com/buy', // 链接地址（如果有）

    // 📊 列表信息
    index: 2, // 在列表中的位置
    isPureList: true, // 是真实的HTML列表
    isPseudoList: false, // 不是伪列表
    peerNodes: [li1, li2, li3], // 同级的列表项

    // ⚡ 事件信息
    triggerEvent: 'VIEW_CLICK', // 触发的事件类型
    isContainer: false, // 不是容器元素
    originNode: HTMLButtonElement, // 原始DOM节点
  },
];
```

### Hybrid 端输出示例

在移动端 WebView 中，还会额外包含位置信息：

```javascript
[
  {
    // 包含所有 Web 端信息 +

    // 📐 位置信息
    top: 120, // 距离顶部120像素
    left: 50, // 距离左侧50像素
    width: 100, // 宽度100像素
    height: 40, // 高度40像素
    zLevel: 5, // z-index层级
    outFlow: false, // 未脱离文档流
  },
];
```

## 🔧 常见使用场景

### 场景 1: 按钮点击追踪

```javascript
// HTML: <button id="buy-now">立即购买</button>
const button = document.getElementById('buy-now');
const webNode = new GioWebNode(button, 'click');
const result = webNode.trackNodes();

// 得到: xpath="/div/button", content="立即购买", triggerEvent="VIEW_CLICK"
```

### 场景 2: 列表项点击追踪

```javascript
// HTML: <ul><li>商品A</li><li>商品B</li><li>商品C</li></ul>
const listItem = document.querySelector('li:nth-child(2)');
const webNode = new GioWebNode(listItem, 'click');
const result = webNode.trackNodes();

// 得到: xpath="/div/ul/li[2]", content="商品B", index=2, isPureList=true
```

### 场景 3: 表单输入追踪

```javascript
// HTML: <input type="text" placeholder="请输入用户名">
const input = document.querySelector('input[type="text"]');
const webNode = new GioWebNode(input, 'circleClick');
const result = webNode.trackNodes();

// circleClick + text input = 不收集父节点链，只返回input本身
```

### 场景 4: 自定义属性识别

```javascript
// HTML: <li data-growing-index="5">特殊项目</li>
const customItem = document.querySelector('[data-growing-index]');
const webNode = new GioWebNode(customItem, 'click');
const result = webNode.trackNodes();

// 得到: index=5, isMarkedIndex=true (使用了自定义索引)
```

## 🎯 父节点链收集规则

这是库的核心特性之一，会根据事件类型智能决定是否收集父节点信息：

### ✅ 会收集父节点链的情况

```javascript
// 1. 所有 click 事件
new GioWebNode(element, 'click').trackNodes(); // 总是收集父节点

// 2. circleClick + 非input元素
new GioWebNode(divElement, 'circleClick').trackNodes(); // 收集父节点

// 3. circleClick + 不支持change的input (如button、file等)
new GioWebNode(buttonInput, 'circleClick').trackNodes(); // 收集父节点
```

### ❌ 不会收集父节点链的情况

```javascript
// circleClick + 支持change的input (如text、email、checkbox等)
const textInput = document.createElement('input');
textInput.type = 'text';
new GioWebNode(textInput, 'circleClick').trackNodes(); // 仅返回input本身
```

## 🔍 智能识别能力

### 列表自动识别

**真实列表:**

```html
<ul>
  <li>项目1</li>
  <!-- 输出: isPureList=true, index=1 -->
  <li>项目2</li>
  <!-- 输出: isPureList=true, index=2 -->
</ul>
```

**伪列表（相似结构的兄弟元素）:**

```html
<div class="products">
  <div class="item">商品A</div>
  <!-- 输出: isPseudoList=true, index=1 -->
  <div class="item">商品B</div>
  <!-- 输出: isPseudoList=true, index=2 -->
  <div class="item">商品C</div>
  <!-- 输出: isPseudoList=true, index=3 -->
</div>
```

### 自定义属性识别

```html
<!-- 自定义索引 -->
<li data-growing-index="99">特殊项</li>
<!-- 输出: index=99, isMarkedIndex=true -->

<!-- 容器标记 -->
<div data-growing-container="true">容器</div>
<!-- 输出: isContainer=true -->

<!-- 忽略标记 -->
<div data-growing-ignore="true">被忽略</div>
<!-- 不会出现在输出中 -->

<!-- 自定义内容 -->
<button data-growing-title="确认提交">提交</button>
<!-- 输出: content="确认提交" -->
```

## 📋 完整的数据字段说明

### 基础字段（所有模式）

| 字段            | 类型    | 说明                       | 示例                       |
| --------------- | ------- | -------------------------- | -------------------------- |
| `xpath`         | string  | 截取后的 xpath 路径        | `"/div/button"`            |
| `fullXpath`     | string  | 完整 xpath（含 ID 和类名） | `"/div#app/button.submit"` |
| `skeleton`      | string  | 结构骨架（仅标签）         | `"/div/button"`            |
| `xcontent`      | string  | 样式内容部分               | `"/#app/.submit"`          |
| `content`       | string  | 元素文本内容               | `"立即购买"`               |
| `index`         | number  | 列表中的位置索引           | `2`                        |
| `hyperlink`     | string  | 链接地址                   | `"https://example.com"`    |
| `triggerEvent`  | string  | 事件类型                   | `"VIEW_CLICK"`             |
| `isContainer`   | boolean | 是否为容器                 | `true`                     |
| `isPureList`    | boolean | 是否为真实列表             | `true`                     |
| `isPseudoList`  | boolean | 是否为伪列表               | `false`                    |
| `isMarkedIndex` | boolean | 索引是否被标记             | `false`                    |

### Hybrid 模式额外字段

| 字段      | 类型    | 说明           | 示例    |
| --------- | ------- | -------------- | ------- |
| `top`     | number  | 距离顶部像素   | `120`   |
| `left`    | number  | 距离左侧像素   | `50`    |
| `width`   | number  | 元素宽度       | `100`   |
| `height`  | number  | 元素高度       | `40`    |
| `zLevel`  | number  | z-index 层级   | `5`     |
| `outFlow` | boolean | 是否脱离文档流 | `false` |

## 🛠️ 开发调试

### 查看解析结果

```javascript
const webNode = new GioWebNode(element, 'click');
const result = webNode.trackNodes();

// 在控制台查看完整结果
console.table(result);

// 查看XPath计算过程
const xpathInfo = webNode.computeXpath(webNode.xNode);
console.log('XPath信息:', xpathInfo);
```

## 📄 许可证

[ISC License](https://opensource.org/licenses/ISC)

## 🔗 相关链接

- [GrowingIO 官网](https://www.growingio.com/)
- [GrowingIO WebJS SDK](https://github.com/growingio/growingio-sdk-webjs-autotracker)
- [问题反馈](https://github.com/growingio/gio-web-nodes-parser/issues)
- [更新日志](https://github.com/growingio/gio-web-nodes-parser/releases)
