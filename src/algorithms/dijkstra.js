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

  // Populate unVisitedNodes with every vertex from Graph
  unVisitedNodes = flattenGraph(grid, source);

  // Set Starting Node distance to 0
  unVisitedNodes[(sourceX*49) + sourceY].distance = 0;

  while (unVisitedNodes.length > 0){

    // Get Node with Shortest distance
    sortNodesByDistance(unVisitedNodes);
    
    // Remove Picked Node from Unvisited Array, essentially marking a Node visited
    let minNode = unVisitedNodes.shift();

    let neighbors = getNeighbors(minNode);

    // For each neighboring Node, update distances if needed
    for(const v of neighbors){
      v.distance = minNode.distance + 1;
    }

    // Mark expored Nodes as green

    

  }

  // Return an array of distances

}

// Flattens the Graph and assigns Distance of Infinity to each square
// Needs refactoring to use declarative style as opposed to a double for loop
function flattenGraph(grid){
  const squares = [];
  for (const row of grid){
    for (const square of row){
      const newSquare = {
        ...square,
        distance: Infinity
      }
      squares.push(newSquare);
    }
  }
  return squares;
}

function getNeighbors(node, unVisitedNodes) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(unVisitedNodes[row - 1][col]);
  if (row < unVisitedNodes.length - 1) neighbors.push(unVisitedNodes[row + 1][col]);
  if (col > 0) neighbors.push(unVisitedNodes[row][col - 1]);
  if (col < unVisitedNodes[0].length - 1) neighbors.push(unVisitedNodes[row][col + 1]);
  return neighbors;
}

// Sort Nodes By Distance
function sortNodesByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
