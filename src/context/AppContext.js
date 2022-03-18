import { createContext, useState, useEffect } from 'react'

import wordBank from '../wordle-bank.txt'

export const Context = createContext()

const defaultBoard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

const AppContext = (props) => {
  const [board, setBoard] = useState(defaultBoard)
  const [currAttempt, setCurrAttempt] = useState({ col: 0, row: 0 })
  const [disabledLetter, setDisabledLetter] = useState([])
  const [correctWord, setCorrectWord] = useState('REACT')
  const [wordSet, setWordSet] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const generateSet = async () => {
      try {
        const res = await (await fetch(wordBank)).text()
        const wordarray = res.split('\r\n')
        setCorrectWord(
          wordarray[Math.floor(Math.random() * wordarray.length)].toUpperCase()
        )
        setWordSet(new Set(wordarray))
      } catch (err) {
        console.log(err)
      }
    }
    generateSet()
  }, [])
  console.log(correctWord)
  const restartGame = () => {
    setBoard([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ])
    setCurrAttempt({ col: 0, row: 0 })
    setDisabledLetter([])
    setGameOver(false)
    setGameWon(false)

    const wordarray = Array.from(wordSet)
    setCorrectWord(
      wordarray[Math.floor(Math.random() * wordarray.length)].toUpperCase()
    )
  }

  const typeLetter = (keyVal) => {
    if (currAttempt.row > 4) return
    const newBoard = [...board]
    newBoard[currAttempt.col][currAttempt.row] = keyVal
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, row: currAttempt.row + 1 })
  }

  const deleteLetter = () => {
    if (currAttempt.row === 0) return
    const newBoard = [...board]
    setCurrAttempt({ ...currAttempt, row: currAttempt.row - 1 })
    newBoard[currAttempt.col][currAttempt.row - 1] = ''
    setBoard(newBoard)
  }

  const submitAttempt = () => {
    const submitedAttempt = board[currAttempt.col]
    const submitedWord = submitedAttempt.join('')
    let toDisable = [...submitedAttempt]

    if (currAttempt.row !== 5) return

    if (wordSet.has(submitedWord.toLowerCase())) {
      toDisable = submitedAttempt.map((letter, i) =>
        letter !== correctWord[i] ? letter : ''
      )

      const isCorrect = submitedWord === correctWord
      currAttempt.col >= 5 && !isCorrect && setGameOver(true)
      isCorrect && setGameWon(true)

      setCurrAttempt({ ...currAttempt, col: currAttempt.col + 1, row: 0 })
      setDisabledLetter([...disabledLetter, ...toDisable])
    } else {
      setAlert(true)
    }
  }

  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        submitAttempt,
        deleteLetter,
        typeLetter,
        disabledLetter,
        correctWord,
        gameOver,
        gameWon,
        restartGame,
        alert,
        setAlert
      }}>
      {props.children}
    </Context.Provider>
  )
}

export default AppContext
