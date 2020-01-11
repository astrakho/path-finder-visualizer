import React, { useState, useEffect, useCallback } from "react";
import Square from "../Square/Square";
import "./Board.css";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { dijkstra } from "../../algorithms/dijkstra.js";

import { useSprings, animated } from 'react-spring';



function Board () {

  const currentStart = useState([10, 20]);
  const currentTarget = useState([10, 40]);
  let grid = useState(initializeGrid(currentStart, currentTarget));
  const isMouseDown = useState(false);

  function drawFrame() {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);
    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  };

  function moveStart(toRow, toCol) {
    this.scheduleUpdate({
      currentStart:{ 
        $set: [toRow, toCol] 
      }
    });
  };

  function moveTarget (toRow, toCol) {
    this.scheduleUpdate({
      currentTarget:{ 
        $set: [toRow, toCol] 
      }
    });
  };

  function handleMouseDown(row, col) {
    if(currentStart[0] === row && currentStart[1] === col){
      return;
    } else if(currentTarget[0] === row && currentTarget[1] === col){
      return;
    }
    const newGrid = toggleWall(grid, row, col);
    this.setState({grid: newGrid, isMouseDown: true});
  }

  function handleMouseEnter(row, col) {
    if(currentStart[0] === row && currentStart[1] === col){
      return;
    } else if(currentTarget[0] === row && currentTarget[1] === col){
      return;
    }
    if (!isMouseDown) return;
    const newGrid = toggleWall(grid, row, col);
    this.setState({grid: newGrid});
  }

  function handleMouseUp() {
    this.setState({isMouseDown: false});
  }

  //Run Algoerithms Handler
  function runDijkstra(){
    console.log("Pressed Button");
    dijkstra(grid, currentStart);
  }

  /*
  function animateDijkstra(){
     // NOT NEEDED: Store indicies of Each Square as a local ref, representing the order

    // Create Springs, each representing a square, handling its animation
    const [springs, setSprings, stop] = useSprings(50, index => ({ to: { color: "red" }}));

    // Feed springs new style data, they'll animate the view without causing a single render
    setSprings({to: { color: "red" }})

          {springs.map(props => <animated.div style={props} />)}


    // Distribute animated props among the view
  }*/

  let gridToShow = grid.map(function(row, r){
    return ( row.map((col, c) => {
      return (
        <Square
          key={`${r}-${c}`}
          row={r}
          col={c}
          currentStart = {currentStart}
          currentEnd ={currentTarget}
          isWall={grid[r][c].isWall}
          moveStart={(r, c) => moveStart(r, c)}
          moveTarget={(r, c) => moveTarget(r, c)}
          handleMouseDown={(r, c) => handleMouseDown(r, c)}
          handleMouseUp={(r, c) => handleMouseUp(r, c)}
          handleMouseEnter={(r, c) => handleMouseEnter(r, c)}
        />
      );
    }));
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <button onClick={() => this.runDijkstra()}>Visualize Dijkstra's</button>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${50}, 28px)`,
          justifyItems: "center"
        }}
      >
        {gridToShow.length > 0 ? gridToShow : "Sorry, Nothing to Display"}
      </div>
    </DndProvider>
  );

  // Wrapping an expensive Function Call in requestAnimationFrame
  function scheduleUpdate(updateFn) {
    this.pendingUpdateFn = updateFn;
    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

}

// Function to Initialize Grid
const initializeGrid = ([startRow, startCol], [endRow, endCol]) => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createSquare(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// Creates an Object, representing a Square's State
const createSquare = (r, c) => {
  return {
    row: r,
    col: c,
    isStart: false,
    isTarget: false,
    isWall: false
  };
};

export default Board;
