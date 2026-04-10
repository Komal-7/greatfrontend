import {useState, useEffect} from 'react';

export default function App() {
  const [allBars, setAllBars] = useState([])
  function handleAdd(){
    setAllBars((prev)=>[...prev, {id:Date.now()}])
  }
  return (
    <div>
      <button onClick={()=>handleAdd()}>Add</button>
      {allBars.map((bar)=>(
        <Progress key={bar.id} />
      ))}

    </div>
  );
}

function Progress() {
  const duration = 2000, intervalMS = 100;
  const updateMS = duration/intervalMS, increment = 100/updateMS;
  const [progress,setProgress] = useState(0)
  useEffect(()=>{
    const interval = setInterval(()=>{
      setProgress((prev)=>{
        if(prev >=100){
          clearInterval(interval);
          return 100
        }
        return prev + increment
      })
    },intervalMS)

    return () => clearInterval(interval)
  },[])
  return (
    <>
      <br />
      <div style={{width: '400px', height: '10px', backgroundColor: 'grey'}}>
        <div style={{width: `${progress}%`, height:'100%', backgroundColor: 'green'}}></div>
      </div>
    </>
  )
}
