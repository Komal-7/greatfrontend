//App.js

import StarRating from './StarRating';

export default function App() {
  return (
    <div>
      <StarRating max={5} current={3}/>
    </div>
  );
}

//StarRating.js
import React, { useState } from 'react';

export default function StarRating(props) {
  const { max, current } = props;
  const [selectedValue, setSelectedValue] = useState(current-1);
  const [mouseValue, setMouseValue] = useState(null)

  return (
    <div>
      {[...Array(max)].map((_,index)=>{
        const isFilled = (mouseValue!== null) ? (index<=mouseValue) : (index <= selectedValue);
        return (
          <button className={"star-button"} key={index} onClick={()=>setSelectedValue(index)}
          onMouseEnter={()=>setMouseValue(index)}
          onMouseLeave={()=>setMouseValue(null)}
          aria-label={`Rate ${index+1} star`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={isFilled ? "star-icon star-icon-filled" : "star-icon" }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        )
      })}
      <br />
      
    </div>
  );
}

//style.css

body {
  font-family: sans-serif;
}

.star-icon {
  --icon-size: 32px;

  cursor: pointer;
  height: var(--icon-size);
  width: var(--icon-size);
}

.star-icon-filled {
  fill: yellow;
}

.star-button {
  border:none;
  background: none;
  padding: 0;
}

