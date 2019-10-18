const MaxHeap = require('./max-heap.js');
class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = (!maxSize) ? 30 : maxSize; 
		this.heap = new MaxHeap();
		this.currentSize = 0;
	}

	push(data, priority) {
		let errorMsExceeded = {failure : 'Max Size exceeded'}
		if(this.currentSize === this.maxSize){ throw new Error(errorMsExceeded.failure); }
		this.heap.push(data, priority);	
		this.currentSize++;
	}

	shift() {
		let errorNoNodeToDel = {failure: 'No Node To Delete'};
		if(this.currentSize === 0) { throw new Error (errorNoNodeToDel.failure); }
		let hip_hop = this.heap.pop();
		this.currentSize--;
		return hip_hop;
	}

	size() {
	  return this.currentSize;
	}

	isEmpty() {
		return (this.currentSize) ? false : true;
	}
}

module.exports = PriorityQueue;
