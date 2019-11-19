import React, { Component } from "react";
import "./Square.css";
import Start from "../../icons/start";

class Square extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isStart === nextProps.isStart) {
      return false;
    } else {
      return true;
    }
  }

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
