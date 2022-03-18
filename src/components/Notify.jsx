import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../context/AppContext'

export default function Notify() {
  const appContext = useContext(Context)
  const { alert, setAlert } = appContext
  const [display, setDisplay] = useState('none')
  useEffect(() => {
    if (alert === true) {
      setDisplay('flex')
      setTimeout(() => {
        setDisplay('none')
        setAlert(false)
      }, 2000)
    }
  }, [alert, setAlert])

  return (
    <div className='notify-wrap' style={{ display: display }}>
      <div className='notify'>
        <p>Not in word list </p>
      </div>
    </div>
  )
}
