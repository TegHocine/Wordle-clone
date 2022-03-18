import React, { useContext } from 'react'

import { Context } from '../context/AppContext'

import Letter from './Letter'

export default function Board() {
  const appContext = useContext(Context)
  const { board, correctWord, currAttempt } = appContext
  return (
    <div className='board'>
      {board.map((word, indexCol) => (
        <div key={indexCol} className='cols'>
          {word.map((letter, indexRow) => (
            <Letter
              key={indexRow}
              letter={letter}
              letterPos={indexRow}
              word={correctWord}
              currAttempt={currAttempt}
              currCol={indexCol}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
