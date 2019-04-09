import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  const input = {
    type: type,
    onChange: onChange,
    value: value
  }

  const reset = () => {
    setValue('')
  }

  return {
    input,
    reset
  }
}
