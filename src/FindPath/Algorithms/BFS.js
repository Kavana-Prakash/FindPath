// // Returns all nodes in the order in which they were visited.
// // Make nodes point back to their previous node so that we can compute the shortest path
// // by backtracking from the finish node.

// export function bfs(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   let nextNodesStack = [startNode];
//   while (nextNodesStack.length) {
//     const currentNode = nextNodesStack.shift();
//     if (currentNode === finishNode) return visitedNodesInOrder;

//     if (
//       !currentNode.isWall &&
//       (currentNode.isStart || !currentNode.isVisited)
//     ) {
//       currentNode.isVisited = true;
//       visitedNodesInOrder.push(currentNode);
//       const {col, row} = currentNode;
//       let nextNode;
//       if (row > 0) {
//         nextNode = grid[row - 1][col];
//         if (!nextNode.isVisited) {
//           nextNode.previousNode = currentNode;
//           nextNodesStack.push(nextNode);
//         }
//       }
//       if (row < grid.length - 1) {
//         nextNode = grid[row + 1][col];
//         if (!nextNode.isVisited) {
//           nextNode.previousNode = currentNode;
//           nextNodesStack.push(nextNode);
//         }
//       }
//       if (col > 0) {
//         nextNode = grid[row][col - 1];
//         if (!nextNode.isVisited) {
//           nextNode.previousNode = currentNode;
//           nextNodesStack.push(nextNode);
//         }
//       }
//       if (col < grid[0].length - 1) {
//         nextNode = grid[row][col + 1];
//         if (!nextNode.isVisited) {
//           nextNode.previousNode = currentNode;
//           nextNodesStack.push(nextNode);
//         }
//       }
//     }
//   }
//   // return visitedNodesInOrder;
// }

export function bfs(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
    for (let unvisitedNeighbour of unvisitedNeighbours) {
      unvisitedNeighbour.previousNode = closestNode;
      if (neighbourNotInUnvisitedNodes(unvisitedNeighbour, unvisitedNodes)) {
        unvisitedNodes.push(unvisitedNeighbour);
      }
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}

export function getNodesInShortestPathOrderBFS(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}