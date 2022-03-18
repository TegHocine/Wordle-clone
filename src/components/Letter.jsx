import React from 'react'

export default function Letter({
  letter,
  letterPos,
  word,
  currAttempt,
  currCol
}) {
  const correct = word[letterPos] === letter
  const almost = !correct && letter !== '' && word.includes(letter)
  const letterState =
    currAttempt.col > currCol &&
    (correct ? 'correct' : almost ? 'almost' : 'notin')
  return (
    <div className='rows' id={letterState ? letterState : ''}>
      {letter}
    </div>
  )
}
