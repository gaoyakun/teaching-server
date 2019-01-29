(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.landing = {}),global.jQuery));
}(this, (function (exports,jquery) { 'use strict';

	jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var widget = createCommonjsModule(function (module, exports) {
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var Widget = /** @class */ (function () {
	    function Widget(el, options) {
	        this.$el = jQuery(el);
	        var defaults = this.constructor.defaults;
	        this.options = jQuery.extend({}, defaults, options);
	    }
	    Widget.register = function (widgetClass, widgetName) {
	        var getDataKey = function () { return "widget_" + widgetName; };
	        function getWidgetData(el, dataKey) {
	            var widget = jQuery.data(el, dataKey);
	            return widget && widget instanceof Widget ? widget : null;
	        }
	        function createWidget($el, options) {
	            var e_1, _a;
	            var dataKey = getDataKey();
	            try {
	                for (var _b = __values($el.get()), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var el = _c.value;
	                    var existingWidget = getWidgetData(el, dataKey);
	                    if (!existingWidget) {
	                        var widget = new widgetClass(el, options);
	                        if (!jQuery.data(el, dataKey)) {
	                            jQuery.data(el, dataKey, widget);
	                        }
	                        widget._init();
	                    }
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            return $el;
	        }
	        function destroyWidget($el) {
	            var e_2, _a;
	            var dataKey = getDataKey();
	            try {
	                for (var _b = __values($el.get()), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var el = _c.value;
	                    var widget = getWidgetData(el, dataKey);
	                    if (widget) {
	                        widget.destroy();
	                    }
	                    jQuery.removeData(el, dataKey);
	                }
	            }
	            catch (e_2_1) { e_2 = { error: e_2_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_2) throw e_2.error; }
	            }
	        }
	        function callFunction($el, functionName, args) {
	            var e_3, _a;
	            var result = null;
	            try {
	                for (var _b = __values($el.get()), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var el = _c.value;
	                    var widget = jQuery.data(el, getDataKey());
	                    if (widget && widget instanceof Widget) {
	                        var func = widget[functionName];
	                        if (func && typeof func === 'function') {
	                            result = func.apply(widget, args);
	                        }
	                    }
	                }
	            }
	            catch (e_3_1) { e_3 = { error: e_3_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_3) throw e_3.error; }
	            }
	            return result;
	        }
	        jQuery.fn[widgetName] = function (arg1) {
	            var args = [];
	            for (var _i = 1; _i < arguments.length; _i++) {
	                args[_i - 1] = arguments[_i];
	            }
	            var $el = this;
	            if (arg1 === undefined || typeof arg1 === 'object') {
	                var options = arg1;
	                return createWidget($el, options);
	            }
	            else if (typeof arg1 === 'string' && arg1[0] !== '_') {
	                var func = arg1;
	                if (func === 'destroy') {
	                    return destroyWidget($el);
	                }
	                else if (func === 'getWidgetClass') {
	                    return widgetClass;
	                }
	                else {
	                    return callFunction($el, func, args);
	                }
	            }
	        };
	    };
	    Widget.prototype.destroy = function () {
	        this._deinit();
	    };
	    Widget.prototype._init = function () {
	        //
	    };
	    Widget.prototype._deinit = function () {
	        //
	    };
	    Widget.defaults = {};
	    return Widget;
	}());
	exports.Widget = Widget;

	});

	unwrapExports(widget);
	var widget_1 = widget.Widget;

	var folder_tree = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });


	var FolderTree = /** @class */ (function (_super) {
	    __extends(FolderTree, _super);
	    function FolderTree() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._contentPanel = null;
	        _this._selectedNodes = [];
	        _this._nodeMap = {};
	        return _this;
	    }
	    FolderTree.prototype.getNodes = function (id) {
	        var e_1, _a;
	        if (typeof id === 'string') {
	            return this._nodeMap[id] || [];
	        }
	        else if (id instanceof RegExp) {
	            var result = [];
	            for (var key in this._nodeMap) {
	                if (id.test(key)) {
	                    try {
	                        for (var _b = __values(this._nodeMap[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            var node = _c.value;
	                            result.push(node);
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                }
	            }
	            return result;
	        }
	        else if (id) {
	            return [id];
	        }
	        else {
	            return [];
	        }
	    };
	    FolderTree.prototype.toggleSelectNodes = function (id) {
	        var e_2, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
	                var node = nodes_1_1.value;
	                this._selectNode(node, !node.selected);
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    FolderTree.prototype.selectNodes = function (id) {
	        var e_3, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_2 = __values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
	                var node = nodes_2_1.value;
	                if (!node.selected) {
	                    this._selectNode(node, true);
	                }
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    FolderTree.prototype.deselectNodes = function (id) {
	        var e_4, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_3 = __values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
	                var node = nodes_3_1.value;
	                if (node.selected) {
	                    this._selectNode(node, false);
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	    };
	    FolderTree.prototype.toggleCollapsingNodes = function (id) {
	        this._toggleCollapsingNodes(this.getNodes(id));
	    };
	    FolderTree.prototype.collapseNodes = function (id) {
	        this._toggleCollapsingNodes(this.getNodes(id).filter(function (node, index, array) { return !!node.expanded; }));
	    };
	    FolderTree.prototype.expandNodes = function (id) {
	        this._toggleCollapsingNodes(this.getNodes(id).filter(function (node, index, array) { return !node.expanded; }));
	    };
	    FolderTree.prototype._init = function () {
	        var that = this;
	        this.$el.off('itemclick');
	        this.$el.on('itemclick', function (evt, node) {
	            console.log('internal');
	            if (that.options.multiSelect) {
	                that.toggleSelectNodes(node);
	            }
	            else {
	                that.deselectNodes(/^.*$/);
	                that.selectNodes(node);
	            }
	        });
	        this._contentPanel = jquery('<div></div>').appendTo(this.$el).addClass(['folder-tree-container']);
	        if (this.options.borderColor) {
	            this._contentPanel.css({
	                borderColor: this.options.borderColor
	            });
	        }
	        this._create(this._contentPanel, this.options, 0);
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    FolderTree.prototype._selectNode = function (node, select) {
	        node.selected = select;
	        if (node.element) {
	            if (select) {
	                node.element && node.element.addClass(['active']);
	            }
	            else {
	                node.element && node.element.removeClass(['active']);
	            }
	        }
	        if (select && this._selectedNodes.indexOf(node) < 0) {
	            this._selectedNodes.push(node);
	        }
	        else if (!select) {
	            var idx = this._selectedNodes.indexOf(node);
	            if (idx >= 0) {
	                this._selectedNodes.splice(idx, 1);
	            }
	        }
	    };
	    FolderTree.prototype._toggleCollapsingNodes = function (nodes) {
	        var e_5, _a;
	        try {
	            for (var nodes_4 = __values(nodes), nodes_4_1 = nodes_4.next(); !nodes_4_1.done; nodes_4_1 = nodes_4.next()) {
	                var node = nodes_4_1.value;
	                if (!node.element || !node.nodes || node.nodes.length === 0) {
	                    continue;
	                }
	                var i = node.element.find('>a>a>i');
	                i.removeClass(this.getNodeProp('iconExpand', true, node).split(' '));
	                var fi = node.element.find('>a>span>i');
	                var iconClass = this.getNodeProp('icon', true, node);
	                if (iconClass) {
	                    fi.removeClass(iconClass.split(' '));
	                }
	                node.expanded = !node.expanded;
	                i.addClass(this.getNodeProp('iconExpand', true, node).split(' '));
	                iconClass = this.getNodeProp('icon', true, node);
	                if (iconClass) {
	                    fi.addClass(iconClass.split(' '));
	                }
	                if (node.expanded) {
	                    node.element.next().removeClass(['collapsed']);
	                }
	                else {
	                    node.element.next().addClass(['collapsed']);
	                }
	            }
	        }
	        catch (e_5_1) { e_5 = { error: e_5_1 }; }
	        finally {
	            try {
	                if (nodes_4_1 && !nodes_4_1.done && (_a = nodes_4.return)) _a.call(nodes_4);
	            }
	            finally { if (e_5) throw e_5.error; }
	        }
	    };
	    FolderTree.prototype._create = function (container, treeData, indent) {
	        var _this = this;
	        container.empty();
	        var ul = jquery('<ul></ul>').appendTo(container);
	        treeData.nodes.forEach(function (node, index) {
	            var nodelist = _this._nodeMap[node.id] || [];
	            nodelist.push(node);
	            _this._nodeMap[node.id] = nodelist;
	            var indentValue = indent + "rem";
	            var li = jquery('<li></li>').appendTo(ul);
	            node.element = li;
	            _this._selectNode(node, !!node.selected);
	            var entry = jquery('<a></a>').appendTo(li);
	            entry.css({
	                fontSize: _this.getNodeProp('textSize', true, node),
	                color: _this.getNodeProp('textColor', true, node),
	                paddingLeft: indentValue
	            });
	            if (typeof treeData.itemHeight === 'string') {
	                entry.css({
	                    height: treeData.itemHeight,
	                    lineHeight: treeData.itemHeight
	                });
	            }
	            entry.on('click', function () {
	                _this.$el.trigger('itemclick', node);
	            });
	            var span = jquery('<span></span>').appendTo(entry);
	            var icon = _this.getNodeProp('icon', false, node);
	            if (typeof icon === 'string') {
	                jquery('<i></i>').appendTo(span).addClass(icon.split(' ')).css({
	                    color: _this.getNodeProp('iconColor', true, node),
	                    fontSize: _this.getNodeProp('iconSize', true, node)
	                }).after(node.text);
	            }
	            else {
	                var dummyIcon = _this.getNodeProp('icon', true, node) || 'fa fa-folder';
	                jquery('<i></i>').appendTo(span).addClass(dummyIcon.split(' ')).css({
	                    color: 'rgba(0,0,0,0)',
	                    fontSize: _this.getNodeProp('iconSize', true, node)
	                }).after(node.text);
	            }
	            if (node.nodes && node.nodes.length > 0) {
	                var btnExpand = jquery('<a></a>').appendTo(entry);
	                btnExpand.attr('href', 'javascript:void(0)');
	                var iconExpand = _this.getNodeProp('iconExpand', true, node);
	                var i = jquery('<i></i>').appendTo(btnExpand);
	                i.addClass(iconExpand.split(' ')).css({
	                    color: _this.getNodeProp('iconExpandColor', true, node),
	                    fontSize: _this.getNodeProp('iconExpandSize', true, node)
	                });
	                btnExpand.on('click', function (e) {
	                    e.cancelBubble = true;
	                    e.stopPropagation();
	                    _this.toggleCollapsingNodes(node);
	                });
	                var liSub = jquery('<li></li>').appendTo(ul);
	                _this._create(liSub, {
	                    itemHeight: treeData.itemHeight,
	                    props: treeData.props,
	                    propsExpanded: treeData.propsExpanded,
	                    nodes: node.nodes
	                }, indent + 1);
	                if (!node.expanded) {
	                    liSub.addClass(['collapsed']);
	                }
	            }
	        });
	        return true;
	    };
	    FolderTree.prototype.getProp = function (name, props) {
	        return props && props[name];
	    };
	    FolderTree.prototype.getNodeProp = function (name, force, node) {
	        var prop = node && this.getProp(name, node.expanded ? node.propsExpanded : node.props);
	        if (prop === undefined || (force && prop === null)) {
	            prop = this.getProp(name, node && node.expanded ? this.options.propsExpanded : this.options.props);
	        }
	        return prop;
	    };
	    FolderTree.defaults = {
	        itemHeight: '43px',
	        borderColor: '#e1e4e9',
	        multiSelect: false,
	        props: {
	            textSize: 'inherit',
	            textColor: 'inherit',
	            icon: 'fa fa-folder',
	            iconExpand: 'fa fa-angle-down',
	            iconSize: 'inherit',
	            iconColor: 'inherit',
	            iconExpandSize: 'inherit',
	            iconExpandColor: 'inherit'
	        },
	        propsExpanded: {
	            textSize: 'inherit',
	            textColor: 'inherit',
	            icon: 'fa fa-folder-open',
	            iconExpand: 'fa fa-angle-up',
	            iconSize: 'inherit',
	            iconColor: 'inherit',
	            iconExpandSize: 'inherit',
	            iconExpandColor: 'inherit'
	        },
	        nodes: []
	    };
	    return FolderTree;
	}(widget.Widget));
	exports.FolderTree = FolderTree;

	});

	unwrapExports(folder_tree);
	var folder_tree_1 = folder_tree.FolderTree;

	var grid_view = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });


	var GridView = /** @class */ (function (_super) {
	    __extends(GridView, _super);
	    function GridView() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._contentPanel = null;
	        _this._selectedNodes = [];
	        _this._nodeMap = {};
	        return _this;
	    }
	    GridView.prototype.getNodes = function (id) {
	        var e_1, _a;
	        if (typeof id === 'string') {
	            return this._nodeMap[id] || [];
	        }
	        else if (id instanceof RegExp) {
	            var result = [];
	            for (var key in this._nodeMap) {
	                if (id.test(key)) {
	                    try {
	                        for (var _b = __values(this._nodeMap[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            var node = _c.value;
	                            result.push(node);
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                }
	            }
	            return result;
	        }
	        else if (id) {
	            return [id];
	        }
	        else {
	            return [];
	        }
	    };
	    GridView.prototype.toggleSelectNodes = function (id) {
	        var e_2, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
	                var node = nodes_1_1.value;
	                this._selectNode(node, !node.selected);
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    GridView.prototype.selectNodes = function (id) {
	        var e_3, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_2 = __values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
	                var node = nodes_2_1.value;
	                if (!node.selected) {
	                    this._selectNode(node, true);
	                }
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    GridView.prototype.deselectNodes = function (id) {
	        var e_4, _a;
	        var nodes = this.getNodes(id);
	        try {
	            for (var nodes_3 = __values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
	                var node = nodes_3_1.value;
	                if (node.selected) {
	                    this._selectNode(node, false);
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	    };
	    GridView.prototype.setData = function (data) {
	        this.options = jQuery.extend({}, GridView.defaults, data);
	        this._init();
	    };
	    GridView.prototype._init = function () {
	        if (!this._contentPanel) {
	            this._contentPanel = jquery('<div></div>').appendTo(this.$el).addClass(['gridview-container']);
	            if (this.options.borderColor) {
	                this._contentPanel.css({
	                    borderColor: this.options.borderColor
	                });
	            }
	        }
	        this._create(this._contentPanel, this.options);
	        if (this._selectedNodes.length > 1) {
	            this.options.multiSelect = true;
	        }
	    };
	    GridView.prototype._selectNode = function (node, select) {
	        node.selected = select;
	        if (node.element) {
	            if (select) {
	                node.element && node.element.addClass(['active']);
	            }
	            else {
	                node.element && node.element.removeClass(['active']);
	            }
	        }
	        if (select && this._selectedNodes.indexOf(node) < 0) {
	            this._selectedNodes.push(node);
	        }
	        else if (!select) {
	            var idx = this._selectedNodes.indexOf(node);
	            if (idx >= 0) {
	                this._selectedNodes.splice(idx, 1);
	            }
	        }
	    };
	    GridView.prototype._create = function (container, treeData) {
	        var _this = this;
	        container.empty();
	        var gridContainer = jquery('<div></div>').appendTo(container).css({
	            display: 'flex',
	            flexWrap: 'wrap',
	            flexDirection: 'row',
	            width: '100%'
	        });
	        treeData.nodes.forEach(function (node, index) {
	            var nodelist = _this._nodeMap[node.id] || [];
	            nodelist.push(node);
	            _this._nodeMap[node.id] = nodelist;
	            var item = node.element = jquery('<a></a>').appendTo(gridContainer).css({
	                display: 'block',
	                margin: '15px',
	                width: _this.options.itemMinWidth
	            }).on('click', function () {
	                _this.$el.trigger('itemclick', node);
	            });
	            _this._selectNode(node, !!node.selected);
	            var body = jquery('<div></div>').appendTo(item).css({
	                position: 'relative',
	                display: 'block',
	                width: '100%',
	                minHeight: _this.options.itemMinHeight
	            });
	            var img = jquery('<img/>').appendTo(body).css({
	                width: _this.options.itemMinWidth,
	                height: _this.options.itemMinHeight
	            });
	            if (node.thumbUrl) {
	                img.attr('src', node.thumbUrl);
	            }
	            var footer = jquery('<div></div>').appendTo(item).css({
	                width: '100%'
	            });
	            var desc = jquery('<p></p>').appendTo(footer).css({
	                textAlign: 'center',
	                wordBreak: 'normal',
	                whiteSpace: 'pre-wrap',
	                wordWrap: 'break-word',
	                fontSize: _this.getNodeProp('textSize'),
	                color: _this.getNodeProp('textColor')
	            }).html(node.text);
	        });
	        return true;
	    };
	    GridView.prototype.getProp = function (name, props) {
	        return props && props[name];
	    };
	    GridView.prototype.getNodeProp = function (name, force, node) {
	        var prop = node && this.getProp(name, node.selected ? node.propsSelected : node.props);
	        if (prop === undefined || (force && prop === null)) {
	            prop = this.getProp(name, node && node.selected ? this.options.propsSelected : this.options.props);
	        }
	        return prop;
	    };
	    GridView.defaults = {
	        itemMinHeight: '128px',
	        itemMaxHeight: 'none',
	        itemMinWidth: '128px',
	        itemMaxWidth: 'none',
	        borderColor: '#e1e4e9',
	        multiSelect: false,
	        props: {
	            textSize: 'inherit',
	            textColor: 'inherit',
	        },
	        propsSelected: {
	            textSize: 'inherit',
	            textColor: 'inherit',
	        },
	        nodes: []
	    };
	    return GridView;
	}(widget.Widget));
	exports.GridView = GridView;

	});

	unwrapExports(grid_view);
	var grid_view_1 = grid_view.GridView;

	var mod_ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.FolderTree = folder_tree.FolderTree;

	exports.GridView = grid_view.GridView;

	exports.Widget = widget.Widget;

	});

	unwrapExports(mod_ui);
	var mod_ui_1 = mod_ui.FolderTree;
	var mod_ui_2 = mod_ui.GridView;
	var mod_ui_3 = mod_ui.Widget;

	var ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	(function () {
	    mod_ui.Widget.register(mod_ui.FolderTree, 'folderTree');
	    mod_ui.Widget.register(mod_ui.GridView, 'gridView');
	})();

	});

	unwrapExports(ui);

	var mod_tools = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var ajaxRequest = function (options) {
	    return __awaiter(this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            return [2 /*return*/, new Promise(function (resolve, reject) {
	                    var opt = jquery.extend(false, {}, options);
	                    opt.success = function (response) {
	                        resolve(response);
	                    };
	                    opt.error = function (xhr, msg, err) {
	                        reject(msg);
	                    };
	                    jquery.ajax(opt);
	                })];
	        });
	    });
	};
	exports.ajaxRequest = ajaxRequest;
	var uploadBlobAjax = function (blob, name, url) {
	    return __awaiter(this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            return [2 /*return*/, new Promise(function (resolve, reject) {
	                    if (blob) {
	                        var formData = new FormData();
	                        formData.append(name, blob);
	                        jquery.ajax({
	                            url: url,
	                            type: 'POST',
	                            data: formData,
	                            contentType: false,
	                            processData: false,
	                            success: function (response) {
	                                resolve(response);
	                            },
	                            error: function (xhr, msg, err) {
	                                reject(msg);
	                            }
	                        });
	                    }
	                    else {
	                        reject('No Data to upload');
	                    }
	                })];
	        });
	    });
	};
	var uploadFileAjax = function (el, name, url) {
	    return __awaiter(this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    if (!el.files) return [3 /*break*/, 2];
	                    return [4 /*yield*/, uploadBlobAjax(el.files[0], name, url)];
	                case 1:
	                    _a.sent();
	                    _a.label = 2;
	                case 2: return [2 /*return*/];
	            }
	        });
	    });
	};
	exports.uploadFileAjax = uploadFileAjax;
	var convertDataURLToBlob = function (dataURL) {
	    var groups = dataURL.split(',');
	    var type = groups[0].split(';')[0].split(':')[1];
	    var bytes = window.atob(groups[1]);
	    var ab = new ArrayBuffer(bytes.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < bytes.length; i++) {
	        ia[i] = bytes.charCodeAt(i);
	    }
	    return new Blob([ab], { type: type });
	};
	exports.convertDataURLToBlob = convertDataURLToBlob;

	});

	unwrapExports(mod_tools);
	var mod_tools_1 = mod_tools.ajaxRequest;
	var mod_tools_2 = mod_tools.uploadFileAjax;
	var mod_tools_3 = mod_tools.convertDataURLToBlob;

	var landing = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	function landing_setup() {
	    (function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var e_1, _a, roomData, roomList, _b, _c, room;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        roomData = {
	                            itemMinWidth: '100px',
	                            itemMaxWidth: '100px',
	                            itemMinHeight: '100px',
	                            nodes: []
	                        };
	                        return [4 /*yield*/, mod_tools.ajaxRequest({
	                                url: '/api/trust/public_rooms',
	                                type: 'get'
	                            })];
	                    case 1:
	                        roomList = _d.sent();
	                        try {
	                            for (_b = __values(roomList.data), _c = _b.next(); !_c.done; _c = _b.next()) {
	                                room = _c.value;
	                                roomData.nodes.push({
	                                    text: room.name,
	                                    id: "room-" + room.id,
	                                    roomId: room.id,
	                                    thumbUrl: '/images/default.jpg'
	                                });
	                            }
	                        }
	                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                        finally {
	                            try {
	                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                            }
	                            finally { if (e_1) throw e_1.error; }
	                        }
	                        jquery('#room-grid-view').gridView(roomData);
	                        jquery('#room-grid-view').on('itemclick', function (evt, node) {
	                            return __awaiter(this, void 0, void 0, function () {
	                                return __generator(this, function (_a) {
	                                    window.location.href = "/trust/publish_room?room_id=" + node.roomId;
	                                    return [2 /*return*/];
	                                });
	                            });
	                        });
	                        return [2 /*return*/];
	                }
	            });
	        });
	    })();
	}
	exports.landing_setup = landing_setup;

	});

	var landing$1 = unwrapExports(landing);
	var landing_1 = landing.landing_setup;

	exports.default = landing$1;
	exports.landing_setup = landing_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
