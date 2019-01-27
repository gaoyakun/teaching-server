import { Utils } from './utils';

export class DoubleList {
    private _head: DoubleList.Node;
    private _length: number;
    constructor () {
        this._head = new DoubleList.Node(null);
        this._length = 0;
    }
    get head () {
        return this._head;
    }
    get length () {
        return this._length;
    }
    set length (val: number) {
        if (Utils.isInt(val) && val >= 0) {
            while (val < this._length) {
                this.remove (this.rbegin ());
            }
            while (val > this._length) {
                this.append (null);
            }
        }
    }
    append (data: any) {
        this._insertAt (this._head, data);
        return this;
    }
    prepend (data: any) {
        this._insertAt (this._head.next, data);
        return this;
    }
    remove (it: DoubleList.Iterator) {
        if (it.valid () && it.list === this) {
            const node = it.node;
            it.next ();
            this._remove (node);
        }
    }
    insertAt (it: DoubleList.Iterator, data: any) {
        if (it.list === this) {
            if (it.valid ()) {
                if (it.reversed) {
                    this._insertAt (it.node.next, data);
                } else {
                    this._insertAt (it.node, data);
                }
            } else {
                this.append (data);
            }
        }
    }
    forEach (callback: (data:any) => void) {
        for (let it = this.begin(); it.valid(); it.next()) {
            callback && callback (it.data);
        }
    }
    forEachReverse (callback: (data:any) => void) {
        for (let it = this.rbegin(); it.valid(); it.next()) {
            callback && callback (it.data);
        }
    }
    front (): any {
        return this.begin().data;
    }
    back (): any {
        return this.rbegin().data;
    }
    begin (): DoubleList.Iterator {
        return this._length > 0 ? new DoubleList.Iterator(this, this._head.next, false) : new DoubleList.Iterator(this, this._head, false);
    }
    rbegin (): DoubleList.Iterator {
        return this._length > 0 ? new DoubleList.Iterator(this, this._head.prev, true) : new DoubleList.Iterator(this, this._head, true);
    }
    private _remove (node: DoubleList.Node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        delete node.prev;
        delete node.next;
        this._length--;
    }
    private _insertAt (node: DoubleList.Node, data: any) {
        const newNode = new DoubleList.Node(data);
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this._length++;
        return newNode;
    }
}

export namespace DoubleList {
    export class Node {
        next: Node;
        prev: Node;
        data: any;
        constructor (data: any) {
            this.next = this;
            this.prev = this;
            this.data = data;
        }
    }
    export class Iterator {
        private _node: Node;
        private _reverse: boolean;
        private _dl: DoubleList;
        constructor (dl:DoubleList, node:Node, reverse:boolean) {
            this._dl = dl;
            this._node = node;
            this._reverse = reverse;
        }
        valid (): boolean {
            return this._node !== this._dl.head;
        }
        next (): Iterator {
            if (this.valid()) {
                this._node = (this._reverse ? this._node.prev : this._node = this._node.next);
            }
            return this;
        }
        prev (): Iterator {
            if (this.valid()) {
                this._node = (this._reverse ? this._node.next : this._node = this._node.prev);
            }
            return this;
        }
        get node () {
            return this._node;
        }
        set node (n: Node) {
            this._node = n;
        }
        get reversed () {
            return this._reverse;
        }
        get list () {
            return this._dl;
        }
        get data () {
            if (this.valid()) {
                return this._node.data;
            }
        }
        set data (val: any) {
            if (this.valid()) {
                this._node.data = val;
            }
        }
    }
}

