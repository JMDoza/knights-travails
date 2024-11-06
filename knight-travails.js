import { Queue } from "./queue.js";

const Knight = (position) => {
  let currentPos = position;

  const direction = [
    [2, -1],
    [2, 1],
    [1, 2],
    [1, -2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [-1, 2],
  ];

  const getCurrentPos = () => {
    return currentPos;
  };

  const getNeighbors = (x = currentPos[0], y = currentPos[1]) => {
    let neighbors = direction.map(([dx, dy]) => [x + dx, y + dy]);
    neighbors = neighbors.filter(([x, y]) => {
      return x >= 0 && y >= 0 && x < 8 && y < 8;
    });
    return neighbors;
  };

  const move = (position) => {
    const validMoves = getNeighbors();
    const x = position[0];
    const y = position[1];
    validMoves.forEach(([dx, dy]) => {
      if (x == dx && y == dy) {
        currentPos = position;
        console.log("Moved!");
      }
    });
    if (currentPos[0] !== x && currentPos[1] !== y) {
      console.log("not a valid move");
    }
  };

  const moveTo = (position) => {
    let visited = Array.from({ length: 8 }, () => Array(8).fill(false));

    let queue = Queue();
    queue.enqueue(currentPos, [currentPos]);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      const x = current.data[0];
      const y = current.data[1];
      const path = current.path;
      visited[x][y] = true;

      if (x === position[0] && y === position[1]) {
        currentPos = position;
        console.log(
          `You made it in ${current.path.length} moves! Here is your Path:`
        );
        current.path.forEach((position) => {
          console.log(position);
        });
        return;
      }

      let validMoves = getNeighbors(x, y);
      validMoves.forEach((position) => {
        if (!visited[position[0]][position[1]]) {
          queue.enqueue(position, [...path, position]);
        }
      });
    }
  };

  return {
    getCurrentPos,
    getNeighbors,
    move,
    moveTo,
  };
};

const knight = Knight([0, 0]);

knight.move([2, 1]);
knight.move([0, 2]);
knight.moveTo([7, 7]);
console.log(knight.getCurrentPos());
console.log();
