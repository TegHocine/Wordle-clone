import React, { useEffect, useContext, useCallback } from 'react'
import { Context } from '../context/AppContext'
import Key from './Key'

export default function KeyBoard() {
  const keysLine1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const keysLine2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const keysLine3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  const appContext = useContext(Context)
  const {
    typeLetter,
    deleteLetter,
    submitAttempt,
    currAttempt,
    disabledLetter,
    gameOver,
    gameWon,
    correctWord,
    restartGame
  } = appContext

  const handleKeyBoard = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        submitAttempt()
      } else if (e.key === 'Backspace') {
        deleteLetter()
      } else {
        keysLine1.forEach((key) => {
          if (key.toLowerCase() === e.key.toLowerCase()) typeLetter(key)
        })
        keysLine2.forEach((key) => {
          if (key.toLowerCase() === e.key.toLowerCase()) typeLetter(key)
        })
        keysLine3.forEach((key) => {
          if (key.toLowerCase() === e.key.toLowerCase()) typeLetter(key)
        })
      }
    },
    //eslint-disable-next-line
    [currAttempt]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyBoard)

    if (gameOver || gameWon)
      window.removeEventListener('keydown', handleKeyBoard)

    return () => {
      window.removeEventListener('keydown', handleKeyBoard)
    }
  }, [handleKeyBoard, gameOver, gameWon])
  return (
    <div className='keyboard' onKeyDown={handleKeyBoard}>
      {gameOver ? (
        <>
          <h2>Game Over</h2>
          <p>
            Word: <span className='spacing'>{correctWord.toLowerCase()}</span>
          </p>
          <button onClick={(e) => restartGame()}> Try again </button>
        </>
      ) : gameWon ? (
        <>
          <h2>U Guessed It</h2>
          <button onClick={(e) => restartGame()}> Play again </button>
        </>
      ) : (
        <>
          <div className='lines'>
            {keysLine1.map((key, i) => (
              <Key
                key={i}
                keyVal={key}
                disabled={disabledLetter.includes(key)}
              />
            ))}
          </div>
          <div className='lines'>
            {keysLine2.map((key, i) => (
              <Key
                key={i}
                keyVal={key}
                disabled={disabledLetter.includes(key)}
              />
            ))}
          </div>
          <div className='lines'>
            <Key keyVal={'Enter'} special />
            {keysLine3.map((key, i) => (
              <Key
                key={i}
                keyVal={key}
                disabled={disabledLetter.includes(key)}
              />
            ))}
            <Key keyVal={'Delete'} special />
          </div>
        </>
      )}
    </div>
  )
}
