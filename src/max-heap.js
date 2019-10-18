const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root === null){ return; }
		let detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
	}

	detachRoot() {		
		let rootBeforeDel = this.root;
		let rootId = this.parentNodes.indexOf(this.root);
        if(rootId >= 0 ){ this.parentNodes.splice(rootId, 1) };
		this.root = null;
		this.currentSize--;
		return rootBeforeDel;	
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes[this.parentNodes.length - 1];
		if(!lastNode){ return; }
        if(lastNode.parent && lastNode.parent.left === lastNode){ lastNode.parent.left = null; } 
		if(lastNode.parent && lastNode.parent.right === lastNode){ lastNode.parent.right = null; } 
		
        this.root = lastNode;
        if(detached.left){  detached.left.parent = lastNode;  }
        if(detached.right){ detached.right.parent = lastNode; }
        lastNode.left = detached.left;
        lastNode.right = detached.right;
		this.parentNodes.pop();
		
        if(this.parentNodes.length <= 1) {
        	this.parentNodes.unshift(lastNode)
        } else if(this.parentNodes.indexOf(lastNode.parent) < 0) {
        	this.parentNodes.unshift(lastNode.parent)
        }
	}

	size() {
	  return this.currentSize;
	}

	isEmpty() {
	  return (this.root === null) ? true : false ;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	insertNode(node) {
		if(!this.root){
			this.root = node;
			this.parentNodes.push(node);
			this.currentSize++;
		} else {
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].right === node){ this.parentNodes.shift(); }
			this.parentNodes.push(node); 
			this.currentSize++;
		}
	}

	shiftNodeUp(node) {
 		while(node.parent){
		   let indexOfCurNode = this.parentNodes.indexOf(node);
		   let prevNode = this.parentNodes.indexOf(node.parent);
			
		   if(prevNode >= 0 ){ this.parentNodes[prevNode] = node; }
		   if(indexOfCurNode >= 0){ this.parentNodes[indexOfCurNode] =  node.parent; }
           node.swapWithParent();
		   return this.shiftNodeUp(node);
		}
		this.root = node;
	}

	shiftNodeDown(node) {
		if(!node){ return; }
		while(node.left || node.right){ 

        let leftChildPriority =  (node.left)  ? node.left.priority : 0;
        let rightChildPriority = (node.right) ? node.right.priority : 0;
        let selectedChild = (leftChildPriority > rightChildPriority) ? node.left : node.right;
		if(node.priority > selectedChild.priority){ return; }
		
		let indexOfCurNode = this.parentNodes.indexOf(node);
		let prevNode = this.parentNodes.indexOf(selectedChild);
		if(indexOfCurNode >= 0){ this.parentNodes[indexOfCurNode] = selectedChild; }
		if(prevNode >= 0){ this.parentNodes[prevNode] = node; }

        selectedChild.swapWithParent();
        if(node === this.root) this.root = node.parent;
		return this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
