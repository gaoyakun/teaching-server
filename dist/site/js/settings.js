(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.settings = {}),global.jQuery));
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
	                    if (existingWidget) {
	                        existingWidget.destroy();
	                    }
	                    var widget = new widgetClass(el, options);
	                    if (!jQuery.data(el, dataKey)) {
	                        jQuery.data(el, dataKey, widget);
	                    }
	                    widget._init();
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

	var toolbar = createCommonjsModule(function (module, exports) {
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


	var Toolbar = /** @class */ (function (_super) {
	    __extends(Toolbar, _super);
	    function Toolbar(el, options) {
	        var _this = _super.call(this, el, options) || this;
	        _this._newClassList = [];
	        return _this;
	    }
	    Toolbar.prototype.clear = function () {
	        this.$el.empty();
	    };
	    Toolbar.prototype.trigger = function (id, event) {
	        this.$el.find('a').each(function () {
	            var data = jquery(this).data('tool');
	            if (data && data.id === id) {
	                jquery(this).find('>div').trigger(event);
	            }
	        });
	    };
	    Toolbar.prototype._init = function () {
	        var e_1, _a;
	        try {
	            for (var _b = __values(['p-0', 'toolbar']), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var cls = _c.value;
	                if (!this.$el.hasClass(cls)) {
	                    this.$el.addClass(cls);
	                    this._newClassList.push(cls);
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
	        for (var groupName in this.options.groups) {
	            var group = this.options.groups[groupName];
	            var groupDiv = jquery('<div></div>').addClass(['btn-group']).attr('role', 'group').appendTo(this.$el);
	            for (var i = 0; i < group.tools.length; i++) {
	                this.createToolButton(groupDiv, group, i);
	            }
	            jquery('<div></div>').addClass('toolbar-seperator').appendTo(this.$el);
	        }
	    };
	    Toolbar.prototype._deinit = function () {
	        this.$el.empty();
	        this.$el.removeClass(this._newClassList);
	        this._newClassList = [];
	    };
	    Toolbar.prototype.createToolButton = function (groupDiv, group, index) {
	        var that = this;
	        var tool = group.tools[index];
	        if (tool.type !== 'radio' && tool.type !== 'check') {
	            tool.type = 'button';
	        }
	        if (!tool.radioGroup) {
	            tool.radioGroup = 0;
	        }
	        tool.active = false;
	        if (!tool.disabled && tool.subTools && tool.subTools.length > 0) {
	            tool.subIndex = 0;
	            tool.id = tool.subTools[0].id;
	            tool.icon = tool.subTools[0].icon;
	            tool.text = tool.subTools[0].text;
	            tool.callback = tool.subTools[0].callback;
	        }
	        var button = jquery('<a></a>').addClass('btn').appendTo(groupDiv);
	        button.data('tool', tool);
	        var attrType = 'tb-button-type';
	        var attrRadioGroup = 'tb-button-radio-group';
	        var attrActive = 'tb-button-active';
	        button.attr(attrType, tool.type);
	        button.attr(attrRadioGroup, tool.radioGroup);
	        tool.buttonCSS && button.css(tool.buttonCSS);
	        tool.disabled && button.addClass('no-pointer-events');
	        var clickDiv = jquery('<div></div>').css({
	            display: 'inline-block'
	        }).appendTo(button);
	        if (!tool.disabled) {
	            clickDiv.on('mouseenter', function () {
	                jquery(this.parentElement).addClass('selected');
	            });
	            clickDiv.on('mouseleave', function () {
	                if (jquery(this).attr(attrType) === 'button' || jquery(this).attr(attrActive) === undefined) {
	                    jquery(this.parentElement).removeClass('selected');
	                }
	            });
	            clickDiv.on('click', function (ev) {
	                ev.stopPropagation();
	                var btn = jquery(this.parentElement);
	                var data = btn.data('tool');
	                var type = btn.attr(attrType);
	                if (type !== 'button') {
	                    if (type === 'radio') {
	                        if (btn.attr(attrActive) === undefined) {
	                            var groupButtons = btn.siblings("a[" + attrRadioGroup + "=" + btn.attr(attrRadioGroup) + "][" + attrActive + "]");
	                            groupButtons.removeAttr(attrActive).removeClass('selected').each(function () {
	                                var thatData = jquery(this).data('tool');
	                                that.$el.trigger('itemdeselected', thatData.id);
	                                thatData.callback && thatData.callback.call(this, 'deselected');
	                            });
	                            btn.attr(attrActive, '').addClass('selected');
	                            that.$el.trigger('itemselected', data.id);
	                            data.callback && data.callback.call(this.parentElement, 'selected');
	                        }
	                    }
	                    else {
	                        if (btn.attr(attrActive) === undefined) {
	                            btn.attr(attrActive, '').addClass('selected');
	                            that.$el.trigger('itemselected', data.id);
	                            data.callback && data.callback.call(this.parentElement, 'selected');
	                        }
	                        else {
	                            btn.removeAttr(attrActive).removeClass('selected');
	                            that.$el.trigger('itemdeselected', data.id);
	                            data.callback && data.callback.call(this.parentElement, 'deselected');
	                        }
	                    }
	                }
	                else {
	                    that.$el.trigger('itemclick', data.id);
	                    data.callback && data.callback.call(this.parentElement);
	                }
	            });
	        }
	        tool.icon ? jquery('<img/>').attr({
	            src: tool.subTools && tool.subTools.length > 0 ? tool.subTools[0].icon : tool.icon,
	            width: this.options.iconWidth || 28,
	            height: this.options.iconHeight || 28
	        }).appendTo(clickDiv) : null;
	        tool.text ? jquery('<div></div>').addClass('small').html(tool.text).appendTo(clickDiv) : null;
	        if (tool.subTools && tool.subTools.length > 0) {
	            button.addClass(['dropdown-toggle', 'no-pointer-events']).attr('data-toggle', 'dropdown');
	            clickDiv.css({
	                pointerEvents: 'all'
	            });
	            var menu = jquery('<div></div>').addClass('dropdown-menu').appendTo(groupDiv);
	            for (var i = 0; i < tool.subTools.length; i++) {
	                var subTool = tool.subTools[i];
	                var subToolButton = jquery('<a></a>').addClass('dropdown-item').attr('sub-index', i).appendTo(menu);
	                subToolButton.data('tool', subTool);
	                if (subTool.id) {
	                    subToolButton.attr({ id: subTool.id });
	                }
	                if (subTool.menuCSS) {
	                    subToolButton.css(this.options.menuCSS);
	                }
	                subToolButton.on('click', function (ev) {
	                    var btn = jquery(this.parentElement).prev();
	                    var thatData = btn.data('tool');
	                    var thisData = jquery(this).data('tool');
	                    var index = Number(jquery(this).attr('sub-index'));
	                    if (thatData.type === 'button') {
	                        if (thatData.subIndex !== index) {
	                            thatData.subIndex = index;
	                            thatData.id = thisData.id;
	                            thatData.icon = thisData.icon;
	                            thatData.text = thisData.text;
	                            thatData.callback = thisData.callback;
	                            thatData.text && btn.find('>div>div').html(thatData.text);
	                            thatData.icon && btn.find('>div>img').attr('src', thatData.icon);
	                        }
	                        if (tool.callback) {
	                            tool.callback.call(btn[0]);
	                        }
	                        that.$el.trigger('itemclick', thatData.id);
	                    }
	                    else if (thatData.type === 'check') {
	                        var c = btn.find('>div');
	                        c.trigger('click');
	                        if (thatData.subIndex !== index) {
	                            thatData.subIndex = index;
	                            thatData.id = thisData.id;
	                            thatData.icon = thisData.icon;
	                            thatData.text = thisData.text;
	                            thatData.callback = thisData.callback;
	                            thatData.text && btn.find('>div>div').html(thatData.text);
	                            thatData.icon && btn.find('>div>img').attr('src', thatData.icon);
	                            c.trigger('click');
	                        }
	                    }
	                    else {
	                        var c = btn.find('>div');
	                        if (btn.attr(attrActive) === undefined) {
	                            if (thatData.subIndex !== index) {
	                                thatData.subIndex = index;
	                                thatData.id = thisData.id;
	                                thatData.icon = thisData.icon;
	                                thatData.text = thisData.text;
	                                thatData.callback = thisData.callback;
	                                thatData.text && btn.find('>div>div').html(thatData.text);
	                                thatData.icon && btn.find('>div>img').attr('src', thatData.icon);
	                            }
	                            c.trigger('click');
	                        }
	                        else if (thatData.subIndex !== index) {
	                            btn.removeAttr(attrActive).removeClass('selected');
	                            that.$el.trigger('itemdeselected', thatData.id);
	                            thatData.callback && thatData.callback.call(btn, 'deselected');
	                            thatData.subIndex = index;
	                            thatData.id = thisData.id;
	                            thatData.icon = thisData.icon;
	                            thatData.text = thisData.text;
	                            thatData.callback = thisData.callback;
	                            thatData.text && btn.find('>div>div').html(thatData.text);
	                            thatData.icon && btn.find('>div>img').attr('src', thatData.icon);
	                            c.trigger('click');
	                        }
	                    }
	                });
	                if (subTool.icon) {
	                    jquery('<img/>').attr({
	                        src: subTool.icon,
	                        width: this.options.menuIconWidth || 20,
	                        height: this.options.menuIconHeight || 20
	                    }).appendTo(subToolButton);
	                }
	                if (subTool.text) {
	                    jquery('<small></small>').addClass('ml-2').html(subTool.text).appendTo(subToolButton);
	                }
	            }
	        }
	        return button;
	    };
	    return Toolbar;
	}(widget.Widget));
	exports.Toolbar = Toolbar;

	});

	unwrapExports(toolbar);
	var toolbar_1 = toolbar.Toolbar;

	var chat_list = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });


	var ChatList = /** @class */ (function (_super) {
	    __extends(ChatList, _super);
	    function ChatList() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._numUsers = 0;
	        _this._users = {};
	        _this._$header = null;
	        _this._$users = null;
	        return _this;
	    }
	    ChatList.prototype.getNumUsers = function () {
	        return this._numUsers;
	    };
	    ChatList.prototype.addUser = function (user) {
	        if (this._users[user.id]) {
	            console.error("User " + user.id + " is already in room");
	        }
	        else {
	            this._users[user.id] = user;
	            var li = jquery('<li></li>').attr('user_id', user.id).appendTo(this._$users);
	            var divUser = jquery('<div></div>').addClass(['d-flex', 'flex-row', 'align-items-stretch']).css({
	                height: '100%'
	            }).appendTo(li);
	            jquery('<img/>').addClass('rounded-circle').attr('src', user.icon).appendTo(divUser);
	            var userPane = jquery('<div></div>').css({
	                marginLeft: '15px'
	            }).appendTo(divUser);
	            jquery('<span></span>').html(user.name).appendTo(userPane);
	            this._numUsers++;
	        }
	    };
	    ChatList.prototype.removeUser = function (id) {
	        if (this._users[id]) {
	            delete this._users[id];
	            this._$users.find("li[user_id=\"" + id + "\"]").remove();
	            this._numUsers--;
	        }
	    };
	    ChatList.prototype.clear = function () {
	        this._users = {};
	        this._numUsers = 0;
	        if (this._$users) {
	            this._$users.empty();
	        }
	        this._$header.html(this.options.name + "(" + this._numUsers + ")");
	    };
	    ChatList.prototype._init = function () {
	        var card = jquery('<div></div>').addClass(['card', 'bg-light', 'text-dard']).css('height', '100%').appendTo(this.$el);
	        this._$header = jquery('<div></div>').addClass('card-header').html(this.options.name + "(" + this._numUsers + ")").appendTo(card);
	        var body = jquery('<div></div>').addClass(['card-body', 'chat-list', 'p-0']).appendTo(card);
	        this._$users = jquery('<ul></ul>').appendTo(body);
	        /*
	        this.$el.addClass (['p-0', 'd-flex', 'flex-column', 'chat-list']);
	        const header = $('<div></div>').css ({
	            padding: '10px',
	            borderBottom: '1px solid #c4c4c4'
	        }).appendTo (this.$el);
	        this._$header = $('<p></p>').html(`${this.options.name}(${this._numUsers})`).appendTo(header);
	        const body = $('<div></div>').addClass ('flex-grow-1').appendTo(this.$el);
	        this._$users = $('<ul></ul>').appendTo(body);
	        */
	    };
	    return ChatList;
	}(widget.Widget));
	exports.ChatList = ChatList;

	});

	unwrapExports(chat_list);
	var chat_list_1 = chat_list.ChatList;

	var mod_ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.FolderTree = folder_tree.FolderTree;

	exports.GridView = grid_view.GridView;

	exports.Toolbar = toolbar.Toolbar;

	exports.ChatList = chat_list.ChatList;

	exports.Widget = widget.Widget;

	});

	unwrapExports(mod_ui);
	var mod_ui_1 = mod_ui.FolderTree;
	var mod_ui_2 = mod_ui.GridView;
	var mod_ui_3 = mod_ui.Toolbar;
	var mod_ui_4 = mod_ui.ChatList;
	var mod_ui_5 = mod_ui.Widget;

	var ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	(function () {
	    mod_ui.Widget.register(mod_ui.FolderTree, 'folderTree');
	    mod_ui.Widget.register(mod_ui.GridView, 'gridView');
	    mod_ui.Widget.register(mod_ui.Toolbar, 'toolbar');
	    mod_ui.Widget.register(mod_ui.ChatList, 'chatList');
	})();

	});

	unwrapExports(ui);

	var long_1 = Long;

	/**
	 * wasm optimizations, to do native i64 multiplication and divide
	 */
	var wasm = null;

	try {
	  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
	    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
	  ])), {}).exports;
	} catch (e) {
	  // no wasm support :(
	}

	/**
	 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
	 *  See the from* functions below for more convenient ways of constructing Longs.
	 * @exports Long
	 * @class A Long class for representing a 64 bit two's-complement integer value.
	 * @param {number} low The low (signed) 32 bits of the long
	 * @param {number} high The high (signed) 32 bits of the long
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @constructor
	 */
	function Long(low, high, unsigned) {

	    /**
	     * The low 32 bits as a signed value.
	     * @type {number}
	     */
	    this.low = low | 0;

	    /**
	     * The high 32 bits as a signed value.
	     * @type {number}
	     */
	    this.high = high | 0;

	    /**
	     * Whether unsigned or not.
	     * @type {boolean}
	     */
	    this.unsigned = !!unsigned;
	}

	Object.defineProperty(Long.prototype, "__isLong__", { value: true });

	/**
	 * @function
	 * @param {*} obj Object
	 * @returns {boolean}
	 * @inner
	 */
	function isLong(obj) {
	    return (obj && obj["__isLong__"]) === true;
	}

	/**
	 * Tests if the specified object is a Long.
	 * @function
	 * @param {*} obj Object
	 * @returns {boolean}
	 */
	Long.isLong = isLong;

	/**
	 * A cache of the Long representations of small integer values.
	 * @type {!Object}
	 * @inner
	 */
	var INT_CACHE = {};

	/**
	 * A cache of the Long representations of small unsigned integer values.
	 * @type {!Object}
	 * @inner
	 */
	var UINT_CACHE = {};

	/**
	 * @param {number} value
	 * @param {boolean=} unsigned
	 * @returns {!Long}
	 * @inner
	 */
	function fromInt(value, unsigned) {
	    var obj, cachedObj, cache;
	    if (unsigned) {
	        value >>>= 0;
	        if (cache = (0 <= value && value < 256)) {
	            cachedObj = UINT_CACHE[value];
	            if (cachedObj)
	                return cachedObj;
	        }
	        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
	        if (cache)
	            UINT_CACHE[value] = obj;
	        return obj;
	    } else {
	        value |= 0;
	        if (cache = (-128 <= value && value < 128)) {
	            cachedObj = INT_CACHE[value];
	            if (cachedObj)
	                return cachedObj;
	        }
	        obj = fromBits(value, value < 0 ? -1 : 0, false);
	        if (cache)
	            INT_CACHE[value] = obj;
	        return obj;
	    }
	}

	/**
	 * Returns a Long representing the given 32 bit integer value.
	 * @function
	 * @param {number} value The 32 bit integer in question
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {!Long} The corresponding Long value
	 */
	Long.fromInt = fromInt;

	/**
	 * @param {number} value
	 * @param {boolean=} unsigned
	 * @returns {!Long}
	 * @inner
	 */
	function fromNumber(value, unsigned) {
	    if (isNaN(value))
	        return unsigned ? UZERO : ZERO;
	    if (unsigned) {
	        if (value < 0)
	            return UZERO;
	        if (value >= TWO_PWR_64_DBL)
	            return MAX_UNSIGNED_VALUE;
	    } else {
	        if (value <= -TWO_PWR_63_DBL)
	            return MIN_VALUE;
	        if (value + 1 >= TWO_PWR_63_DBL)
	            return MAX_VALUE;
	    }
	    if (value < 0)
	        return fromNumber(-value, unsigned).neg();
	    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
	}

	/**
	 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
	 * @function
	 * @param {number} value The number in question
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {!Long} The corresponding Long value
	 */
	Long.fromNumber = fromNumber;

	/**
	 * @param {number} lowBits
	 * @param {number} highBits
	 * @param {boolean=} unsigned
	 * @returns {!Long}
	 * @inner
	 */
	function fromBits(lowBits, highBits, unsigned) {
	    return new Long(lowBits, highBits, unsigned);
	}

	/**
	 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
	 *  assumed to use 32 bits.
	 * @function
	 * @param {number} lowBits The low 32 bits
	 * @param {number} highBits The high 32 bits
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {!Long} The corresponding Long value
	 */
	Long.fromBits = fromBits;

	/**
	 * @function
	 * @param {number} base
	 * @param {number} exponent
	 * @returns {number}
	 * @inner
	 */
	var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

	/**
	 * @param {string} str
	 * @param {(boolean|number)=} unsigned
	 * @param {number=} radix
	 * @returns {!Long}
	 * @inner
	 */
	function fromString(str, unsigned, radix) {
	    if (str.length === 0)
	        throw Error('empty string');
	    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
	        return ZERO;
	    if (typeof unsigned === 'number') {
	        // For goog.math.long compatibility
	        radix = unsigned,
	        unsigned = false;
	    } else {
	        unsigned = !! unsigned;
	    }
	    radix = radix || 10;
	    if (radix < 2 || 36 < radix)
	        throw RangeError('radix');

	    var p;
	    if ((p = str.indexOf('-')) > 0)
	        throw Error('interior hyphen');
	    else if (p === 0) {
	        return fromString(str.substring(1), unsigned, radix).neg();
	    }

	    // Do several (8) digits each time through the loop, so as to
	    // minimize the calls to the very expensive emulated div.
	    var radixToPower = fromNumber(pow_dbl(radix, 8));

	    var result = ZERO;
	    for (var i = 0; i < str.length; i += 8) {
	        var size = Math.min(8, str.length - i),
	            value = parseInt(str.substring(i, i + size), radix);
	        if (size < 8) {
	            var power = fromNumber(pow_dbl(radix, size));
	            result = result.mul(power).add(fromNumber(value));
	        } else {
	            result = result.mul(radixToPower);
	            result = result.add(fromNumber(value));
	        }
	    }
	    result.unsigned = unsigned;
	    return result;
	}

	/**
	 * Returns a Long representation of the given string, written using the specified radix.
	 * @function
	 * @param {string} str The textual representation of the Long
	 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
	 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
	 * @returns {!Long} The corresponding Long value
	 */
	Long.fromString = fromString;

	/**
	 * @function
	 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
	 * @param {boolean=} unsigned
	 * @returns {!Long}
	 * @inner
	 */
	function fromValue(val, unsigned) {
	    if (typeof val === 'number')
	        return fromNumber(val, unsigned);
	    if (typeof val === 'string')
	        return fromString(val, unsigned);
	    // Throws for non-objects, converts non-instanceof Long:
	    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
	}

	/**
	 * Converts the specified value to a Long using the appropriate from* function for its type.
	 * @function
	 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {!Long}
	 */
	Long.fromValue = fromValue;

	// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
	// no runtime penalty for these.

	/**
	 * @type {number}
	 * @const
	 * @inner
	 */
	var TWO_PWR_16_DBL = 1 << 16;

	/**
	 * @type {number}
	 * @const
	 * @inner
	 */
	var TWO_PWR_24_DBL = 1 << 24;

	/**
	 * @type {number}
	 * @const
	 * @inner
	 */
	var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

	/**
	 * @type {number}
	 * @const
	 * @inner
	 */
	var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

	/**
	 * @type {number}
	 * @const
	 * @inner
	 */
	var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

	/**
	 * @type {!Long}
	 * @const
	 * @inner
	 */
	var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

	/**
	 * @type {!Long}
	 * @inner
	 */
	var ZERO = fromInt(0);

	/**
	 * Signed zero.
	 * @type {!Long}
	 */
	Long.ZERO = ZERO;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var UZERO = fromInt(0, true);

	/**
	 * Unsigned zero.
	 * @type {!Long}
	 */
	Long.UZERO = UZERO;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var ONE = fromInt(1);

	/**
	 * Signed one.
	 * @type {!Long}
	 */
	Long.ONE = ONE;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var UONE = fromInt(1, true);

	/**
	 * Unsigned one.
	 * @type {!Long}
	 */
	Long.UONE = UONE;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var NEG_ONE = fromInt(-1);

	/**
	 * Signed negative one.
	 * @type {!Long}
	 */
	Long.NEG_ONE = NEG_ONE;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

	/**
	 * Maximum signed value.
	 * @type {!Long}
	 */
	Long.MAX_VALUE = MAX_VALUE;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

	/**
	 * Maximum unsigned value.
	 * @type {!Long}
	 */
	Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

	/**
	 * @type {!Long}
	 * @inner
	 */
	var MIN_VALUE = fromBits(0, 0x80000000|0, false);

	/**
	 * Minimum signed value.
	 * @type {!Long}
	 */
	Long.MIN_VALUE = MIN_VALUE;

	/**
	 * @alias Long.prototype
	 * @inner
	 */
	var LongPrototype = Long.prototype;

	/**
	 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
	 * @returns {number}
	 */
	LongPrototype.toInt = function toInt() {
	    return this.unsigned ? this.low >>> 0 : this.low;
	};

	/**
	 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
	 * @returns {number}
	 */
	LongPrototype.toNumber = function toNumber() {
	    if (this.unsigned)
	        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
	    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
	};

	/**
	 * Converts the Long to a string written in the specified radix.
	 * @param {number=} radix Radix (2-36), defaults to 10
	 * @returns {string}
	 * @override
	 * @throws {RangeError} If `radix` is out of range
	 */
	LongPrototype.toString = function toString(radix) {
	    radix = radix || 10;
	    if (radix < 2 || 36 < radix)
	        throw RangeError('radix');
	    if (this.isZero())
	        return '0';
	    if (this.isNegative()) { // Unsigned Longs are never negative
	        if (this.eq(MIN_VALUE)) {
	            // We need to change the Long value before it can be negated, so we remove
	            // the bottom-most digit in this base and then recurse to do the rest.
	            var radixLong = fromNumber(radix),
	                div = this.div(radixLong),
	                rem1 = div.mul(radixLong).sub(this);
	            return div.toString(radix) + rem1.toInt().toString(radix);
	        } else
	            return '-' + this.neg().toString(radix);
	    }

	    // Do several (6) digits each time through the loop, so as to
	    // minimize the calls to the very expensive emulated div.
	    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
	        rem = this;
	    var result = '';
	    while (true) {
	        var remDiv = rem.div(radixToPower),
	            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
	            digits = intval.toString(radix);
	        rem = remDiv;
	        if (rem.isZero())
	            return digits + result;
	        else {
	            while (digits.length < 6)
	                digits = '0' + digits;
	            result = '' + digits + result;
	        }
	    }
	};

	/**
	 * Gets the high 32 bits as a signed integer.
	 * @returns {number} Signed high bits
	 */
	LongPrototype.getHighBits = function getHighBits() {
	    return this.high;
	};

	/**
	 * Gets the high 32 bits as an unsigned integer.
	 * @returns {number} Unsigned high bits
	 */
	LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
	    return this.high >>> 0;
	};

	/**
	 * Gets the low 32 bits as a signed integer.
	 * @returns {number} Signed low bits
	 */
	LongPrototype.getLowBits = function getLowBits() {
	    return this.low;
	};

	/**
	 * Gets the low 32 bits as an unsigned integer.
	 * @returns {number} Unsigned low bits
	 */
	LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
	    return this.low >>> 0;
	};

	/**
	 * Gets the number of bits needed to represent the absolute value of this Long.
	 * @returns {number}
	 */
	LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
	    if (this.isNegative()) // Unsigned Longs are never negative
	        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
	    var val = this.high != 0 ? this.high : this.low;
	    for (var bit = 31; bit > 0; bit--)
	        if ((val & (1 << bit)) != 0)
	            break;
	    return this.high != 0 ? bit + 33 : bit + 1;
	};

	/**
	 * Tests if this Long's value equals zero.
	 * @returns {boolean}
	 */
	LongPrototype.isZero = function isZero() {
	    return this.high === 0 && this.low === 0;
	};

	/**
	 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
	 * @returns {boolean}
	 */
	LongPrototype.eqz = LongPrototype.isZero;

	/**
	 * Tests if this Long's value is negative.
	 * @returns {boolean}
	 */
	LongPrototype.isNegative = function isNegative() {
	    return !this.unsigned && this.high < 0;
	};

	/**
	 * Tests if this Long's value is positive.
	 * @returns {boolean}
	 */
	LongPrototype.isPositive = function isPositive() {
	    return this.unsigned || this.high >= 0;
	};

	/**
	 * Tests if this Long's value is odd.
	 * @returns {boolean}
	 */
	LongPrototype.isOdd = function isOdd() {
	    return (this.low & 1) === 1;
	};

	/**
	 * Tests if this Long's value is even.
	 * @returns {boolean}
	 */
	LongPrototype.isEven = function isEven() {
	    return (this.low & 1) === 0;
	};

	/**
	 * Tests if this Long's value equals the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.equals = function equals(other) {
	    if (!isLong(other))
	        other = fromValue(other);
	    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
	        return false;
	    return this.high === other.high && this.low === other.low;
	};

	/**
	 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.eq = LongPrototype.equals;

	/**
	 * Tests if this Long's value differs from the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.notEquals = function notEquals(other) {
	    return !this.eq(/* validates */ other);
	};

	/**
	 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.neq = LongPrototype.notEquals;

	/**
	 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.ne = LongPrototype.notEquals;

	/**
	 * Tests if this Long's value is less than the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.lessThan = function lessThan(other) {
	    return this.comp(/* validates */ other) < 0;
	};

	/**
	 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.lt = LongPrototype.lessThan;

	/**
	 * Tests if this Long's value is less than or equal the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
	    return this.comp(/* validates */ other) <= 0;
	};

	/**
	 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.lte = LongPrototype.lessThanOrEqual;

	/**
	 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.le = LongPrototype.lessThanOrEqual;

	/**
	 * Tests if this Long's value is greater than the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.greaterThan = function greaterThan(other) {
	    return this.comp(/* validates */ other) > 0;
	};

	/**
	 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.gt = LongPrototype.greaterThan;

	/**
	 * Tests if this Long's value is greater than or equal the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
	    return this.comp(/* validates */ other) >= 0;
	};

	/**
	 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.gte = LongPrototype.greaterThanOrEqual;

	/**
	 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {boolean}
	 */
	LongPrototype.ge = LongPrototype.greaterThanOrEqual;

	/**
	 * Compares this Long's value with the specified's.
	 * @param {!Long|number|string} other Other value
	 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
	 *  if the given one is greater
	 */
	LongPrototype.compare = function compare(other) {
	    if (!isLong(other))
	        other = fromValue(other);
	    if (this.eq(other))
	        return 0;
	    var thisNeg = this.isNegative(),
	        otherNeg = other.isNegative();
	    if (thisNeg && !otherNeg)
	        return -1;
	    if (!thisNeg && otherNeg)
	        return 1;
	    // At this point the sign bits are the same
	    if (!this.unsigned)
	        return this.sub(other).isNegative() ? -1 : 1;
	    // Both are positive if at least one is unsigned
	    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
	};

	/**
	 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
	 * @function
	 * @param {!Long|number|string} other Other value
	 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
	 *  if the given one is greater
	 */
	LongPrototype.comp = LongPrototype.compare;

	/**
	 * Negates this Long's value.
	 * @returns {!Long} Negated Long
	 */
	LongPrototype.negate = function negate() {
	    if (!this.unsigned && this.eq(MIN_VALUE))
	        return MIN_VALUE;
	    return this.not().add(ONE);
	};

	/**
	 * Negates this Long's value. This is an alias of {@link Long#negate}.
	 * @function
	 * @returns {!Long} Negated Long
	 */
	LongPrototype.neg = LongPrototype.negate;

	/**
	 * Returns the sum of this and the specified Long.
	 * @param {!Long|number|string} addend Addend
	 * @returns {!Long} Sum
	 */
	LongPrototype.add = function add(addend) {
	    if (!isLong(addend))
	        addend = fromValue(addend);

	    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

	    var a48 = this.high >>> 16;
	    var a32 = this.high & 0xFFFF;
	    var a16 = this.low >>> 16;
	    var a00 = this.low & 0xFFFF;

	    var b48 = addend.high >>> 16;
	    var b32 = addend.high & 0xFFFF;
	    var b16 = addend.low >>> 16;
	    var b00 = addend.low & 0xFFFF;

	    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	    c00 += a00 + b00;
	    c16 += c00 >>> 16;
	    c00 &= 0xFFFF;
	    c16 += a16 + b16;
	    c32 += c16 >>> 16;
	    c16 &= 0xFFFF;
	    c32 += a32 + b32;
	    c48 += c32 >>> 16;
	    c32 &= 0xFFFF;
	    c48 += a48 + b48;
	    c48 &= 0xFFFF;
	    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	};

	/**
	 * Returns the difference of this and the specified Long.
	 * @param {!Long|number|string} subtrahend Subtrahend
	 * @returns {!Long} Difference
	 */
	LongPrototype.subtract = function subtract(subtrahend) {
	    if (!isLong(subtrahend))
	        subtrahend = fromValue(subtrahend);
	    return this.add(subtrahend.neg());
	};

	/**
	 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
	 * @function
	 * @param {!Long|number|string} subtrahend Subtrahend
	 * @returns {!Long} Difference
	 */
	LongPrototype.sub = LongPrototype.subtract;

	/**
	 * Returns the product of this and the specified Long.
	 * @param {!Long|number|string} multiplier Multiplier
	 * @returns {!Long} Product
	 */
	LongPrototype.multiply = function multiply(multiplier) {
	    if (this.isZero())
	        return ZERO;
	    if (!isLong(multiplier))
	        multiplier = fromValue(multiplier);

	    // use wasm support if present
	    if (wasm) {
	        var low = wasm.mul(this.low,
	                           this.high,
	                           multiplier.low,
	                           multiplier.high);
	        return fromBits(low, wasm.get_high(), this.unsigned);
	    }

	    if (multiplier.isZero())
	        return ZERO;
	    if (this.eq(MIN_VALUE))
	        return multiplier.isOdd() ? MIN_VALUE : ZERO;
	    if (multiplier.eq(MIN_VALUE))
	        return this.isOdd() ? MIN_VALUE : ZERO;

	    if (this.isNegative()) {
	        if (multiplier.isNegative())
	            return this.neg().mul(multiplier.neg());
	        else
	            return this.neg().mul(multiplier).neg();
	    } else if (multiplier.isNegative())
	        return this.mul(multiplier.neg()).neg();

	    // If both longs are small, use float multiplication
	    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
	        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

	    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
	    // We can skip products that would overflow.

	    var a48 = this.high >>> 16;
	    var a32 = this.high & 0xFFFF;
	    var a16 = this.low >>> 16;
	    var a00 = this.low & 0xFFFF;

	    var b48 = multiplier.high >>> 16;
	    var b32 = multiplier.high & 0xFFFF;
	    var b16 = multiplier.low >>> 16;
	    var b00 = multiplier.low & 0xFFFF;

	    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	    c00 += a00 * b00;
	    c16 += c00 >>> 16;
	    c00 &= 0xFFFF;
	    c16 += a16 * b00;
	    c32 += c16 >>> 16;
	    c16 &= 0xFFFF;
	    c16 += a00 * b16;
	    c32 += c16 >>> 16;
	    c16 &= 0xFFFF;
	    c32 += a32 * b00;
	    c48 += c32 >>> 16;
	    c32 &= 0xFFFF;
	    c32 += a16 * b16;
	    c48 += c32 >>> 16;
	    c32 &= 0xFFFF;
	    c32 += a00 * b32;
	    c48 += c32 >>> 16;
	    c32 &= 0xFFFF;
	    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
	    c48 &= 0xFFFF;
	    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
	};

	/**
	 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
	 * @function
	 * @param {!Long|number|string} multiplier Multiplier
	 * @returns {!Long} Product
	 */
	LongPrototype.mul = LongPrototype.multiply;

	/**
	 * Returns this Long divided by the specified. The result is signed if this Long is signed or
	 *  unsigned if this Long is unsigned.
	 * @param {!Long|number|string} divisor Divisor
	 * @returns {!Long} Quotient
	 */
	LongPrototype.divide = function divide(divisor) {
	    if (!isLong(divisor))
	        divisor = fromValue(divisor);
	    if (divisor.isZero())
	        throw Error('division by zero');

	    // use wasm support if present
	    if (wasm) {
	        // guard against signed division overflow: the largest
	        // negative number / -1 would be 1 larger than the largest
	        // positive number, due to two's complement.
	        if (!this.unsigned &&
	            this.high === -0x80000000 &&
	            divisor.low === -1 && divisor.high === -1) {
	            // be consistent with non-wasm code path
	            return this;
	        }
	        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
	            this.low,
	            this.high,
	            divisor.low,
	            divisor.high
	        );
	        return fromBits(low, wasm.get_high(), this.unsigned);
	    }

	    if (this.isZero())
	        return this.unsigned ? UZERO : ZERO;
	    var approx, rem, res;
	    if (!this.unsigned) {
	        // This section is only relevant for signed longs and is derived from the
	        // closure library as a whole.
	        if (this.eq(MIN_VALUE)) {
	            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
	                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
	            else if (divisor.eq(MIN_VALUE))
	                return ONE;
	            else {
	                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
	                var halfThis = this.shr(1);
	                approx = halfThis.div(divisor).shl(1);
	                if (approx.eq(ZERO)) {
	                    return divisor.isNegative() ? ONE : NEG_ONE;
	                } else {
	                    rem = this.sub(divisor.mul(approx));
	                    res = approx.add(rem.div(divisor));
	                    return res;
	                }
	            }
	        } else if (divisor.eq(MIN_VALUE))
	            return this.unsigned ? UZERO : ZERO;
	        if (this.isNegative()) {
	            if (divisor.isNegative())
	                return this.neg().div(divisor.neg());
	            return this.neg().div(divisor).neg();
	        } else if (divisor.isNegative())
	            return this.div(divisor.neg()).neg();
	        res = ZERO;
	    } else {
	        // The algorithm below has not been made for unsigned longs. It's therefore
	        // required to take special care of the MSB prior to running it.
	        if (!divisor.unsigned)
	            divisor = divisor.toUnsigned();
	        if (divisor.gt(this))
	            return UZERO;
	        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
	            return UONE;
	        res = UZERO;
	    }

	    // Repeat the following until the remainder is less than other:  find a
	    // floating-point that approximates remainder / other *from below*, add this
	    // into the result, and subtract it from the remainder.  It is critical that
	    // the approximate value is less than or equal to the real value so that the
	    // remainder never becomes negative.
	    rem = this;
	    while (rem.gte(divisor)) {
	        // Approximate the result of division. This may be a little greater or
	        // smaller than the actual value.
	        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

	        // We will tweak the approximate result by changing it in the 48-th digit or
	        // the smallest non-fractional digit, whichever is larger.
	        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
	            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

	        // Decrease the approximation until it is smaller than the remainder.  Note
	        // that if it is too large, the product overflows and is negative.
	            approxRes = fromNumber(approx),
	            approxRem = approxRes.mul(divisor);
	        while (approxRem.isNegative() || approxRem.gt(rem)) {
	            approx -= delta;
	            approxRes = fromNumber(approx, this.unsigned);
	            approxRem = approxRes.mul(divisor);
	        }

	        // We know the answer can't be zero... and actually, zero would cause
	        // infinite recursion since we would make no progress.
	        if (approxRes.isZero())
	            approxRes = ONE;

	        res = res.add(approxRes);
	        rem = rem.sub(approxRem);
	    }
	    return res;
	};

	/**
	 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
	 * @function
	 * @param {!Long|number|string} divisor Divisor
	 * @returns {!Long} Quotient
	 */
	LongPrototype.div = LongPrototype.divide;

	/**
	 * Returns this Long modulo the specified.
	 * @param {!Long|number|string} divisor Divisor
	 * @returns {!Long} Remainder
	 */
	LongPrototype.modulo = function modulo(divisor) {
	    if (!isLong(divisor))
	        divisor = fromValue(divisor);

	    // use wasm support if present
	    if (wasm) {
	        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
	            this.low,
	            this.high,
	            divisor.low,
	            divisor.high
	        );
	        return fromBits(low, wasm.get_high(), this.unsigned);
	    }

	    return this.sub(this.div(divisor).mul(divisor));
	};

	/**
	 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
	 * @function
	 * @param {!Long|number|string} divisor Divisor
	 * @returns {!Long} Remainder
	 */
	LongPrototype.mod = LongPrototype.modulo;

	/**
	 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
	 * @function
	 * @param {!Long|number|string} divisor Divisor
	 * @returns {!Long} Remainder
	 */
	LongPrototype.rem = LongPrototype.modulo;

	/**
	 * Returns the bitwise NOT of this Long.
	 * @returns {!Long}
	 */
	LongPrototype.not = function not() {
	    return fromBits(~this.low, ~this.high, this.unsigned);
	};

	/**
	 * Returns the bitwise AND of this Long and the specified.
	 * @param {!Long|number|string} other Other Long
	 * @returns {!Long}
	 */
	LongPrototype.and = function and(other) {
	    if (!isLong(other))
	        other = fromValue(other);
	    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
	};

	/**
	 * Returns the bitwise OR of this Long and the specified.
	 * @param {!Long|number|string} other Other Long
	 * @returns {!Long}
	 */
	LongPrototype.or = function or(other) {
	    if (!isLong(other))
	        other = fromValue(other);
	    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
	};

	/**
	 * Returns the bitwise XOR of this Long and the given one.
	 * @param {!Long|number|string} other Other Long
	 * @returns {!Long}
	 */
	LongPrototype.xor = function xor(other) {
	    if (!isLong(other))
	        other = fromValue(other);
	    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
	};

	/**
	 * Returns this Long with bits shifted to the left by the given amount.
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shiftLeft = function shiftLeft(numBits) {
	    if (isLong(numBits))
	        numBits = numBits.toInt();
	    if ((numBits &= 63) === 0)
	        return this;
	    else if (numBits < 32)
	        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
	    else
	        return fromBits(0, this.low << (numBits - 32), this.unsigned);
	};

	/**
	 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
	 * @function
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shl = LongPrototype.shiftLeft;

	/**
	 * Returns this Long with bits arithmetically shifted to the right by the given amount.
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shiftRight = function shiftRight(numBits) {
	    if (isLong(numBits))
	        numBits = numBits.toInt();
	    if ((numBits &= 63) === 0)
	        return this;
	    else if (numBits < 32)
	        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
	    else
	        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
	};

	/**
	 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
	 * @function
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shr = LongPrototype.shiftRight;

	/**
	 * Returns this Long with bits logically shifted to the right by the given amount.
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
	    if (isLong(numBits))
	        numBits = numBits.toInt();
	    numBits &= 63;
	    if (numBits === 0)
	        return this;
	    else {
	        var high = this.high;
	        if (numBits < 32) {
	            var low = this.low;
	            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
	        } else if (numBits === 32)
	            return fromBits(high, 0, this.unsigned);
	        else
	            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
	    }
	};

	/**
	 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
	 * @function
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shru = LongPrototype.shiftRightUnsigned;

	/**
	 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
	 * @function
	 * @param {number|!Long} numBits Number of bits
	 * @returns {!Long} Shifted Long
	 */
	LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

	/**
	 * Converts this Long to signed.
	 * @returns {!Long} Signed long
	 */
	LongPrototype.toSigned = function toSigned() {
	    if (!this.unsigned)
	        return this;
	    return fromBits(this.low, this.high, false);
	};

	/**
	 * Converts this Long to unsigned.
	 * @returns {!Long} Unsigned long
	 */
	LongPrototype.toUnsigned = function toUnsigned() {
	    if (this.unsigned)
	        return this;
	    return fromBits(this.low, this.high, true);
	};

	/**
	 * Converts this Long to its byte representation.
	 * @param {boolean=} le Whether little or big endian, defaults to big endian
	 * @returns {!Array.<number>} Byte representation
	 */
	LongPrototype.toBytes = function toBytes(le) {
	    return le ? this.toBytesLE() : this.toBytesBE();
	};

	/**
	 * Converts this Long to its little endian byte representation.
	 * @returns {!Array.<number>} Little endian byte representation
	 */
	LongPrototype.toBytesLE = function toBytesLE() {
	    var hi = this.high,
	        lo = this.low;
	    return [
	        lo        & 0xff,
	        lo >>>  8 & 0xff,
	        lo >>> 16 & 0xff,
	        lo >>> 24       ,
	        hi        & 0xff,
	        hi >>>  8 & 0xff,
	        hi >>> 16 & 0xff,
	        hi >>> 24
	    ];
	};

	/**
	 * Converts this Long to its big endian byte representation.
	 * @returns {!Array.<number>} Big endian byte representation
	 */
	LongPrototype.toBytesBE = function toBytesBE() {
	    var hi = this.high,
	        lo = this.low;
	    return [
	        hi >>> 24       ,
	        hi >>> 16 & 0xff,
	        hi >>>  8 & 0xff,
	        hi        & 0xff,
	        lo >>> 24       ,
	        lo >>> 16 & 0xff,
	        lo >>>  8 & 0xff,
	        lo        & 0xff
	    ];
	};

	/**
	 * Creates a Long from its byte representation.
	 * @param {!Array.<number>} bytes Byte representation
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @param {boolean=} le Whether little or big endian, defaults to big endian
	 * @returns {Long} The corresponding Long value
	 */
	Long.fromBytes = function fromBytes(bytes, unsigned, le) {
	    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
	};

	/**
	 * Creates a Long from its little endian byte representation.
	 * @param {!Array.<number>} bytes Little endian byte representation
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {Long} The corresponding Long value
	 */
	Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
	    return new Long(
	        bytes[0]       |
	        bytes[1] <<  8 |
	        bytes[2] << 16 |
	        bytes[3] << 24,
	        bytes[4]       |
	        bytes[5] <<  8 |
	        bytes[6] << 16 |
	        bytes[7] << 24,
	        unsigned
	    );
	};

	/**
	 * Creates a Long from its big endian byte representation.
	 * @param {!Array.<number>} bytes Big endian byte representation
	 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	 * @returns {Long} The corresponding Long value
	 */
	Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
	    return new Long(
	        bytes[4] << 24 |
	        bytes[5] << 16 |
	        bytes[6] <<  8 |
	        bytes[7],
	        bytes[0] << 24 |
	        bytes[1] << 16 |
	        bytes[2] <<  8 |
	        bytes[3],
	        unsigned
	    );
	};

	var errcodes = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ErrorCode;
	(function (ErrorCode) {
	    ErrorCode[ErrorCode["kSuccess"] = 0] = "kSuccess";
	    ErrorCode[ErrorCode["kInvalidOperation"] = 1] = "kInvalidOperation";
	    ErrorCode[ErrorCode["kAuthError"] = 2] = "kAuthError";
	    ErrorCode[ErrorCode["kDatabaseError"] = 3] = "kDatabaseError";
	    ErrorCode[ErrorCode["kParamError"] = 4] = "kParamError";
	    ErrorCode[ErrorCode["kValueError"] = 5] = "kValueError";
	    ErrorCode[ErrorCode["kServerError"] = 6] = "kServerError";
	    ErrorCode[ErrorCode["kFileNotFound"] = 7] = "kFileNotFound";
	    ErrorCode[ErrorCode["kNotImplemented"] = 8] = "kNotImplemented";
	    ErrorCode[ErrorCode["kInvalidContent"] = 9] = "kInvalidContent";
	})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

	});

	unwrapExports(errcodes);
	var errcodes_1 = errcodes.ErrorCode;

	var utils = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var Utils = /** @class */ (function () {
	    function Utils() {
	    }
	    Utils.isNumber = function (obj) {
	        return typeof obj === 'number';
	    };
	    Utils.isInt = function (obj) {
	        return this.isNumber(obj) && obj % 1 === 0;
	    };
	    Utils.isBoolean = function (obj) {
	        return typeof obj === 'boolean';
	    };
	    Utils.isString = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object String]';
	    };
	    Utils.isUndefined = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Undefined]';
	    };
	    Utils.isNull = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Null]';
	    };
	    Utils.isObject = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Object]';
	    };
	    Utils.isArray = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Array]';
	    };
	    Utils.isFunction = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Function]';
	    };
	    Utils.isPrimitive = function (obj) {
	        return this.isNumber(obj) || this.isString(obj) || this.isBoolean(obj) || this.isNull(obj) || this.isUndefined(obj);
	    };
	    Utils.deepCopy = function (obj) {
	        return this.isPrimitive(obj) ? obj : JSON.parse(JSON.stringify(obj));
	    };
	    Utils.equals = function (obj1, obj2) {
	        for (var propName in obj1) {
	            if (obj1.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
	                return false;
	            }
	            else if (typeof obj1[propName] !== typeof obj2[propName]) {
	                return false;
	            }
	        }
	        for (var propName in obj2) {
	            if (obj1.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
	                return false;
	            }
	            else if (typeof obj1[propName] !== typeof obj2[propName]) {
	                return false;
	            }
	            if (!obj1.hasOwnProperty(propName)) {
	                continue;
	            }
	            if (obj1[propName] instanceof Array && obj2[propName] instanceof Array) {
	                if (!this.equals(obj1[propName], obj2[propName])) {
	                    return false;
	                }
	            }
	            else if (obj1[propName] instanceof Object && obj2[propName] instanceof Object) {
	                if (!this.equals(obj1[propName], obj2[propName])) {
	                    return false;
	                }
	            }
	            else if (obj1[propName] !== obj2[propName]) {
	                return false;
	            }
	        }
	        return true;
	    };
	    Utils.trimLeft = function (str) {
	        return str.replace(/(^\s*)/g, '');
	    };
	    Utils.trimRight = function (str) {
	        return str.replace(/(\s*$)/g, '');
	    };
	    Utils.trim = function (str) {
	        return str.replace(/(^\s*)|(\s*$)/g, '');
	    };
	    Utils.toUnicode = function (str) {
	        return str.replace(/[\u007F-\uFFFF]/g, function (chr) {
	            return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
	        });
	    };
	    Utils.fromUnicode = function (str) {
	        return str.replace(/\\u[0-9|a-f|A-F]{4}/g, function (s) {
	            return String.fromCharCode(parseInt(s.slice(2), 16));
	        });
	    };
	    Utils.safeParseNumber = function (value) {
	        return isNaN(value) ? null : parseFloat(value);
	    };
	    Utils.safeParseInt = function (value, defaultValue) {
	        var result = value !== null && value !== undefined && /^[-+]?\d+$/.test(value.toString()) ? parseInt(value, 10) : null;
	        if (result == null && this.isNumber(defaultValue)) {
	            result = parseInt(defaultValue, 10);
	        }
	        return result;
	    };
	    Utils.safeParseLong = function (value) {
	        if (isNaN(value)) {
	            return null;
	        }
	        else if (this.isString(value)) {
	            return long_1.fromString(value);
	        }
	        else if (this.isNumber(value)) {
	            return long_1.fromNumber(value);
	        }
	        else {
	            return null;
	        }
	    };
	    Utils.isMD5 = function (str) {
	        return this.isString(str) && /^[0-9a-f]{32}$/.test(str);
	    };
	    Utils.longDivToFixed = function (value, n) {
	        var lval = value;
	        if (this.isNull(lval) || this.isUndefined(lval)) {
	            return null;
	        }
	        else if (this.isString(lval)) {
	            lval = long_1.fromString(lval);
	        }
	        else if (this.isNumber(lval)) {
	            lval = long_1.fromNumber(lval);
	        }
	        var sign = '';
	        if (lval.lt(0)) {
	            lval = lval.neg();
	            sign = '-';
	        }
	        var divisor = long_1.ONE;
	        for (var i = 0; i < n; i++) {
	            divisor = divisor.mul(10);
	        }
	        var iPart = lval.div(divisor).toString();
	        var fPart = lval.mod(divisor).toString();
	        while (fPart.length < n) {
	            fPart = '0' + fPart;
	        }
	        return sign + iPart + '.' + fPart;
	    };
	    Utils.genDebugStr = function (str, up) {
	        var skip = 1 + (up || 0);
	        var f = arguments.callee;
	        while (f && skip > 0) {
	            f = f.caller;
	            skip--;
	        }
	        var funcName = f ? this.getFunctionName(f) + ': ' : '';
	        return "" + funcName + str;
	    };
	    Utils.debugOut = function (str, up) {
	        if (this.debug) {
	            console.log(this.genDebugStr(str, up || 0));
	        }
	    };
	    Utils.getFunctionName = function (callee) {
	        var _callee = callee.toString().replace(/[\s\?]*/g, '');
	        var comb = _callee.length >= 50 ? 50 : _callee.length;
	        _callee = _callee.substring(0, comb);
	        var name = _callee.match(/^function([^\(]+?)\(/);
	        if (name && name[1]) {
	            return name[1];
	        }
	        var caller = callee.caller;
	        var _caller = caller.toString().replace(/[\s\?]*/g, '');
	        var last = _caller.indexOf(_callee);
	        var str = _caller.substring(last - 30, last);
	        name = str.match(/var([^\=]+?)\=/);
	        if (name && name[1]) {
	            return name[1];
	        }
	        return 'anonymous';
	    };
	    Utils.httpResult = function (err) {
	        return {
	            err: err,
	            message: errcodes.ErrorCode[err]
	        };
	    };
	    Utils.debug = false;
	    Utils.mergeBlank = function (str) {
	        return str.replace(/\s+/g, ' ');
	    };
	    return Utils;
	}());
	exports.Utils = Utils;

	});

	unwrapExports(utils);
	var utils_1 = utils.Utils;

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

	var assets = createCommonjsModule(function (module, exports) {
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


	function asset_setup(arg) {
	    return __awaiter(this, void 0, void 0, function () {
	        function checkConfig(el) {
	            var ok = true;
	            if (!el.files || el.files.length === 0) {
	                ok = false;
	            }
	            return ok;
	        }
	        var e_1, _a, assetData, relPath, assetList, _b, _c, asset;
	        return __generator(this, function (_d) {
	            switch (_d.label) {
	                case 0:
	                    assetData = {
	                        itemMinWidth: '100px',
	                        itemMaxWidth: '100px',
	                        itemMinHeight: '100px',
	                        nodes: []
	                    };
	                    relPath = '/';
	                    return [4 /*yield*/, mod_tools.ajaxRequest({
	                            url: '/api/trust/asset',
	                            type: 'get',
	                            data: {
	                                relPath: relPath
	                            }
	                        })];
	                case 1:
	                    assetList = _d.sent();
	                    try {
	                        for (_b = __values(assetList.data), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            asset = _c.value;
	                            assetData.nodes.push({
	                                text: asset,
	                                id: asset,
	                                thumbUrl: "/trust/assets/image?name=" + encodeURIComponent(asset) + "&relPath=" + encodeURIComponent(relPath) + "&thumb=1"
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
	                    jquery('#grid-view').gridView(assetData);
	                    jquery('#btn-upload-asset').on('click', function () {
	                        var el = document.getElementById('upload-asset');
	                        if (checkConfig(el)) {
	                            mod_tools.uploadFileAjax(el, 'content', '/api/trust/asset').then(function (response) {
	                                alert(response);
	                            }).catch(function (reason) {
	                                alert(reason);
	                            });
	                        }
	                    });
	                    jquery('#test-upload').on('click', function () {
	                        var el = jquery('<input>').appendTo(jquery('body'));
	                        el.attr({
	                            type: 'file',
	                            name: 'xxx'
	                        });
	                        el.trigger('click');
	                        var e = el[0];
	                        e.onchange = function () {
	                            console.log(e.files);
	                        };
	                    });
	                    return [2 /*return*/];
	            }
	        });
	    });
	}
	exports.asset_setup = asset_setup;

	});

	unwrapExports(assets);
	var assets_1 = assets.asset_setup;

	var sessions = createCommonjsModule(function (module, exports) {
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



	function sessions_setup(arg) {
	    return __awaiter(this, void 0, void 0, function () {
	        function checkConfig() {
	            var ok = true;
	            var sessionName = jquery('#session-name').val();
	            if (!sessionName || !utils.Utils.trim(sessionName)) {
	                jquery('#err_msg_session_name').html('请输入名称');
	                ok = false;
	            }
	            return ok;
	        }
	        return __generator(this, function (_a) {
	            jquery('input').on('input', function () {
	                checkConfig();
	            });
	            jquery('button#btn-start').on('click', function () {
	                var sessionId = jquery(this).attr('sid');
	                if (sessionId) {
	                    var id = parseInt(sessionId, 10);
	                    if (utils.Utils.isInt(id)) {
	                        console.log("Start session " + id);
	                        window.location.href = "/trust/publish_room?room_id=" + id;
	                    }
	                }
	            });
	            jquery('button#btn-stop').on('click', function () {
	                return __awaiter(this, void 0, void 0, function () {
	                    var sessionId, ret;
	                    return __generator(this, function (_a) {
	                        switch (_a.label) {
	                            case 0:
	                                sessionId = jquery(this).attr('sid');
	                                return [4 /*yield*/, mod_tools.ajaxRequest({
	                                        url: '/api/trust/close_room',
	                                        type: 'post',
	                                        data: {
	                                            room_id: sessionId
	                                        }
	                                    })];
	                            case 1:
	                                ret = _a.sent();
	                                window.location.reload();
	                                return [2 /*return*/];
	                        }
	                    });
	                });
	            });
	            jquery('button#btn-delete').on('click', function () {
	                var sessionId = jquery(this).attr('sid');
	                console.log("Delete session " + sessionId);
	            });
	            jquery('#submit').on('click', function () {
	                return __awaiter(this, void 0, void 0, function () {
	                    var data;
	                    return __generator(this, function (_a) {
	                        switch (_a.label) {
	                            case 0:
	                                if (!checkConfig()) return [3 /*break*/, 2];
	                                return [4 /*yield*/, mod_tools.ajaxRequest({
	                                        url: '/api/trust/create_room',
	                                        type: 'post',
	                                        data: {
	                                            name: jquery('#session-name').val(),
	                                            desc: jquery('#session-desc').val()
	                                        }
	                                    })];
	                            case 1:
	                                data = _a.sent();
	                                alert(JSON.stringify(data));
	                                if (data.err === 0) {
	                                    jquery('#new-room').modal('hide');
	                                    jquery('.modal-backdrop').remove();
	                                }
	                                _a.label = 2;
	                            case 2: return [2 /*return*/];
	                        }
	                    });
	                });
	            });
	            return [2 /*return*/];
	        });
	    });
	}
	exports.sessions_setup = sessions_setup;

	});

	unwrapExports(sessions);
	var sessions_1 = sessions.sessions_setup;

	var profile = createCommonjsModule(function (module, exports) {
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

	var temporalFileInput = jquery('<input/>').attr({
	    type: 'file',
	}).on('change', function () {
	    return __awaiter(this, void 0, void 0, function () {
	        var filePath, fileFormat, fileObj, imgBase64;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    if (!(this.files && this.files.length === 1)) return [3 /*break*/, 2];
	                    filePath = jquery(this).val();
	                    fileFormat = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
	                    fileObj = this.files[0];
	                    if (!fileFormat.match(/.jpg|.jpeg/)) {
	                        alert('文件格式必须是：jpg/jpeg');
	                        jquery(this).val('');
	                        return [2 /*return*/];
	                    }
	                    if (fileObj.size > 200 * 1024) {
	                        alert('文件大小不得超过200k');
	                        jquery(this).val('');
	                        return [2 /*return*/];
	                    }
	                    return [4 /*yield*/, toBase64(fileObj)];
	                case 1:
	                    imgBase64 = _a.sent();
	                    jquery('#avatar-image').attr('src', imgBase64);
	                    _a.label = 2;
	                case 2: return [2 /*return*/];
	            }
	        });
	    });
	});
	function toBase64(fileObj) {
	    return __awaiter(this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            return [2 /*return*/, new Promise(function (resolve) {
	                    var r = new FileReader();
	                    r.onload = function () {
	                        resolve(r.result);
	                    };
	                    r.readAsDataURL(fileObj);
	                })];
	        });
	    });
	}
	function checkConfig() {
	    var ok = true;
	    var name = jquery.trim(String(jquery('#name').val()));
	    if (!name) {
	        jquery('#err_msg_profile_name').html('请填写名称');
	        ok = false;
	    }
	    else {
	        jquery('#err_msg_profile_name').html('');
	    }
	    var email = jquery.trim(String(jquery('#email').val()));
	    if (!email) {
	        jquery('#err_msg_profile_email').html('请填写电子邮箱');
	        ok = false;
	    }
	    else {
	        jquery('#err_msg_profile_email').html('');
	    }
	    return ok;
	}
	function profile_setup(avatar) {
	    return __awaiter(this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            jquery('#btn-upload-avatar').on('click', function () {
	                temporalFileInput.trigger('click');
	            });
	            jquery('#btn-update-userprofile').on('click', function (ev) {
	                ev.preventDefault();
	                ev.stopPropagation();
	                if (checkConfig()) {
	                    var form = document.forms[0];
	                    var formData = new FormData(form);
	                    var el = temporalFileInput[0];
	                    if (el.files && el.files.length === 1) {
	                        formData.append('avatar', el.files[0]);
	                    }
	                    jquery.ajax({
	                        url: '/api/trust/profile',
	                        type: 'post',
	                        data: formData,
	                        dataType: 'json',
	                        processData: false,
	                        contentType: false,
	                        success: function (result) {
	                            if (!result.err) {
	                                window.location.reload();
	                            }
	                            else {
	                                alert('数据提交失败，请检查网络或稍后重试');
	                            }
	                        }
	                    });
	                }
	            });
	            return [2 /*return*/];
	        });
	    });
	}
	exports.profile_setup = profile_setup;

	});

	unwrapExports(profile);
	var profile_1 = profile.profile_setup;

	var whiteboards = createCommonjsModule(function (module, exports) {
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


	function whiteboards_setup(arg) {
	    return __awaiter(this, void 0, void 0, function () {
	        var e_1, _a, whiteboardData, relPath, whiteboardList, _b, _c, wb;
	        return __generator(this, function (_d) {
	            switch (_d.label) {
	                case 0:
	                    whiteboardData = {
	                        itemMinWidth: '100px',
	                        itemMaxWidth: '100px',
	                        itemMinHeight: '100px',
	                        nodes: []
	                    };
	                    relPath = '/';
	                    return [4 /*yield*/, mod_tools.ajaxRequest({
	                            url: '/api/trust/whiteboard',
	                            type: 'get',
	                            data: {
	                                relPath: relPath
	                            }
	                        })];
	                case 1:
	                    whiteboardList = _d.sent();
	                    try {
	                        for (_b = __values(whiteboardList.data), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            wb = _c.value;
	                            whiteboardData.nodes.push({
	                                text: wb,
	                                id: wb,
	                                thumbUrl: "/trust/whiteboards/image?name=" + encodeURIComponent(wb) + "&relPath=" + encodeURIComponent(relPath) + "&thumb=1"
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
	                    jquery('#grid-view').gridView(whiteboardData);
	                    jquery('#btn-new-whiteboard').on('click', function () {
	                        window.location.href = '/trust/create-whiteboard';
	                    });
	                    return [2 /*return*/];
	            }
	        });
	    });
	}
	exports.whiteboards_setup = whiteboards_setup;

	});

	unwrapExports(whiteboards);
	var whiteboards_1 = whiteboards.whiteboards_setup;

	var settings = createCommonjsModule(function (module, exports) {
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






	var menuData = {
	    props: {
	        icon: null,
	        iconExpand: 'fa fa-angle-down',
	        iconSize: '0px'
	    },
	    propsExpanded: {
	        icon: null,
	        iconExpand: 'fa fa-angle-down',
	        iconSize: '0px'
	    },
	    nodes: [{
	            text: '基本资料',
	            id: 'profile',
	        }, {
	            text: '账号设置',
	            id: '_account',
	            nodes: [{
	                    text: '更改密码',
	                    id: 'reset',
	                }, {
	                    text: '删除账号',
	                    id: 'delete',
	                }]
	        }, {
	            text: '素材管理',
	            id: 'assets',
	        }, {
	            text: '白板管理',
	            id: 'whiteboards',
	        }, {
	            text: '会话管理',
	            id: 'sessions',
	        }, {
	            text: '我的收藏',
	            id: 'favorites',
	        }, {
	            text: '退出登录',
	            id: 'logout'
	        }]
	};
	function traverseNode_r(root, callback) {
	    var e_1, _a;
	    if (utils.Utils.isArray(root)) {
	        try {
	            for (var root_1 = __values(root), root_1_1 = root_1.next(); !root_1_1.done; root_1_1 = root_1.next()) {
	                var node = root_1_1.value;
	                if (traverseNode_r(node, callback)) {
	                    return true;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (root_1_1 && !root_1_1.done && (_a = root_1.return)) _a.call(root_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	    }
	    else {
	        var n = root;
	        if (!callback.call(n)) {
	            if (n.nodes) {
	                return traverseNode_r(n.nodes, callback);
	            }
	        }
	        else {
	            return true;
	        }
	    }
	    return false;
	}
	var getSettingsMenuData = function (id) {
	    var accountNode = null;
	    traverseNode_r(menuData.nodes, function () {
	        if (this.id === '_account') {
	            accountNode = this;
	        }
	        this.selected = (this.id === id);
	        if (id === 'reset' && accountNode) {
	            accountNode.expanded = true;
	        }
	        return false;
	    });
	    return menuData;
	};
	exports.getSettingsMenuData = getSettingsMenuData;
	var Settings = /** @class */ (function () {
	    function Settings(step, arg) {
	        $("#treeview").folderTree(getSettingsMenuData(step));
	        $("#treeview").folderTree('selectNodes', step);
	        $("#treeview").on('itemclick', function (evt, node) {
	            if (node.id && node.id.length > 0 && node.id[0] !== '_') {
	                window.location.href = "/trust/settings/" + node.id;
	            }
	            else if (node.nodes && node.nodes.length > 0) {
	                $(this).folderTree('toggleCollapsingNodes', node);
	            }
	        });
	        switch (step) {
	            case 'assets':
	                assets.asset_setup(arg);
	                break;
	            case 'profile':
	                profile.profile_setup(arg);
	                break;
	            case 'whiteboards':
	                whiteboards.whiteboards_setup(arg);
	                break;
	            case 'sessions':
	                sessions.sessions_setup(arg);
	                break;
	        }
	    }
	    return Settings;
	}());
	exports.Settings = Settings;

	});

	var settings$1 = unwrapExports(settings);
	var settings_1 = settings.getSettingsMenuData;
	var settings_2 = settings.Settings;

	exports.default = settings$1;
	exports.getSettingsMenuData = settings_1;
	exports.Settings = settings_2;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
