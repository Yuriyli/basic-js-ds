const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	#root;
	constructor() {
		this.#root = null;
	}
	root() {
		return this.#root;
	}

	add(data) {
		if (this.#root === null) {
			this.#root = new Node(data);
			return;
		}

		addRecursive(this.#root);

		function addRecursive(node) {
			if (node.data === data) {
				return;
			}
			if (node.data > data) {
				if (node.left === null) {
					node.left = new Node(data);
					return;
				}
				return addRecursive(node.left);
			}
			if (node.right === null) {
				node.right = new Node(data);
				return;
			}
			return addRecursive(node.right);
		}
	}

	find(data) {
		if (this.#root === null) {
			return null;
		}

		return findRecursive(this.#root);

		function findRecursive(node) {
			if (node === null) {
				return null;
			}
			if (node.data === data) {
				return node;
			}
			if (node.data > data) {
				return findRecursive(node.left);
			}
			return findRecursive(node.right);
		}
	}

	has(data) {
		if (this.#root === null) {
			return null;
		}

		return hasRecursive(this.#root);

		function hasRecursive(node) {
			if (node === null) {
				return false;
			}
			if (node.data === data) {
				return true;
			}
			if (node.data > data) {
				return hasRecursive(node.left);
			}
			return hasRecursive(node.right);
		}
	}

	remove(data) {
		this.root = removeRecursive(this.#root, data);

		function removeRecursive(node, data) {
			if (node === null) {
				return null;
			}

			if (node.data > data) {
				node.left = removeRecursive(node.left, data);
				return node;
			}
			if (node.data < data) {
				node.right = removeRecursive(node.right, data);
				return node;
			}

			// If node.data === data

			if (node.left === null && node.right === null) {
				return null;
			}

			if (node.left === null) {
				return node.right;
			}

			if (node.right === null) {
				return node.left;
			}

      // Find minimum of right node
			let minRight = node.right;
			while (minRight.left !== null) {
				minRight = minRight.left;
			}
      // Replace min from right
			node.data = minRight.data;
      // Remove
			node.right = removeRecursive(node.right, minRight.data);

			return node;
		}
	}

	min() {
		let currNode = this.#root;
		let result = null;
		while (currNode !== null) {
			result = currNode.data;
			currNode = currNode.left;
		}
		return result;
	}

	max() {
		let currNode = this.#root;
		let result = null;
		while (currNode !== null) {
			result = currNode.data;
			currNode = currNode.right;
		}
		return result;
	}

	// toString() {
	// 	console.log(this.#root);
	// }
}

module.exports = {
	BinarySearchTree,
};

// const tree = new BinarySearchTree();
// tree.add(50);
// tree.add(51);
// tree.add(52);
// tree.add(53);
// tree.add(42);
// tree.add(41);
// tree.add(43);
// tree.add(41);
// console.log(tree.toString());
// console.log(tree.has(42));
// console.log(tree.has(53));
// console.log(tree.has(54));
// console.log(tree.has(33));
// console.log(tree.has(42));
// console.log(tree.has(42));
// tree.remove(41);
// tree.remove(52);
// tree.remove(53);
// console.log(tree.toString());
