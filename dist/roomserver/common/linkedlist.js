"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoubleListIterator {
    constructor(dl, node, reverse) {
        this._dl = dl;
        this._node = node;
        this._reverse = reverse;
    }
    valid() {
        return this._node !== this._dl.head;
    }
    next() {
        if (this.valid()) {
            this._node = (this._reverse ? this._node.prev : this._node = this._node.next);
        }
        return this;
    }
    prev() {
        if (this.valid()) {
            this._node = (this._reverse ? this._node.next : this._node = this._node.prev);
        }
        return this;
    }
    get node() {
        return this._node;
    }
    set node(n) {
        this._node = n;
    }
    get reversed() {
        return this._reverse;
    }
    get list() {
        return this._dl;
    }
    get data() {
        if (this.valid()) {
            return this._node.data;
        }
    }
    set data(val) {
        if (this.valid()) {
            this._node.data = val;
        }
    }
}
exports.DoubleListIterator = DoubleListIterator;
class DoubleList {
    constructor() {
        this._head = new DoubleListNodeImpl();
        this._length = 0;
    }
    get head() {
        return this._head;
    }
    get length() {
        return this._length;
    }
    clear() {
        while (this._length > 0) {
            this.remove(this.begin());
        }
    }
    append(data) {
        this._insertAt(this._head, data);
        return this;
    }
    prepend(data) {
        this._insertAt(this._head.next, data);
        return this;
    }
    remove(it) {
        if (it.valid() && it.list === this) {
            const node = it.node;
            it.next();
            this._remove(node);
        }
    }
    insertAt(it, data) {
        if (it.list === this) {
            if (it.valid()) {
                if (it.reversed) {
                    this._insertAt(it.node.next, data);
                }
                else {
                    this._insertAt(it.node, data);
                }
            }
            else {
                this.append(data);
            }
        }
    }
    forEach(callback) {
        for (let it = this.begin(); it.valid(); it.next()) {
            callback && callback(it.data);
        }
    }
    forEachReverse(callback) {
        for (let it = this.rbegin(); it.valid(); it.next()) {
            callback && callback(it.data);
        }
    }
    front() {
        return this.begin().data;
    }
    back() {
        return this.rbegin().data;
    }
    begin() {
        return this._length > 0 ? new DoubleListIterator(this, this._head.next, false) : new DoubleListIterator(this, this._head, false);
    }
    rbegin() {
        return this._length > 0 ? new DoubleListIterator(this, this._head.prev, true) : new DoubleListIterator(this, this._head, true);
    }
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        delete node.prev;
        delete node.next;
        this._length--;
    }
    _insertAt(node, data) {
        const newNode = new DoubleListNode(data);
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this._length++;
        return newNode;
    }
}
exports.DoubleList = DoubleList;
class DoubleListNodeImpl {
    constructor() {
        this.next = this;
        this.prev = this;
    }
}
class DoubleListNode extends DoubleListNodeImpl {
    constructor(data) {
        super();
        this.data = data;
    }
}
//# sourceMappingURL=linkedlist.js.map