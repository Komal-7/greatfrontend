import {useState, useEffect} from 'react'

export default function Stopwatch() {
  const [started,setStarted] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(0);
  
  useEffect(()=>{
    
    if(!started){return}
    const startTime = new Date() - elapsedTime;
      const timer = setInterval(()=>{
          setElapsedTime(new Date() - startTime)
      },1)
      
      return ()=>clearInterval(timer)
    
  },[started])

  const sec = Math.floor(elapsedTime/1000);
  const ms = elapsedTime % 1000
  return (
    <div>
      <p>{sec}s {ms}ms</p>
      <div>
        <button onClick={()=>setStarted((prev)=>!prev)}>{started ? 'Stop' : 'Start'}</button> <button onClick={()=>{setElapsedTime(0);setStarted(false)}}>Reset</button>
      </div>
      <></>
    </div>
  );
}
