"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoubleList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    append(data) {
        if (this.head === null) {
            this.head = new DoubleList.Node(data);
            this.length++;
            return this.head;
        }
        else {
            return this._insertAt(this.head, data);
        }
    }
    prepend(data) {
        const node = this.append(data);
        this.head = node;
        return node;
    }
    insertAt(node, data) {
        const newNode = this._insertAt(node, data);
        if (node === this.head) {
            this.head = newNode;
        }
        return newNode;
    }
    remove(node) {
        if (this.length === 1) {
            delete node.next;
            delete node.prev;
            this.head = null;
        }
        else {
            if (node === this.head) {
                this.head = node.next;
            }
            node.prev.next = node.next;
            node.next.prev = node.prev;
            delete node.prev;
            delete node.next;
        }
        this.length--;
    }
    each(callback) {
        let node = this.head;
        while (node) {
            callback && callback(node.data);
            node = node.next;
            if (node === this.head) {
                break;
            }
        }
    }
    _insertAt(node, data) {
        const newNode = new DoubleList.Node(data);
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this.length++;
        return newNode;
    }
}
exports.DoubleList = DoubleList;
(function (DoubleList) {
    class Node {
        constructor(data) {
            this.next = this;
            this.prev = this;
            this.data = data;
        }
    }
    DoubleList.Node = Node;
})(DoubleList = exports.DoubleList || (exports.DoubleList = {}));
//# sourceMappingURL=linkedlist.js.map