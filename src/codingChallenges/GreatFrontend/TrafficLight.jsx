import {useEffect, useState} from 'react';

export default function TrafficLight() {

const [light, setLight] = useState("green");

useEffect(()=> {

let timer;

if(light === "green"){
  timer = setTimeout(()=> setLight("yellow"), 3000)
}
else if(light === "yellow"){
  timer = setTimeout(()=> setLight("red"), 500)
}
else if(light === "red"){
  timer = setTimeout(()=> setLight("green"), 4000)
}

return () => {
  clearInterval(timer);
}

}, [light]);

  return(
<>
    <div className="parent">
         <div className = "light" style={{backgroundColor:light === "red" ? "red": "gray"}}> </div>
         <div className = "light" style={{backgroundColor:light === "yellow" ? "yellow": "gray"}}> </div>
          <div className="light" style={{backgroundColor:light === "green" ? "green": "gray"}}> </div>
     </div>
</>
  ) 
}
