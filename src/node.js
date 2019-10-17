class Node {
	constructor(data, priority) {
		this.parent = null;
		this.right  = null;
		this.left   = null;
		this.data   = data;
		this.priority = priority;
	}


	appendChild(node) {
		if(this.data > node.data){
			if(this.left !== null){
			   if(this.left.data > node.data){
				  this.left.left = node;
				  node.parent = this.left;
			   }else {
				 this.left.right = node;
				 node.parent = this.left;
			   }
			   return;
			}
			this.left = node;
			node.parent = this;
		} else if( this.data < node.data){
			if(this.right !== null){
				if(this.right.data > node.data){
				   this.right.left = node;
				   node.parent = this.right;
				}else {
				  this.right.right = node;
				  node.parent = this.right;
				}
				return;
			 }
			this.right = node;
			node.parent = this;
		} else {
			return;
		}
	}

	removeChild(node) {
		let errorNoSuchNode = {failure: 'Specific Node does not exist'};
		if(this.data > node.data && this.left.data === node.data){
			this.left = null;
			node.parent = null; return;
		} else if(this.data < node.data && this.right.data === node.data){
			this.right = null;
			node.parent = null; return;
		}
		throw new Error(errorNoSuchNode.failure);
	}

	remove() {
		if(this.parent === null){ return; }
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent === null){ return };
	
		if(this.parent.data > this.data){
			this.right = this.parent;
			this.parent.left = null;
			this.parent = this.parent.parent;
			this.right.parent = this;


		} else if(this.parent.data < this.data){
			this.left = this.parent;
			this.parent.rights = null;
			this.parent = this.parent.parent;
			this.left.parent = this;
		}
	}
}

const root = new Node(42, 15);
const left = new Node(13, 42);
const right = new Node(0, 1);
const childOfLeft = new Node(0, 15);

root.appendChild(left);
root.appendChild(right);
left.appendChild(childOfLeft);

left.swapWithParent();
module.exports = Node;
