class Node {
	constructor(data, priority) {
		this.parent = null;
		this.right  = null;
		this.left   = null;
		this.data   = data;
		this.priority = priority;
	}


	appendChild(node) {
		if(!this.left){
			this.left = node;
			node.parent = this;
		} else if(!this.right){
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
	
		    if(this.parent.right === this){
			let leftNode = this.left;
			let rightNode = this.right;	
			let thisPar = this.parent;
			let thisParPar = this.parent.parent;
			let thisParLeft = this.parent.left;

			if(thisParLeft){ thisParLeft.parent = this; }
			
			if(thisParPar){ 
				if(thisParPar.right === thisPar){ thisParPar.right = this; }
				if(thisParPar.left === thisPar){ thisParPar.left = this; } 
			 }

			if(this.right){ this.right.parent = thisPar;}
			if(this.left){  this.left.parent = thisPar;}

			this.right = this.parent;
			this.left = thisParLeft;
			this.parent.parent = this;

			if(thisParPar){ 
				this.parent = thisParPar;
			 } else{
				this.parent = null;
			}

			thisPar.left  = leftNode;
			thisPar.right = rightNode;

		} else if(this.parent.left === this){
			let leftNode = this.left;
			let rightNode = this.right;	
			let thisPar = this.parent;
			let thisParPar = this.parent.parent;
			let thisParRight = this.parent.right;

			if(thisParRight){ thisParRight.parent = this ; }

			if(thisParPar){ 
			   if(thisParPar.right === thisPar){ thisParPar.right = this; }
			   if(thisParPar.left === thisPar){ thisParPar.left = this; } 
			}

			if(this.right){ this.right.parent = thisPar;}
			if(this.left) { this.left.parent = thisPar; }

			this.right = thisParRight;
			this.left = this.parent;
			this.parent.parent = this;

			if(thisParPar){ 
				this.parent = thisParPar; 
			}else{
				this.parent = null;
			}

			thisPar.left  = leftNode;
			thisPar.right = rightNode;
		}
	}
}

module.exports = Node;
