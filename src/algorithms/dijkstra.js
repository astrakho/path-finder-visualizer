/*
 * Graph is an Array of Arrays
 * Source is an Array  with two elements
 */

export function dijkstra(grid, source) {
  const [sourceX, sourceY] = source;

  // The output array.  dist[i] will hold the shortest distance from src to each Node
  let dist = [];

  // Array of Unvisited Nodes
  let unVisitedNodes = [];

  // Array of Visited Nodes used for Animation
  let visitedNodesInOrder = [];

  // Populate unVisitedNodes with every vertex from Graph
  unVisitedNodes = flattenGraph(grid, source);

  // Set Starting Node distance to 0
  unVisitedNodes[sourceX * 50 + sourceY].distance = 0;

  while (unVisitedNodes.length > 0) {
    // Sort Nodes with Shortest distance coming
    sortNodesByDistance(unVisitedNodes);

    // Remove Picked Node from Unvisited Array, essentially marking a Node visited
    let minNode = unVisitedNodes.shift();

    let neighbors = getNeighbors(minNode, grid);

    // For each neighboring Node, update distances if needed
    for (const v of neighbors) {
      if (v.isWall === true) {
        continue;
      }
      v.distance = minNode.distance + 1;
      v.prev = minNode;
      if (v.isVisited == null) {
        visitedNodesInOrder.push(v);
        v.isVisited = true;
      }
    }
  }

  // Return an array of distances
  return visitedNodesInOrder;
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
