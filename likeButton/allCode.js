//App.js
import { HeartIcon, SpinnerIcon } from './icons';
import {useState} from 'react'
export default function App() {
  const [curr,setCurr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered,setHovered] = useState(false);
  const [error, setError] = useState('');;
  async function handleClick(){
    try{
      setLoading(true);
      const response = await fetch(`https://questions.greatfrontend.com/api/questions/like-button`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: (curr) ? 'unlike' : 'like'})
      })
      if(response.ok){
        setCurr((prev)=>!prev)
        setError('')
      }else{
        const e = await response.json()
        setError(e.message)
      }
    }catch(e) {
      console.log(e.message)
      
    } finally {
      setLoading(false)
    }
  }
  const currClass = ((curr || hovered) ? 'redLine ' : 'greyLine ') + ((curr) ? 'redFill ' : 'greyFill')
  return (
    <div onClick={()=>handleClick()} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {loading && (
        <button className={currClass}>
          <SpinnerIcon /> Like
        </button>
      )}
      {!loading && (
        <button className={currClass}>
          <HeartIcon /> Like
        </button>
      )}
      <br/>{error && <div>{error}</div>}
    </div>
  );
}


//styles.css
body {
  font-family: sans-serif;
}

.redLine{
  border: 2px solid red;
}

.greyLine{
  border: 2px solid grey;
}

.redFill {
  background-color: red;
}

.greyFill{
  background-color: white;
}
