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
    <div className={` ${letter && 'ping'} `}>
      <div
        className={`rows`}
        id={letterState ? letterState : ''}
        style={{
          transitionDelay: `${letterPos * 300}ms`,
          animationDelay: `${letterPos * 200}ms`
        }}>
        {letter}
      </div>
    </div>
  )
}
