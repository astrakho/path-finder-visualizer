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
    this.moveItem = (toRow, toCol) => {
      const { grid, currentStart, currentTarget } = this.state;

      this.scheduleUpdate({
        grid: {
          [toRow]: {
            [toCol]: {
              isStart: {
                $set: true
              }
            }
          }
        }
      });
    };
    this.state = {
      grid: [],
      currentStart: [],
      currentTarget: []
    };
  }

  componentDidMount() {
    const start = [10, 20];
    const target = [10, 40];
    const grid = initializeGrid(start, target);
    this.setState({
      grid: grid,
      currentStart: start,
      currentTarget: target
    });
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  render() {
    let gridToShow = this.state.grid.map((row, r) => {
      return row.map((col, c) => {
        return (
          <Square
            key={`${r}-${c}`}
            row={r}
            col={c}
            isStart={this.state.grid[r][c].isStart}
            isTarget={this.state.grid[r][c].isTarget}
            moveItem={(r, c) => this.moveItem(r, c)}
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

  // Add Default Start and Target
  grid[startRow][startCol].isStart = true;
  grid[endRow][endCol].isTarget = true;

  return grid;
};

// Creates an Object, representing a Square's State
const createSquare = (r, c) => {
  return {
    row: r,
    col: c,
    isStart: false,
    isTarget: false
  };
};

export default Board;
