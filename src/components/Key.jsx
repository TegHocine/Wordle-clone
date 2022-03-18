import React, { useContext } from 'react'

import { Context } from '../context/AppContext'

export default function Key({ keyVal, special, disabled }) {
  const appContext = useContext(Context)
  const { typeLetter, deleteLetter, submitAttempt } = appContext

  const onClickLetter = () => {
    if (keyVal === 'Enter') {
      submitAttempt()
    } else if (keyVal === 'Delete') {
      deleteLetter()
    } else {
      typeLetter(keyVal)
    }
  }

  return (
    <div
      className={`key ${special && 'big'} ${disabled && 'disabled'}`}
      onClick={onClickLetter}>
      {keyVal}
    </div>
  )
}
