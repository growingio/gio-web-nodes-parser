import e from"array-from";var t=function(){return t=Object.assign||function(e){for(var t,i=1,n=arguments.length;n>i;i++)for(var r in t=arguments[i])({}).hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},t.apply(this,arguments)};function i(e,t,i){if(i||2===arguments.length)for(var n,r=0,o=t.length;o>r;r++)!n&&r in t||(n||(n=[].slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||[].slice.call(t))}var n=function(e){try{return e()}catch(e){return}},r=function(e){return"number"===g(e)},o=function(e){return"object"===g(e)&&!function(e){return s(["undefined","null"],g(e))}(e)},a=function(e){return Array.isArray(e)&&"array"===g(e)},u=function(e,t){var i=-1;if(a(e))for(var n=0;n<e.length;n++)if(t(e[n]))return n;return i},s=function(e,t){return("array"===g(e)||"string"===g(e))&&e.indexOf(t)>=0},c=e,l=function(e){return o(e)?Object.keys(e):[]},d=function(e){return a(e)?0===e.length:o(e)?0===l(e).length:!e},f=function(e){if(a(e)){for(var t=0,i=[],n=0,r=e;n<r.length;n++){var o=r[n];o&&!d(o)&&(i[t++]=o)}return i}return e},g=function(e){return{}.toString.call(e).slice(8,-1).toLowerCase()},h=["body","br","canvas","clippath","defs","desc","g","hr","html","iframe","math","param","path","rect","script","style","text","title","tspan","use"],v=["button","reset","submit"],p=i(i([],v,!0),["file"],!1),N=["checkbox","color","radio","range"],m=i(i([],N,!0),["date","datetime-local","month","number","password","text","time","week"],!1),w=["tr","li","dt","dd"],L=i(["a","button","dl"],w,!0),b=["i","em","svg","img"],x=["i","span","em","b","strong","bdo"],E=/(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g,y=/^([a-zA-Z\-\_0-9]+)$/,_="data-growing-ignore",I="data-growing-container",C="data-growing-index",k="data-growing-title",T=function(e,t){var i;return null!==(i=n((function(){return e.hasAttribute(t)&&"false"!==e.getAttribute(t)})))&&void 0!==i?i:n((function(){return e.hasOwnPerporty(t)}))},S=function(e,t){var i;return null!==(i=n((function(){return e.getAttribute(t)})))&&void 0!==i?i:n((function(){return e.attributes[t].value}))},P=function(e){var t,i=!s(h,e.tagName.toLowerCase()),n=X(e);return i&&n&&s(x,null===(t=e.tagName)||void 0===t?void 0:t.toLowerCase())?P(n):e},O=function(e,t,i){if(void 0===t&&(t=5),void 0===i&&(i=0),!e.children)return!1;if("svg"===e.tagName.toLocaleLowerCase())return i>t;if(i>t)return!0;for(var n=0;n<e.children.length;n++){var r=e.children[n];if(O(r,t,i+1))return!0}return!1},D=function(e,t){var n=e.tagName.toLowerCase();if(!(e instanceof HTMLElement))return!1;if(T(e,_))return!1;if(s(h,n))return!1;if(s(["circleClick","circleHover","click"],t)){if("textarea"===n&&"click"===t)return!1;if("input"===n){if("click"===t&&!s(p,S(e,"type")))return!1;if(s(["circleClick","circleHover"],t)&&!s(i(i([],p,!0),m,!0),S(e,"type")))return!1}if(!j(e)&&O(e,5))return!1}return!0},H=function(e,t){return void 0===t&&(t=!1),c((null==e?void 0:e.childNodes)||[]).filter((function(e){return s(t?[Node.ELEMENT_NODE,Node.TEXT_NODE]:[Node.ELEMENT_NODE],e.nodeType)}))},X=function(e){return A(e.parentElement)?null:e.parentElement},A=function(e){return!e||s(["BODY","HTML","#document"],e.tagName)},j=function(e){return T(e,I)||s(L,e.tagName.toLowerCase())||"input"===e.tagName.toLowerCase()&&s(v,e.type)},V=function(e){var t=H(e);return!d(t)&&t.every((function(e){var t=W(e),i=s(e.classList,"icon");return!(!t&&!i||z(e))}))},z=function(e){var t=H(e,!0);return!d(t)&&t.every((function(e){var t=e.nodeType===Node.TEXT_NODE,i=B(e);return!(!t||!i)}))},W=function(e){return s(b,e.tagName.toLocaleLowerCase())},B=function(e){var t=H(e,!0).filter((function(e){var t;return e.nodeType===Node.TEXT_NODE||s(x,null===(t=e.tagName)||void 0===t?void 0:t.toLowerCase())})).map((function(e){return G(e.textContent,e.textContent.length)}));return G(f(t).join(" "))},G=function(e,t){return void 0===t&&(t=50),e&&(null==(e=e.replace(/[\n \t]+/g," ").trim())?void 0:e.length)?e.slice(0,r(t)&&t>0?t:void 0):""},R=/[^/]*.(bmp|jpg|jpeg|png|gif|svg|psd|webp|apng)/gi,U=function(e,t){switch(t){case"a":return function(e){if(T(e,"href")){var t=S(e,"href");if(t&&0!==t.indexOf("javascript"))return t.slice(0,320)}return""}(e);case"img":return function(e){var t=e.src;if(t&&-1===t.indexOf("data:image")){var i=t.match(R),n=d(i)?"":i[0];if(n.indexOf("%")>-1){var r=function(e,t){var i=-1;if(a(e))for(var n=0;n<e.length;n++)"%"===e[n]&&(i=n);return i}(n.split(""));n=n.substring(r+3,n.length)}return n}return""}(e);default:return""}},M={a:function(e){var t=B(e);return t||(Z(e)||U(e,"a"))},button:function(e){var t=S(e,"name");if(t)return t;var i=B(e);return i||(Z(e)||$(e))},img:function(e){return G(S(e,"alt"))||U(e,"img")},input:function(e){if("password"===e.type)return"";var t,i,n=e instanceof HTMLInputElement&&s(p,e.type),r=T(e,"data-growing-track");if(n||r)return G(e.value);if(e instanceof HTMLInputElement&&s(N,e.type)){var o=void 0;if(e.id)i=function(t){return t.htmlFor===e.id},o=(t=c(document.getElementsByTagName("label")))[u(t,i)];return o||(o=Y(e,(function(e){return"label"===e.tagName.toLowerCase()}))),K(e,o?B(o):G(e.value))}return""},label:function(e){var t=B(e);return t||(Z(e)||$(e))},select:function(e){return G(c(e.options).filter((function(e){return e.selected})).map((function(e){return e.label})).join(", ")||e.value)},svg:function(e){var t;return H(e).some((function(e){var i;if(e.nodeType===Node.ELEMENT_NODE&&"use"===(null===(i=e.tagName)||void 0===i?void 0:i.toLowerCase())&&e.hasAttribute("xlink:href"))return t=e,!0})),t?t.getAttribute("xlink:href"):""},textarea:function(){return""},form:function(){return""}},F=function(e,t){if(T(e,k)&&S(e,k))return G(S(e,k));if(T(e,"title")&&S(e,"title"))return G(S(e,"title"));var i=M[t];if(i)return i(e);var n=B(e);return n?G(n):function(e){if("svg"===e.tagName)return!1;var t=H(e);return t.length>0&&t.every((function(e){return function(e){if("svg"===e.tagName)return!0;var t=H(e);if(d(t))return!0;var i=z(e);return!(!d(t)&&!i)}(e)}))}(e)&&!V(e)?G(Z(e)):V(e)?G($(e)):""},Y=function(e,t){for(var i=e.parentElement;i&&!A(i);){if(t(i))return i;i=i.parentElement}},Z=function(e){var t=H(e);return f(t.map((function(e){var t=B(e);if(z(e)&&t)return t}))).join(" ")},$=function(e){var t;return H(e).some((function(e){var i,n=F(e,null===(i=e.tagName)||void 0===i?void 0:i.toLowerCase());return!!n&&(t=n,!0)})),t},K=function(e,t){return s(["checkbox","radio"],e.type)?"".concat(t).concat((i=e.checked,"boolean"===g(i)?"("+e.checked+")":"")):t;var i},q=function e(t,r,o,a,l){void 0===a&&(a=!0),void 0===l&&(l=[]);var f,g=this;this.originNode=t,this.deviceInfo=r,this.actionType=o,this.trackable=a,this.parentNodes=l,this.isLimitViewport=!0,this._getIndex=function(){if(T(g.originNode,C)){var e=S(g.originNode,C);return/^\d{1,10}$/.test(e)&&e-0>0&&2147483647>e-0?+e:void(0>g.actionType.indexOf("circle")&&(l="".concat(e,"，index标记应为 大于 0 且小于 2147483647 的整数！"),"warn",console.log("%c [GrowingIO]：".concat(l),"color: #F59E0B;")))}if(s(["dd","dt"],g.tagName)){var t=X(g.originNode),n=t?H(t):[];if("dl"===t.tagName.toLowerCase()&&n.length>0){if("dd"===g.tagName){var r=u(n,(function(e){return e.isSameNode(g.originNode)}));if(r>-1)return(o=n.slice(0,r).filter((function(e){return"dt"===e.tagName.toLowerCase()}))).length-1+1}if("dt"===g.tagName){var o=n.filter((function(e){return"dt"===e.tagName.toLowerCase()}));return u(o,(function(e){return e.isSameNode(g.originNode)}))+1}}}if(g.isPureList){var a=u(g._pureList,(function(e){return e.isSameNode(g.originNode)}));return a>-1?(g.peerNodes=i([],g._pureList,!0),g.peerNodes.splice(a,1),a+1):void 0}if(g.isPseudoList){var c=u(g._pseudoList,(function(e){return e.isSameNode(g.originNode)}));return c>-1?(g.peerNodes=i([],g._pseudoList,!0),g.peerNodes.splice(c,1),c+1):void 0}var l},this._getSiblingNode=function(e,t){var i,r=X(e);if(!r)return[];for(var o=null!==(i=n((function(){return c(r.children)})))&&void 0!==i?i:[],a=[],u=0;u<o.length;u++){var s=o[u],l=o[u+1];if(!l||!t(s,l))break;d(a)?a.push(s,l):a.push(l)}return a},this._getIsPureList=function(){var e=g._getSiblingNode(g.originNode,(function(e,t){return e.tagName===t.tagName}));return!(1>e.length||!s(w,g.tagName)||(g._pureList=e,0))},this._getIsInPseudoList=function(){if(s(["th","td"],g.tagName))return!1;var e=g._getSiblingNode(g.originNode,(function(e,t){var i=e.tagName===t.tagName&&e.className===t.className,n=H(e),r=H(t),o=n.every((function(e,t){var i,n;return(null==e?void 0:e.tagName)===(null===(i=r[t])||void 0===i?void 0:i.tagName)&&(null==e?void 0:e.className)===(null===(n=r[t])||void 0===n?void 0:n.className)})),a=n.length===r.length&&o;return i&&a}));return e.length>=3&&(g._pseudoList=e,!0)},this._getClassList=function(e){var t;if(T(e,"name")&&S(e,"name"))return[S(e,"name")];var i=(null!==(t=S(e,"class"))&&void 0!==t?t:"").trim().split(" ");return d(i)?[]:i.filter((function(e){return e&&!E.test(e)&&y.test(e)})).sort()},this._getCurrentXpath=function(){return"/".concat(g.tagName).concat(g.id?"#"+g.id:"").concat(d(g.classList)?"":"."+g.classList.join("."))},this._getIsContainer=function(){return T(g.originNode,I)||s(L,g.tagName)||"input"===g.tagName&&s(v,g.originNode.type)},this._getContent=function(){g.content=F(g.originNode,g.tagName)},this._getIsOutFlow=function(){var e=window.getComputedStyle(g.originNode).position;return s(["fixed","sticky"],e)},this._getRect=function(){var e=g.originNode.getBoundingClientRect(),t=e.top,i=e.bottom,n=e.left,r=e.right-n,o=i-t,a=g.deviceInfo,u=a.winHeight,s=a.winWidth;return t+o>u&&(o=u-t),n+r>s&&(r=s-n),{top:t,left:n,width:r,height:o}},this._getListItemViewStatus=function(){var e=g.parentNodes.find((function(e){var t=e.originNode,i=t.scrollHeight,n=t.scrollWidth,r=t.clientHeight,o=t.clientWidth,a=e.rect,u=a.width,s=a.height;return r!==i&&i>s||o!==n&&n>u}));if(e){var t=e.rect,i=t.top,n=t.left,r=t.width,o=t.height,a=g.rect,u=a.top,s=a.left,c=a.width,l=a.height;return i>u+l||s>n+r||u>i+o||n>s+c?"OUTSIDE":u>=i&&s>=n&&i+o>u+l&&n+r>s+c?"DISPLAYED":"OBSCURED"}return""},this._getViewStatus=function(e){var t=window.getComputedStyle(g.originNode),n=t.opacity,r=t.visibility,o=t.display,a=t.width,u=t.height,c=g.rect,l=c.top,d=c.left,f=c.width,h=c.height,v=g.deviceInfo,p=v.winWidth,N=v.winHeight;if(0===Number(n)||"hidden"===r||"none"===o||"0px"===a||0===g.originNode.clientWidth||"0px"===u||0===g.originNode.clientHeight)return"HIDDEN";var m=i([],e,!0).find((function(e){return e.trackable&&s(["DISPLAYED","OBSCURED"],e.viewStatus)}));if(g.isPureList||g.isPseudoList){var w=g._getListItemViewStatus();if(w)return w}if(m)return m.viewStatus;var L=function(e,t){return document.elementFromPoint(e,t)===g.originNode};return N>l&&p>d&&f>0&&h>0?L(d+f/2,l+h/2)||L(d+1,l+1)||L(d+f-1,l+1)||L(d+1,l+h-1)||L(d+f-1,l+h-1)?"DISPLAYED":g.isLimitViewport&&(0>l+h||0>d+f)?"OUTSIDE":"OBSCURED":"OUTSIDE"},this._getTriggerEvent=function(){return"input"===g.tagName&&s(m,g.originNode.type)||s(["select","textarea"],g.tagName)?"VIEW_CHANGE":"VIEW_CLICK"},this._getXParents=function(t,i){var n=t.parentElement,r=[];if(i.length>0)r.push.apply(r,i);else if(n&&!A(n)){var o=new e(n,void 0,g.actionType,D(n,g.actionType));r.push(o),o.xParents&&r.push.apply(r,o.xParents)}return r},this.tagName=t.tagName.toLocaleLowerCase(),this.classList=this._getClassList(t),this.id=t.id,this.currentXpath=this._getCurrentXpath(),this.isIgnored=T(this.originNode,_),this.isContainer=this._getIsContainer(),this.isPureList=this._getIsPureList(),this.isPseudoList=this._getIsInPseudoList(),this.index=this._getIndex(),this.hyperlink=U(t,this.tagName),this.content=F(this.originNode,this.tagName),this.triggerEvent=this._getTriggerEvent(),this.isOutFlow=this._getIsOutFlow(),r&&(this.isLimitViewport=null===(f=r.isLimitViewport)||void 0===f||f,this.rect=this._getRect(),this.viewStatus=this._getViewStatus(l)),this.xParents=this._getXParents(t,l)},J=function e(t,i,n,o,a){var u=this;this.origin=t,this.action=i,this.lengthThreshold=n,this.deviceInfo=o,this.parentNode=a,this.trackNodes=function(){var e;if(!u.trackable)return[];var t=[u.xNode];if(s(["click","circleClick","change"],u.actionType))for(var i=u._getParent();i;){if(!(null==i?void 0:i.xNode)||(null===(e=i.xNode)||void 0===e?void 0:e.isIgnored))return[];i.trackable&&t.push(i.xNode),i=i._getParent()}var n,o=[];return t.reverse().forEach((function(e,i){if(T(e.originNode,I)&&(o=[],n=void 0),r(e.index)&&!r(n)&&(n=e.index),r(n)&&(e.index=n),i===t.length-1)o.push(u.getGioNodeInfo(e));else{var a=e.isPureList||e.isPseudoList;(e.isContainer||a)&&o.push(u.getGioNodeInfo(e))}})),o},this.getGioNodeInfo=function(e){var t=u.computeXpath(e),i=t.skeleton,n=t.fullXpath,r=t.xcontent,o=e.hyperlink,a=e.index,s=e.peerNodes,c=e.content,l=e.triggerEvent,d=e.originNode;return{skeleton:i,xpath:i,fullXpath:n,xcontent:r,hyperlink:o,index:a,peerNodes:null!=s?s:[],content:G(c),triggerEvent:l,originNode:d}},this.computeXpath=function(e){var t,i="/"+e.tagName,n=e.currentXpath,r="/"+((e.id?"#"+e.id:"")+(d(e.classList)?"":"."+e.classList.join("."))||"-");return null===(t=e.xParents)||void 0===t||t.forEach((function(e,t){if(n=e.currentXpath+n,t<u.xpathThreshold-1){i="/"+e.tagName+i;var o=(e.id?"#"+e.id:"")+(d(e.classList)?"":"."+e.classList.join("."));r="/"+(o||"-")+r}})),{skeleton:i,fullXpath:n,xcontent:r}},this._getParent=function(){var t=X(u.originElement);if(t&&t.nodeName&&!A(t))return new e(t,u.actionType)},this.actionType=s(["circleClick","circleHover","click","change"],i)?i:"click",this.originElement=P(t),this.xpathThreshold=r(n)?n:4,this.trackable=D(this.originElement,this.actionType),this.originElement.isSameNode(t)||(a=null);var c=[];a&&a.xNode&&(c.push(a.xNode),a.xNode.xParents&&c.push.apply(c,a.xNode.xParents)),this.xNode=new q(this.originElement,this.deviceInfo,this.actionType,this.trackable,c)},Q=[],ee=function(e,i){var n,r,o,a,u,c,f,g=this;this.trackNodes=function(e,t,i){return void 0===i&&(i=!1),Q=[],g._getTrackElements(e,t,null,i),Q},this._getTrackElements=function(e,t,i,n){void 0===n&&(n=!1),H(e).forEach((function(e){var r,o,a,u;if(!(null==e?void 0:e.tagName)||s(["circle-shape","circle-page","heatmap-page"],null===(r=null==e?void 0:e.tagName)||void 0===r?void 0:r.toLowerCase())||(null===(o=null==e?void 0:e.id)||void 0===o?void 0:o.indexOf("__vconsole"))>-1||(null===(a=null==e?void 0:e.id)||void 0===a?void 0:a.indexOf("__giokit"))>-1)return!1;var c=new J(e,"circleClick",g.xpathThreshold,g.deviceInfo,i),l=c.xNode;if(l.zLevel=g._getZLevel(e,t),c.trackable&&(s(["DISPLAYED","OBSCURED"],l.viewStatus)||n)){if(t.index&&(l.index=t.index),Q.find((function(e){return e.originNode.isSameNode(l.originNode)})))return!1;if("DISPLAYED"===l.viewStatus){var f=g._getGioHybridNodeInfo(c,t);Q.push(f)}else"OBSCURED"===l.viewStatus&&(l.isContainer||n)&&(f=g._getGioHybridNodeInfo(c,t),Q.push(f));if(W(e)||l.isContainer&&z(e))return!1}d(H(e))||g._getTrackElements(e,null!==(u=c.xNode)&&void 0!==u?u:t,c,n)}))},this._getZLevel=function(e,t){var i=window.getComputedStyle(e),n=i.position,r=i.zIndex;if("auto"!==r){var o=Number(r||0);return(Number.isNaN(o)?0:o)+t.zLevel}switch(n){case"relative":return t.zLevel+2;case"sticky":return t.zLevel+3;case"absolute":return t.zLevel+4;case"fixed":return t.zLevel+5;default:return t.zLevel+1}},this._getGioHybridNodeInfo=function(e,i){var n=e.xNode,r=n.rect,o=n.zLevel,a=e.getGioNodeInfo(n),u=a.hyperlink,s={};return l(r).forEach((function(e){return s[e]=r[e]*g.deviceInfo.scale})),s.top+=g.deviceInfo.webviewTop,s.left+=g.deviceInfo.webviewLeft,t(t(t({},s),a),{zLevel:o+g.deviceInfo.webviewZLevel,href:u,parentXPath:i.trackable?e.computeXpath(i).xpath:void 0})},this.xpathThreshold=i,this.deviceInfo=(r=(n=e).webviewLeft,o=n.webviewTop,a=n.webviewWidth,u=n.webviewHeight,c=n.webviewZLevel,f=n.isLimitViewport,{winWidth:a,winHeight:u,scale:a/window.innerWidth,webviewTop:o,webviewLeft:r,webviewWidth:a,webviewHeight:u,webviewZLevel:c,isLimitViewport:f})};export{ee as GioHybridNode,J as GioWebNode};
