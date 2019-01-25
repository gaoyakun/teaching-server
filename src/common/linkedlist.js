"use strict";
exports.__esModule = true;
var DoubleList = /** @class */ (function () {
    function DoubleList() {
        this.head = null;
        length = 0;
    }
    DoubleList.prototype.append = function (data) {
        return this.head === null ? this.head = new DoubleList.Node(data) : this.insertAt(this.head, data);
    };
    DoubleList.prototype.prepend = function (data) {
        return this.head === null ? this.head = new DoubleList.Node(data) : this.head = this.insertAt(this.head, data);
    };
    DoubleList.prototype.insertAt = function (node, data) {
        if (node) {
            var newNode = new DoubleList.Node(data);
            newNode.next = node;
            newNode.prev = node.prev;
            node.prev.next = newNode;
            node.prev = newNode;
            this.length++;
            return newNode;
        }
        else {
            return null;
        }
    };
    DoubleList.prototype.remove = function (node) {
        if (this.length === 1) {
            this.head.next = null;
            this.head.prev = null;
            this.head = null;
            this.length = 0;
        }
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.prev = null;
            node.next = null;
            this.length--;
        }
    };
    DoubleList.prototype.each = function (callback) {
        var node = this.head;
        while (node) {
            callback && callback(node.data);
            if (node.next === this.head) {
                break;
            }
        }
    };
    return DoubleList;
}());
exports.DoubleList = DoubleList;
(function (DoubleList) {
    var Node = /** @class */ (function () {
        function Node(data) {
            this.next = this;
            this.prev = this;
            this.data = data;
        }
        return Node;
    }());
    DoubleList.Node = Node;
})(DoubleList = exports.DoubleList || (exports.DoubleList = {}));
exports.DoubleList = DoubleList;
