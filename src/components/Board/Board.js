import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css'

class Board extends Component {
  constructor(){
    super();
    this.state = {
      grid: []
    };
  }
  
  componentDidMount() {
    const grid = initializeGrid();
    this.setState({grid});
  }

  render(){
    return(
      <div className='Board'>
        {this.state.grid}
      </div>
    )
  }
}

const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createSquare(row, col));
    }
    grid.push(currentRow);
  }
  console.log(grid);
  return grid;
};

const createSquare = (r, c) => {
  return <Square row={r} col={c} isStart = {false}/>
}

export default Board;
