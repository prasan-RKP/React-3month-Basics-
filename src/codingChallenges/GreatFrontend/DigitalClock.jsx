import {useEffect, useState}  from 'react';

export default function DigitalClock() {

     const [time, setTime] = useState(new Date());


      useEffect(()=> {
        const timer = setInterval(()=> {
          setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
      }, []);

   
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
  return( 
    <div className="clock">{hours}:{minutes}:{seconds}</div>
  )
}
