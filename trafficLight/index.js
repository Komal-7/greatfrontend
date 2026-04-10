import {useState, useEffect} from 'react';
export default function TrafficLight() {
  const [curr,setCurr] = useState('red')

  useEffect(()=>{
    const timeInterval = (curr === 'red') ? 4000 : ((curr==='yellow') ? 500 : 3000) ;
    const nextValue = (curr === 'red') ? 'yellow' : ((curr==='yellow') ? 'green' : 'red') ;
    const timeout = setTimeout(()=>{
      setCurr(nextValue)
    },timeInterval)
    return () => clearTimeout(timeout)
  },[curr])
  return (
    <>
      <div>Render your Traffic Light here.</div>
      <div style={{width:'50px', height:'50px', backgroundColor:'red', opacity: (curr==='red' ? '100%' : '20%')}}></div>
      <br />
      <div style={{width:'50px', height:'50px', backgroundColor:'yellow', opacity: (curr==='yellow' ? '100%' : '20%')}}></div>
      <br />
      <div style={{width:'50px', height:'50px', backgroundColor:'green', opacity: (curr==='green' ? '100%' : '20%')}}></div>
      <br />
    </>
    );
}
