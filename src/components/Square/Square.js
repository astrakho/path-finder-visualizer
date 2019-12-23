import React, { useState, useEffect, useCallback } from "react";
import "./Square.css";
import Start from "../../icons/start";
import Target from "../../icons/target";

import { ItemTypes } from "../../constants/itemTypes";
import { useDrop } from "react-dnd";
import { enumDeclaration } from "@babel/types";

// Square is a functional component, utilizing hooks

function Square ({row, col, currentStart, currentEnd, moveStart, moveTarget,
  isWall, handleMouseDown, handleMouseUp, handleMouseEnter}){

    const [startRow, startCol] = currentStart; 
    const [targetRow, targetCol] = currentEnd;

    const isStart = row === startRow && col === startCol;
    const isTarget = row === targetRow && col === targetCol;

    const renderWall = isWall===true? {backgroundColor: "black"}:{};

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
          style={renderWall}
          id={`node-${row}-${col}`}
          onMouseDown={()=>handleMouseDown(row, col)}
          onMouseUp={()=>handleMouseUp(row, col)}
          onMouseEnter={()=>handleMouseEnter(row, col)}
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
  }

function wallStayedTheSame(prevSquare, nextSquare){
  if(prevSquare.isWall === nextSquare.isWall){
    return true;
  } else{
    return false;
  }
}


export default React.memo(Square, wallStayedTheSame);
