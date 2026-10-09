import { useState } from 'react'

function useLocalStorage(
  key,
  initialValue
) {

  const [value, setValue] =
    useState(() => {

      try {

        const savedValue =
          localStorage.getItem(key)

        if (savedValue !== null) {

          return JSON.parse(
            savedValue
          )

        }

        return initialValue

      } catch (error) {

        console.error(
          'Error reading localStorage:',
          error
        )

        return initialValue

      }

    })


  const saveValue = (newValue) => {

    try {

      setValue(newValue)

      localStorage.setItem(
        key,
        JSON.stringify(newValue)
      )

    } catch (error) {

      console.error(
        'Error saving to localStorage:',
        error
      )

    }

  }


  return [
    value,
    saveValue,
  ]

}

export default useLocalStorage