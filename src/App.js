import Board from './components/Board'
import KeyBoard from './components/KeyBoard'
import Notify from './components/Notify'

import AppContext from './context/AppContext'

import './App.css'

function App() {
  return (
    <div className='App'>
      <h1>Wordle Clone</h1>
      <AppContext>
        <Board />
        <KeyBoard />
        <Notify />
      </AppContext>
    </div>
  )
}

export default App
