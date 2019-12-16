import React from 'react';

import { ItemTypes } from '../constants/itemTypes';
import { useDrag } from 'react-dnd';


import "./StartWrapper.css";

// Returns an SVG created by Font Awesome

function Start(){
  const [{isDragging}, drag] = useDrag({
    item: { id: 'start', type: ItemTypes.START },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })
  return( <div className = "StartWrapper" ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontWeight: 'bold',
            cursor: 'move',
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"/></svg>
          </div>)
}

export default Start;