import React, { Component } from "react";
import Square from "../Square/Square";
import "./Board.css";
import { throwStatement } from "@babel/types";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = initializeGrid();
    this.setState({ grid });
  }

  handleMouseClick(row, col) {
    const newGrid = updateGridImmutably(this.state.grid, row, col);
    this.setState({ grid: newGrid });
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
            onClick={(r, c) => this.handleMouseClick(r, c)}
          />
        );
      });
    });

    return (
      <div className="Board">
        {gridToShow.length > 0 ? gridToShow : "Sorry, Nothing to Display"}
      </div>
    );
  }
}

// Function to Initialize Grid
const initializeGrid = () => {
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

// Creates an Objrct, representing a Square's State
const createSquare = (r, c) => {
  return {
    row: r,
    col: c,
    isStart: false
  };
};

// Updates Grid Immutably, by creating a new grid reference
const updateGridImmutably = (grid, r, c) => {
  const newGrid = grid.slice(); // Return a shallow copy of an array
  const square = newGrid[r][c];
  const newSquare = {
    ...square,
    isStart: !square.isStart
  };
  newGrid[r][c] = newSquare;
  return newGrid;
};

export default Board;
