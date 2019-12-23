import React, { Component } from "react";
import Square from "../Square/Square";
import "./Board.css";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";


class Board extends Component {
  constructor() {
    super();
    this.drawFrame = () => {
      const nextState = update(this.state, this.pendingUpdateFn);
      this.setState(nextState);
      this.pendingUpdateFn = undefined;
      this.requestedFrame = undefined;
    };
    this.moveStart = (toRow, toCol) => {
      this.scheduleUpdate({
        currentStart:{ 
          $set: [toRow, toCol] 
        }
      });
    };
    this.moveTarget = (toRow, toCol) => {
      this.scheduleUpdate({
        currentTarget:{ 
          $set: [toRow, toCol] 
        }
      });
    };
    this.state = {
      grid: [],
      currentStart: [],
      currentTarget: [],
      isMouseDown: false
    };
  }

  componentDidMount() {
    const start = [10, 20];
    const target = [10, 40];
    const grid = initializeGrid(start, target);
    this.setState({
      grid: grid,
      currentStart: start,
      currentTarget: target,
      isMouseDown: false,
    });
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  handleMouseDown(row, col) {
    console.log('Mouse Down');
    const newGrid = toggleWall(this.state.grid, row, col);
    this.setState({grid: newGrid, isMouseDown: true});
  }

  handleMouseEnter(row, col) {
    console.log('Mouse Entered');
    if (!this.state.isMouseDown) return;
    const newGrid = toggleWall(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    console.log('Mouse Up');
    this.setState({isMouseDown: false});
  }

  render() {
    let gridToShow = this.state.grid.map((row, r) => {
      return row.map((col, c) => {
        return (
          <Square
            key={`${r}-${c}`}
            row={r}
            col={c}
            currentStart = {this.state.currentStart}
            currentEnd ={this.state.currentTarget}
            isWall={this.state.grid[r][c].isWall}
            moveStart={(r, c) => this.moveStart(r, c)}
            moveTarget={(r, c) => this.moveTarget(r, c)}
            handleMouseDown={(r, c) => this.handleMouseDown(r, c)}
            handleMouseUp={(r, c) => this.handleMouseUp(r, c)}
            handleMouseEnter={(r, c) => this.handleMouseEnter(r, c)}
          />
        );
      });
    });

    return (
      <DndProvider backend={HTML5Backend}>
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
  }

  // Wrapping an expensive Function Call in requestAnimationFrame
  scheduleUpdate(updateFn) {
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
