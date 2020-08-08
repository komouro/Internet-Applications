class Stack {
  constructor() {
    this.stack = new Array();
  }

  push(e) {
    this.stack.push(e);
  }

  pop() {
    if (this.stack.length == 0) return "Stack is empty!";
    return (this.stack.pop());
  }

  isEmpty() {
    return (this.stack.length == 0);
  }

  length() {
    return this.stack.length;
  }
}



module.exports = Stack;
