const { NotImplementedError } = require("../lib/errors");
const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
	constructor() {
		this.startNode = null;
		this.endNode = null;
		this.length = 0;
	}
	getUnderlyingList() {
		if (this.startNode === null) {
			return null;
		}

		return reassemble(this.startNode);

		function reassemble(node) {
			if (node === null) return null;
			return { value: node.value, next: reassemble(node.next) };
		}
	}

	enqueue(value) {
		const node = new ListNode(value);

		if (this.startNode === null) {
			this.startNode = node;
		} else {
			this.endNode.next = node;
		}

		this.endNode = node;
		++this.length;
	}

	dequeue() {
		if (this.length === 0) {
			return undefined;
		}

		const result = this.startNode.value;
		this.startNode = this.startNode.next;
		return result;
	}
}

module.exports = {
	Queue,
};
