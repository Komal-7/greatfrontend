import { useState } from 'react';

export default function App() {
  const [chanceOfX, setChanceOfX] = useState(true);
  const [grid, setGrid] = useState([["","",""],["","",""],["","",""]])
  const [status,setStatus] = useState("")
  const handleReset = () =>{
    setChanceOfX(true);
    setGrid([["","",""],["","",""],["","",""]]);
    setStatus("")
  }
  const handleClick = (i,j) => {
    console.log(i,j)
    if(!grid[i][j]){
      const newGrid = grid.map(row => [...row]);
      newGrid[i][j] = (chanceOfX) ? "X" : "O"
      setGrid(newGrid);
      setChanceOfX((prev)=>!prev)
      //horizontal
    if(newGrid[0][0] && newGrid[0][0] === newGrid[0][0+1] && newGrid[0][0+1] === newGrid[0][0+2]){
      setStatus(newGrid[0][0]);
      return
    }
    if(newGrid[1][0] && newGrid[1][0] === newGrid[1][0+1] && newGrid[1][0+1] === newGrid[1][0+2]){
      setStatus(newGrid[1][0]);
      return
    }
    if(newGrid[2][0] && newGrid[2][0] === newGrid[2][0+1] && newGrid[2][0+1] === newGrid[2][0+2]){
      setStatus(newGrid[2][0]);
      return
    }

    //vertical
    if(newGrid[0][0] && newGrid[0][0] === newGrid[1][0] && newGrid[1][0] === newGrid[2][0]){
      setStatus(newGrid[0][0]);
      return
    }
    if(newGrid[0][1] && newGrid[0][1] === newGrid[1][1] && newGrid[1][1] === newGrid[2][1]){
      setStatus(newGrid[0][1]);
      return
    }
    if(newGrid[0][2] && newGrid[0][2] === newGrid[1][2] && newGrid[1][2] === newGrid[2][2]){
      setStatus(newGrid[0][2]);
      return
    }

    //diagonal
    if(newGrid[0][0] && newGrid[0][0] === newGrid[1][1] && newGrid[1][1] === newGrid[2][2]){
      setStatus(newGrid[0][0]);
      return
    }
    if(newGrid[0][2] && newGrid[0][2] === newGrid[1][1] && newGrid[1][1] === newGrid[2][0]){
      setStatus(newGrid[0][2]);
      return
    }
      const isDraw = newGrid.flat().every(cell=>cell!=="");
      if(isDraw){
        setStatus("draw")
      }
    }
  }

  return (
    <>
      {status==="draw" ? <>DRAW</> : (Boolean(status) ? <>Player {status} wins</> : <><div>Player {chanceOfX ? "X" : "O"} turn</div></>)}
      <br />
      {grid.map((i,iIndex)=>
        (
          <>
          {i.map((j,jIndex)=>(
            <>
              <button disabled={Boolean(status)} onClick={()=>handleClick(iIndex,jIndex)} style={{width:100,height:100,verticalAlign:"top"}}>
                {j}
              </button>
            </>
          ))}
          <br />
          </>
        )
      )}
      <br />
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
