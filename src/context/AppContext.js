import { createContext, useState } from 'react'

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
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

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

    toDisable = submitedAttempt.map((letter, i) =>
      letter !== correctWord[i] ? letter : ''
    )

    const isCorrect = submitedWord === correctWord
    currAttempt.col >= 5 && !isCorrect && setGameOver(true)
    isCorrect && setGameWon(true)

    setCurrAttempt({ ...currAttempt, col: currAttempt.col + 1, row: 0 })
    setDisabledLetter([...disabledLetter, ...toDisable])
  }
  console.log(currAttempt)
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
        gameWon
      }}>
      {props.children}
    </Context.Provider>
  )
}

export default AppContext
