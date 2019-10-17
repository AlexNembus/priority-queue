const MaxHeap = require('./max-heap.js');

// class Priority
class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = (!maxSize) ? 30 : maxSize; 
		this.heap = new MaxHeap();
		this.arr =  new Map();
		this.currentSize = 0;
	}

	push(data, priority) {
		let errorMsExceeded = {failure : 'Max Size exceeded'}
		if(this.currentSize === this.maxSize){ throw new Error(errorMsExceeded.failure); }
		this.heap.push(data, priority);	
		this.arr.set(data, priority);
		this.currentSize++;
	}

	shift() {
		this.heap.pop();
		function compare(a, b) {
			if (a[1] < b[1]) return 1;
			if (a[1] == b[1]) return 0 ;
			if (a[1] > b[1]) return -1; }
		  
		this.arr = new Map([...this.arr.entries()].sort(compare));
		let mapIteratorKeys = this.arr.keys();
		let mapIteratorEntr = this.arr.entries();
		let value = mapIteratorEntr.next().value[0];
		this.arr.delete(mapIteratorKeys.next().value);
		this.currentSize--;
		return value;
	}

	size() {
	  return this.currentSize;
	}

	isEmpty() {
		return (this.currentSize) ? false : true;
	}
}

module.exports = PriorityQueue;
