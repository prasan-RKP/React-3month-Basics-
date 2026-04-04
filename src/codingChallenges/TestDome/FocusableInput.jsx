import React, { useEffect, useRef, forwardRef } from 'react'

// Base input
const Input = ({ forwardedRef, ...otherProps }) => {
  return <input {...otherProps} ref={forwardedRef} />
}

// TextInput with forwardRef
const TextInput = forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />
})

// FocusableInput — main component
const FocusableInput = ({ focused }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (focused) {
      ref.current.focus()
    }
  }, [focused])

  return <TextInput ref={ref} />
}

export default FocusableInput;