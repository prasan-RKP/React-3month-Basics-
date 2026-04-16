import { useState } from "react";

export default function useDefault(inVal, defVal) {

    const [myVal, setMyVal] = useState(inVal);

    const finalValue = myVal ?? defVal ;

    return {value: finalValue, setValue: setMyVal}

}
