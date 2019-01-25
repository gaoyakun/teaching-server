export class DoubleList {
    head: DoubleList.Node|null;
    length: number;
    constructor () {
        this.head = null;
        this.length = 0;
    }
    append (data: any) {
        if (this.head === null) {
            this.head = new DoubleList.Node(data);
            this.length++;
            return this.head;
        } else {
            return this._insertAt (this.head, data);
        }
    }
    prepend (data: any) {
        const node = this.append (data);
        this.head = node;
        return node;
    }
    insertAt (node: DoubleList.Node, data: any) {
        const newNode = this._insertAt (node, data);
        if (node === this.head) {
            this.head = newNode;
        }
        return newNode;
    }
    remove (node: DoubleList.Node) {
        if (this.length === 1) {
            delete node.next;
            delete node.prev;
            this.head = null;
        } else {
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
    each (callback: (data:any) => void) {
        let node = this.head;
        while (node) {
            callback && callback (node.data);
            node = node.next;
            if (node === this.head) {
                break;
            }
        }
    }
    private _insertAt (node: DoubleList.Node, data: any) {
        const newNode = new DoubleList.Node(data);
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this.length++;
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
}

