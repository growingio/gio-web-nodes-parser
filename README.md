# gio-web-nodes-parser

## 安装

```bash
npm install --save gio-web-nodes-parser
```

## Web 端/圈选使用

```js
import { GioWebNode } from 'gio-web-nodes-parser';

const gioWebNode: GIOWEBNODE = new GioNode(elementNode, actionType);
```

### 参数

| 参数        | 类型                                                  | 必选 | 默认值 | 说明             |
|-------------|-------------------------------------------------------|------|-------|----------------|
| elementNode | Element                                               | √    | 无     | 元素节点         |
| actionType  | 'click' \| 'change' \| 'circleClick' \| 'circleHover' | √    | 无     | 当前响应事件类型 |

### 方法

#### trackNodes() => GIOWEBNODEINFO[]

获取事件节点信息（actionType 为 click 时，会向上冒泡查找符合条件的容器节点信息）

```js
gioWebNode.trackNodes();
```

### 返回属性

#### xpath: string 截取后的 xpath

#### fullXpath: string 完整的 xpath

#### skeleton: string 完整的 xpath 骨架

#### xcontent: string 最后 4 层样式+id

#### outFlow: boolean 真实节点是否脱离文档流

#### triggerEvent: 'VIEW_CLICK' | 'VIEW_CHANGE' 节点触发的事件类型

#### content?: Possible<string> 元素内容

#### index?: Possible<number> 相对位置

#### hyperlink?: Possible<string> 元素链接

#### peerNodes?: Possible<any[]> 同结构的兄弟节点

### Hybrid端使用

```js
import { GioHybridNode } from 'gio-web-nodes-parser';

const gioHybridNode: GIOHYBRIDNODE = new GioHybridNode({
  webviewLeft,
  webviewTop,
  webviewWidth,
  webviewHeight,
  webviewZLevel
});
```

### 参数

| 参数       | 类型                                                              | 必选 | 默认值 | 说明     |
|------------|-------------------------------------------------------------------|------|-------|--------|
| deviceInfo | { webviewLeft,webviewTop,webviewWidth,webviewHeight,webviewZLevel } | √    | 无     | 设备信息 |

### 方法

#### trackNodes() => GIOHYBRIDNODEINFO[]

获取指定根节点下所有可圈选节点信息

```js
const elements = gioHybridNode.trackNodes(root ?? document.body, {
  isContainer: false,
  zLevel: 0
});
```

### 返回属性

#### xpath: string 截取后的 xpath

#### fullXpath: string 完整的 xpath

#### skeleton: string 完整的 xpath 骨架

#### xcontent: string 最后 4 层样式+id

#### outFlow: boolean 真实节点是否脱离文档流

#### triggerEvent: 'VIEW_CLICK' \| 'VIEW_CHANGE' 节点触发的事件类型

#### content?: Possible\<string\> 元素内容

#### index?: Possible\<number\> 相对位置

#### hyperlink?: Possible\<string\> 元素链接

#### peerNodes?: Possible\<any[]\> 同结构的兄弟节点

#### top: number 节点矩位置信息

#### left: number 节点矩位置信息

#### width: number 节点矩位置信息

#### height: number 节点矩位置信息

#### zLevel: number 节点层级信息

#### nodeType: string 节点事件触发类型/节点标签名

#### href?: Possible\<string\> 元素链接

#### parentXPath?: Possible\<string\> 父级xpath
