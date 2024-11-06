function Queue() {
  let head = null;
  let tail = null;
  let size = 0;

  const Node = (data, path) => {
    return {
      data,
      path,
      nextNode: null,
    };
  };

  const enqueue = (data, path) => {
    size++;
    const newNode = Node(data, path);
    if (!head) {
      head = newNode;
    }

    if (!tail) {
      tail = newNode;
    } else {
      tail.nextNode = newNode;
      tail = tail.nextNode;
    }
  };

  const dequeue = () => {
    size--;
    const temp = head;
    head = head ? head.nextNode : null;
    temp.nextNode = null;
    return temp;
  };

  const isEmpty = () => {
    return size === 0;
  };

  const toString = () => {
    let current = head;
    let string = "";

    while (current !== null) {
      string += `${current.data} | ${current.path} -> `;
      current = current.nextNode;
    }

    return string;
  };

  return {
    enqueue,
    dequeue,
    isEmpty,
    toString,
  };
}

export { Queue };
