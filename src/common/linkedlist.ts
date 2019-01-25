export class DoubleList {
    head: DoubleList.Node|null;
    length: number;
    constructor () {
        this.head = null;
        this.length = 0;
    }
    append (data: any) {
        return this.head === null ? this.head = new DoubleList.Node(data) : this.insertAt (this.head, data);
    }
    prepend (data: any) {
        return this.head === null ? this.head = new DoubleList.Node(data) : this.head = this.insertAt (this.head, data);
    }
    insertAt (node: DoubleList.Node, data: any) {
        if (node) {
            const newNode = new DoubleList.Node(data);
            newNode.next = node;
            newNode.prev = node.prev;
            node.prev.next = newNode;
            node.prev = newNode;
            this.length++;
            if (node === this.head) {
                this.head = newNode;
            }
            return newNode;
        } else {
            return null;
        }
    }
    remove (node: DoubleList.Node) {
        if (this.length === 1) {
            if (node === this.head) {
                delete node.next;
                delete node.prev;
                this.head = null;
            }
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

