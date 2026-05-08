import { useEffect } from "react"

export const useEffectOnce = (callBack) => {
    useEffect(()=> callBack, []);
}