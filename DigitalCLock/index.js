import {useState,useEffect} from 'react';

const SEGMENTS = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

export default function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(()=>{
    const timer = setInterval(()=>{
      setTime(new Date())
    },1000)
    return ()=> clearInterval(timer)
  },[])
  const hh = time.getHours().toString().padStart(2,"0")
  const mm = time.getMinutes().toString().padStart(2,"0")
  const ss = time.getSeconds().toString().padStart(2,"0")
  const showTime = `${hh}${mm}${ss}`.split("").map(Number)
  
  return (
    <div style={{display:'flex'}}>
    {showTime.map((value,index)=>(
      <Digit key={index} num={value}/>
    ))}
    </div>
  );
}

function Digit({num}) {
  const seg = SEGMENTS[num];

  return (
    <div style={{ position: "relative", width: 40, height: 70, margin: 4 }}>
      {/* top */}
      <div style={{ opacity: seg[0] ? 1 : 0.1, position: "absolute", top: 0, left: 10, width: 20, height: 5, background: "red" }} />

      {/* top-right */}
      <div style={{ opacity: seg[1] ? 1 : 0.1, position: "absolute", top: 5, right: 0, width: 5, height: 25, background: "red" }} />

      {/* bottom-right */}
      <div style={{ opacity: seg[2] ? 1 : 0.1, position: "absolute", bottom: 5, right: 0, width: 5, height: 25, background: "red" }} />

      {/* bottom */}
      <div style={{ opacity: seg[3] ? 1 : 0.1, position: "absolute", bottom: 0, left: 10, width: 20, height: 5, background: "red" }} />

      {/* bottom-left */}
      <div style={{ opacity: seg[4] ? 1 : 0.1, position: "absolute", bottom: 5, left: 0, width: 5, height: 25, background: "red" }} />

      {/* top-left */}
      <div style={{ opacity: seg[5] ? 1 : 0.1, position: "absolute", top: 5, left: 0, width: 5, height: 25, background: "red" }} />

      {/* middle */}
      <div style={{ opacity: seg[6] ? 1 : 0.1, position: "absolute", top: 32, left: 10, width: 20, height: 5, background: "red" }} />
    </div>
  )
}
