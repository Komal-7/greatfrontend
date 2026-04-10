import { useState } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [curr, setCurr] = useState(0)
  return (
    <>
    <div style={{maxHeight:'400px', maxWidth:'600px', width:'100%', display:'flex', alignItems: 'center', justifySelf: 'center', backgroundColor: 'black'}}>
      <button onClick={()=>setCurr((prev)=>(prev===0) ? images.length -1 : prev-1)}> {"<<"} </button>
        <img key={images[curr].src} alt={images[curr].alt} src={images[curr].src} style={{flex:1, minWidth:0, objectFit:'contain'}}/>
      <button onClick={()=>setCurr((prev)=>(prev===images.length -1) ? 0 : prev+1)}> {">>"} </button>
    </div>
    <br />
    <div>
      {images.map((_,index)=>(
        <span key={index} style={{padding: 5}}>
        <button onClick={()=>setCurr(index)}>
          {index+1}
        </button>
        </span>
      ))}
      </div>
    </>
  );
}
