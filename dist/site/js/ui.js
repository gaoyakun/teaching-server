(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.ui = {}),global.jQuery));
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
	                if (_this.options.multiSelect) {
	                    _this.toggleSelectNodes(node);
	                }
	                else {
	                    _this.deselectNodes(/^.*$/);
	                    _this.selectNodes(node);
	                }
	                if (node.callback) {
	                    var cb_1 = node.callback;
	                    setTimeout(function () { cb_1.call(container, node); }, 0);
	                }
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

	var mod_ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.FolderTree = folder_tree.FolderTree;

	exports.Widget = widget.Widget;

	});

	unwrapExports(mod_ui);
	var mod_ui_1 = mod_ui.FolderTree;
	var mod_ui_2 = mod_ui.Widget;

	var ui = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	(function () {
	    mod_ui.Widget.register(mod_ui.FolderTree, 'folderTree');
	})();

	});

	var ui$1 = unwrapExports(ui);

	exports.default = ui$1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
