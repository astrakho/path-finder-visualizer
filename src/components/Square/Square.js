import React, { useState, useEffect, useCallback } from "react";
import "./Square.css";
import Start from "../../icons/start";
import Target from "../../icons/target";

import { ItemTypes } from "../../constants/itemTypes";
import { useDrop } from "react-dnd";
import { enumDeclaration } from "@babel/types";

// Square is a functional component, utilizing hooks

const Square = React.memo(props => {
  const { row, col, currentStart, currentEnd, moveStart, moveTarget} = props;

  const [startRow, startCol] = currentStart; 
  const [targetRow, targetCol] = currentEnd;

  const isStart = row === startRow && col === startCol;
  const isTarget = row === targetRow && col === targetCol;

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.START, ItemTypes.TARGET],
    drop: function (i){
      if(i.type === 'start'){
        moveStart(row, col, i.type);
      } else if(i.type === 'target'){
        moveTarget(row, col);
      }
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        className="Square"
        id={`node-${row}-${col}`}
      >
        {isStart === true ? <Start /> : null}
        {isTarget === true ? <Target /> : null}
      </div>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        />
      )}
    </div>
  );
});

export default Square;
