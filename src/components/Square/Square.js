import React, { Component } from "react";
import "./Square.css";
import Start from "../../icons/start";

class Square extends Component {
  render() {
    const { row, col, isStart, isTarget, onClick } = this.props;

    return (
      <div
        className="Square"
        id={`node-${row}-${col}`}
        onClick={() => onClick(row, col)}
      >
        {isStart === true ? <Start /> : null}
      </div>
    );
  }
}

export default Square;
