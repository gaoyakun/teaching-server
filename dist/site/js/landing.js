!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],t):t(e.landing={},e.jQuery)}(this,function(e,v){"use strict";v=v&&v.hasOwnProperty("default")?v.default:v;var i="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function o(e,t){return e(t={exports:{}},t.exports),t.exports}var l=o(function(e,t){var f=i&&i.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function u(e,t){this.$el=jQuery(e);var o=this.constructor.defaults;this.options=jQuery.extend({},o,t)}return u.register=function(d,e){var p=function(){return"widget_"+e};function c(e,t){var o=jQuery.data(e,t);return o&&o instanceof u?o:null}jQuery.fn[e]=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];if(void 0===e||"object"==typeof e)return function(e,t){var o,n,r=p();try{for(var i=f(e.get()),l=i.next();!l.done;l=i.next()){var a=l.value;if(!c(a,r)){var s=new d(a,t);jQuery.data(a,r)||jQuery.data(a,r,s),s._init()}}}catch(e){o={error:e}}finally{try{l&&!l.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return e}(this,e);if("string"==typeof e&&"_"!==e[0]){var n=e;return"destroy"===n?function(e){var t,o,n=p();try{for(var r=f(e.get()),i=r.next();!i.done;i=r.next()){var l=i.value,a=c(l,n);a&&a.destroy(),jQuery.removeData(l,n)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}}(this):"getWidgetClass"===n?d:function(e,t,o){var n,r,i=null;try{for(var l=f(e.get()),a=l.next();!a.done;a=l.next()){var s=a.value,d=jQuery.data(s,p());if(d&&d instanceof u){var c=d[t];c&&"function"==typeof c&&(i=c.apply(d,o))}}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=l.return)&&r.call(l)}finally{if(n)throw n.error}}return i}(this,n,t)}}},u.prototype.destroy=function(){this._deinit()},u.prototype._init=function(){},u.prototype._deinit=function(){},u.defaults={},u}();t.Widget=o});t(l);l.Widget;var n=o(function(e,t){var n,o=i&&i.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),d=i&&i.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}};Object.defineProperty(t,"__esModule",{value:!0});var r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._contentPanel=null,e._selectedNodes=[],e._nodeMap={},e}return o(e,t),e.prototype.getNodes=function(e){var t,o;if("string"==typeof e)return this._nodeMap[e]||[];if(e instanceof RegExp){var n=[];for(var r in this._nodeMap)if(e.test(r))try{for(var i=d(this._nodeMap[r]),l=i.next();!l.done;l=i.next()){var a=l.value;n.push(a)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(o=i.return)&&o.call(i)}finally{if(t)throw t.error}}return n}return e?[e]:[]},e.prototype.toggleSelectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=d(n),i=r.next();!i.done;i=r.next()){var l=i.value;this._selectNode(l,!l.selected)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}1<this._selectedNodes.length&&(this.options.multiSelect=!0)},e.prototype.selectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=d(n),i=r.next();!i.done;i=r.next()){var l=i.value;l.selected||this._selectNode(l,!0)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}1<this._selectedNodes.length&&(this.options.multiSelect=!0)},e.prototype.deselectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=d(n),i=r.next();!i.done;i=r.next()){var l=i.value;l.selected&&this._selectNode(l,!1)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}},e.prototype.toggleCollapsingNodes=function(e){this._toggleCollapsingNodes(this.getNodes(e))},e.prototype.collapseNodes=function(e){this._toggleCollapsingNodes(this.getNodes(e).filter(function(e,t,o){return!!e.expanded}))},e.prototype.expandNodes=function(e){this._toggleCollapsingNodes(this.getNodes(e).filter(function(e,t,o){return!e.expanded}))},e.prototype._init=function(){var o=this;this.$el.off("itemclick"),this.$el.on("itemclick",function(e,t){console.log("internal"),o.options.multiSelect?o.toggleSelectNodes(t):(o.deselectNodes(/^.*$/),o.selectNodes(t))}),this._contentPanel=v("<div></div>").appendTo(this.$el).addClass(["folder-tree-container"]),this.options.borderColor&&this._contentPanel.css({borderColor:this.options.borderColor}),this._create(this._contentPanel,this.options,0),1<this._selectedNodes.length&&(this.options.multiSelect=!0)},e.prototype._selectNode=function(e,t){if(e.selected=t,e.element&&(t?e.element&&e.element.addClass(["active"]):e.element&&e.element.removeClass(["active"])),t&&this._selectedNodes.indexOf(e)<0)this._selectedNodes.push(e);else if(!t){var o=this._selectedNodes.indexOf(e);0<=o&&this._selectedNodes.splice(o,1)}},e.prototype._toggleCollapsingNodes=function(e){var t,o;try{for(var n=d(e),r=n.next();!r.done;r=n.next()){var i=r.value;if(i.element&&i.nodes&&0!==i.nodes.length){var l=i.element.find(">a>a>i");l.removeClass(this.getNodeProp("iconExpand",!0,i).split(" "));var a=i.element.find(">a>span>i"),s=this.getNodeProp("icon",!0,i);s&&a.removeClass(s.split(" ")),i.expanded=!i.expanded,l.addClass(this.getNodeProp("iconExpand",!0,i).split(" ")),(s=this.getNodeProp("icon",!0,i))&&a.addClass(s.split(" ")),i.expanded?i.element.next().removeClass(["collapsed"]):i.element.next().addClass(["collapsed"])}}}catch(e){t={error:e}}finally{try{r&&!r.done&&(o=n.return)&&o.call(n)}finally{if(t)throw t.error}}},e.prototype._create=function(e,u,f){var h=this;e.empty();var y=v("<ul></ul>").appendTo(e);return u.nodes.forEach(function(t,e){var o=h._nodeMap[t.id]||[];o.push(t),h._nodeMap[t.id]=o;var n=f+"rem",r=v("<li></li>").appendTo(y);t.element=r,h._selectNode(t,!!t.selected);var i=v("<a></a>").appendTo(r);i.css({fontSize:h.getNodeProp("textSize",!0,t),color:h.getNodeProp("textColor",!0,t),paddingLeft:n}),"string"==typeof u.itemHeight&&i.css({height:u.itemHeight,lineHeight:u.itemHeight}),i.on("click",function(){h.$el.trigger("itemclick",t)});var l=v("<span></span>").appendTo(i),a=h.getNodeProp("icon",!1,t);if("string"==typeof a)v("<i></i>").appendTo(l).addClass(a.split(" ")).css({color:h.getNodeProp("iconColor",!0,t),fontSize:h.getNodeProp("iconSize",!0,t)}).after(t.text);else{var s=h.getNodeProp("icon",!0,t)||"fa fa-folder";v("<i></i>").appendTo(l).addClass(s.split(" ")).css({color:"rgba(0,0,0,0)",fontSize:h.getNodeProp("iconSize",!0,t)}).after(t.text)}if(t.nodes&&0<t.nodes.length){var d=v("<a></a>").appendTo(i);d.attr("href","javascript:void(0)");var c=h.getNodeProp("iconExpand",!0,t);v("<i></i>").appendTo(d).addClass(c.split(" ")).css({color:h.getNodeProp("iconExpandColor",!0,t),fontSize:h.getNodeProp("iconExpandSize",!0,t)}),d.on("click",function(e){e.cancelBubble=!0,e.stopPropagation(),h.toggleCollapsingNodes(t)});var p=v("<li></li>").appendTo(y);h._create(p,{itemHeight:u.itemHeight,props:u.props,propsExpanded:u.propsExpanded,nodes:t.nodes},f+1),t.expanded||p.addClass(["collapsed"])}}),!0},e.prototype.getProp=function(e,t){return t&&t[e]},e.prototype.getNodeProp=function(e,t,o){var n=o&&this.getProp(e,o.expanded?o.propsExpanded:o.props);return(void 0===n||t&&null===n)&&(n=this.getProp(e,o&&o.expanded?this.options.propsExpanded:this.options.props)),n},e.defaults={itemHeight:"43px",borderColor:"#e1e4e9",multiSelect:!1,props:{textSize:"inherit",textColor:"inherit",icon:"fa fa-folder",iconExpand:"fa fa-angle-down",iconSize:"inherit",iconColor:"inherit",iconExpandSize:"inherit",iconExpandColor:"inherit"},propsExpanded:{textSize:"inherit",textColor:"inherit",icon:"fa fa-folder-open",iconExpand:"fa fa-angle-up",iconSize:"inherit",iconColor:"inherit",iconExpandSize:"inherit",iconExpandColor:"inherit"},nodes:[]},e}(l.Widget);t.FolderTree=r});t(n);n.FolderTree;var r=o(function(e,t){var n,r=i&&i.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),s=i&&i.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(t){function o(){var e=null!==t&&t.apply(this,arguments)||this;return e._contentPanel=null,e._selectedNodes=[],e._nodeMap={},e}return r(o,t),o.prototype.getNodes=function(e){var t,o;if("string"==typeof e)return this._nodeMap[e]||[];if(e instanceof RegExp){var n=[];for(var r in this._nodeMap)if(e.test(r))try{for(var i=s(this._nodeMap[r]),l=i.next();!l.done;l=i.next()){var a=l.value;n.push(a)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(o=i.return)&&o.call(i)}finally{if(t)throw t.error}}return n}return e?[e]:[]},o.prototype.toggleSelectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=s(n),i=r.next();!i.done;i=r.next()){var l=i.value;this._selectNode(l,!l.selected)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}1<this._selectedNodes.length&&(this.options.multiSelect=!0)},o.prototype.selectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=s(n),i=r.next();!i.done;i=r.next()){var l=i.value;l.selected||this._selectNode(l,!0)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}1<this._selectedNodes.length&&(this.options.multiSelect=!0)},o.prototype.deselectNodes=function(e){var t,o,n=this.getNodes(e);try{for(var r=s(n),i=r.next();!i.done;i=r.next()){var l=i.value;l.selected&&this._selectNode(l,!1)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}},o.prototype.setData=function(e){this.options=jQuery.extend({},o.defaults,e),this._init()},o.prototype._init=function(){this._contentPanel||(this._contentPanel=v("<div></div>").appendTo(this.$el).addClass(["gridview-container"]),this.options.borderColor&&this._contentPanel.css({borderColor:this.options.borderColor})),this._create(this._contentPanel,this.options),1<this._selectedNodes.length&&(this.options.multiSelect=!0)},o.prototype._selectNode=function(e,t){if(e.selected=t,e.element&&(t?e.element&&e.element.addClass(["active"]):e.element&&e.element.removeClass(["active"])),t&&this._selectedNodes.indexOf(e)<0)this._selectedNodes.push(e);else if(!t){var o=this._selectedNodes.indexOf(e);0<=o&&this._selectedNodes.splice(o,1)}},o.prototype._create=function(e,t){var a=this;e.empty();var s=v("<div></div>").appendTo(e).css({display:"flex",flexWrap:"wrap",flexDirection:"row",width:"100%"});return t.nodes.forEach(function(e,t){var o=a._nodeMap[e.id]||[];o.push(e),a._nodeMap[e.id]=o;var n=e.element=v("<a></a>").appendTo(s).css({display:"block",margin:"15px",width:a.options.itemMinWidth}).on("click",function(){a.$el.trigger("itemclick",e)});a._selectNode(e,!!e.selected);var r=v("<div></div>").appendTo(n).css({position:"relative",display:"block",width:"100%",minHeight:a.options.itemMinHeight}),i=v("<img/>").appendTo(r).css({width:a.options.itemMinWidth,height:a.options.itemMinHeight});e.thumbUrl&&i.attr("src",e.thumbUrl);var l=v("<div></div>").appendTo(n).css({width:"100%"});v("<p></p>").appendTo(l).css({textAlign:"center",wordBreak:"normal",whiteSpace:"pre-wrap",wordWrap:"break-word",fontSize:a.getNodeProp("textSize"),color:a.getNodeProp("textColor")}).html(e.text)}),!0},o.prototype.getProp=function(e,t){return t&&t[e]},o.prototype.getNodeProp=function(e,t,o){var n=o&&this.getProp(e,o.selected?o.propsSelected:o.props);return(void 0===n||t&&null===n)&&(n=this.getProp(e,o&&o.selected?this.options.propsSelected:this.options.props)),n},o.defaults={itemMinHeight:"128px",itemMaxHeight:"none",itemMinWidth:"128px",itemMaxWidth:"none",borderColor:"#e1e4e9",multiSelect:!1,props:{textSize:"inherit",textColor:"inherit"},propsSelected:{textSize:"inherit",textColor:"inherit"},nodes:[]},o}(l.Widget);t.GridView=o});t(r);r.GridView;var a=o(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.FolderTree=n.FolderTree,t.GridView=r.GridView,t.Widget=l.Widget});t(a);a.FolderTree,a.GridView,a.Widget;t(o(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),a.Widget.register(a.FolderTree,"folderTree"),a.Widget.register(a.GridView,"gridView")}));var c=o(function(e,t){var n=i&&i.__awaiter||function(i,l,a,s){return new(a||(a=Promise))(function(e,t){function o(e){try{r(s.next(e))}catch(e){t(e)}}function n(e){try{r(s.throw(e))}catch(e){t(e)}}function r(t){t.done?e(t.value):new a(function(e){e(t.value)}).then(o,n)}r((s=s.apply(i,l||[])).next())})},l=i&&i.__generator||function(o,n){var r,i,l,e,a={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,i&&(l=2&t[0]?i.return:t[0]?i.throw||((l=i.return)&&l.call(i),0):i.next)&&!(l=l.call(i,t[1])).done)return l;switch(i=0,l&&(t=[2&t[0],l.value]),t[0]){case 0:case 1:l=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(l=0<(l=a.trys).length&&l[l.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!l||t[1]>l[0]&&t[1]<l[3])){a.label=t[1];break}if(6===t[0]&&a.label<l[1]){a.label=l[1],l=t;break}if(l&&a.label<l[2]){a.label=l[2],a.ops.push(t);break}l[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(o,a)}catch(e){t=[6,e],i=0}finally{r=l=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}};Object.defineProperty(t,"__esModule",{value:!0});t.ajaxRequest=function(o){return n(this,void 0,void 0,function(){return l(this,function(e){return[2,new Promise(function(t,n){var e=v.extend(!1,{},o);e.success=function(e){t(e)},e.error=function(e,t,o){n(t)},v.ajax(e)})]})})};t.uploadFileAjax=function(o,r,i){return n(this,void 0,void 0,function(){return l(this,function(e){return[2,new Promise(function(t,n){if(o.files&&1===o.files.length){var e=new FormData;e.append(r,o.files[0]),v.ajax({url:i,type:"POST",data:e,contentType:!1,processData:!1,success:function(e){t(e)},error:function(e,t,o){n(t)}})}else n("No file to upload")})]})})}});t(c);c.ajaxRequest,c.uploadFileAjax;var s=o(function(e,t){var o=i&&i.__awaiter||function(i,l,a,s){return new(a||(a=Promise))(function(e,t){function o(e){try{r(s.next(e))}catch(e){t(e)}}function n(e){try{r(s.throw(e))}catch(e){t(e)}}function r(t){t.done?e(t.value):new a(function(e){e(t.value)}).then(o,n)}r((s=s.apply(i,l||[])).next())})},s=i&&i.__generator||function(o,n){var r,i,l,e,a={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,i&&(l=2&t[0]?i.return:t[0]?i.throw||((l=i.return)&&l.call(i),0):i.next)&&!(l=l.call(i,t[1])).done)return l;switch(i=0,l&&(t=[2&t[0],l.value]),t[0]){case 0:case 1:l=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(l=0<(l=a.trys).length&&l[l.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!l||t[1]>l[0]&&t[1]<l[3])){a.label=t[1];break}if(6===t[0]&&a.label<l[1]){a.label=l[1],l=t;break}if(l&&a.label<l[2]){a.label=l[2],a.ops.push(t);break}l[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(o,a)}catch(e){t=[6,e],i=0}finally{r=l=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},d=i&&i.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}};Object.defineProperty(t,"__esModule",{value:!0}),t.landing_setup=function(){!function(){o(this,void 0,void 0,function(){var t,o,n,r,i,l,a;return s(this,function(e){switch(e.label){case 0:return n={itemMinWidth:"100px",itemMaxWidth:"100px",itemMinHeight:"100px",nodes:[]},[4,c.ajaxRequest({url:"/api/trust/public_rooms",type:"get"})];case 1:r=e.sent();try{for(i=d(r.data),l=i.next();!l.done;l=i.next())a=l.value,n.nodes.push({text:a.name,id:"room-"+a.id,thumbUrl:"/images/default.jpg"})}catch(e){t={error:e}}finally{try{l&&!l.done&&(o=i.return)&&o.call(i)}finally{if(t)throw t.error}}return v("#room-grid-view").gridView(n),[2]}})})}()}}),d=t(s),p=s.landing_setup;e.default=d,e.landing_setup=p,Object.defineProperty(e,"__esModule",{value:!0})});
