/*
 * Graph is an Array of Arrays
 * Source is an Array  with two elements
 */

export function dijkstra(grid, source, target) {
  const [sourceX, sourceY] = source;

  // The output array.  dist[i] will hold the shortest distance from src to each Node
  let dist = [];

  // Array of Unvisited Nodes
  let unVisitedNodes = [];

  // Array of Visited Nodes used for Animation
  let visitedNodesInOrder = [];

  // Array to Store Previous Nodes
  let prev = [];

  // Populate unVisitedNodes with every vertex from Graph
  unVisitedNodes = flattenGraph(grid, source);

  // Set Starting Node distance to 0
  unVisitedNodes[sourceX * 50 + sourceY].distance = 0;

  while (unVisitedNodes.length > 0) {
    // Sort Nodes with Shortest distance coming
    sortNodesByDistance(unVisitedNodes);

    // Remove Picked Node from Unvisited Array, essentially marking a Node visited
    let minNode = unVisitedNodes.shift();

    // Stop if popped node has distance of infinity
    if (minNode.distance === Infinity) {
      break;
    }

    let neighbors = getNeighbors(minNode, grid);

    // For each neighboring Node, update distances if needed
    for (const v of neighbors) {
      // Skip Iteration for Walls
      if (v.isWall === true) {
        continue;
      }

      let alt = minNode.distance + 1;

      // Assign Distances
      if(alt < v.distance){
        v.distance = alt;
        v.prev = minNode;
      }

      // Append to Visited Array for later animation
      if (v.isVisited == null) {
        visitedNodesInOrder.push(v);
        v.isVisited = true;
        // Stop if neighbor node id target
        if (v.row === target[0] && v.col === target[1]) {
          v.prev = minNode;
          return [visitedNodesInOrder, getShortestPath(v)];
        }
      }
    }
  }

  return [visitedNodesInOrder];
}

// Flattens the Graph and assigns Distance of Infinity to each square
// Needs refactoring to use declarative style as opposed to a double for loop
function flattenGraph(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      nodes.push(node);
    }
  }
  return nodes;
}

function getNeighbors(node, grid) {
  let neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

// Sort Nodes By Distance
function sortNodesByDistance(dNodes) {
  dNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Return Array of Nodes in Shortest Path
function getShortestPath(target){
  let shortestPath = [];
  let curNode = target;
  while(curNode != null){
    shortestPath.unshift(curNode);
    curNode = curNode.prev;
  }
  return shortestPath;
}