import React from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { GameBoard } from './GameBoard'

// function App() {
//   function dynamicH2() {
//     if (game.state == 'won') {
//       return 'Nice one! Choose a difficulty to play again.'
//     } else if (game.state == 'lost') {
//       return 'Oof! Choose a difficulty to play again.'
//     } else if (game.state == undefined) {
//       return 'Choose a difficulty!'
//     } else if (game.state == 'playing' || 'new') {
//       return `Good luck!
//        (Choose a difficulty to reset the game.)`
//     }
//   }
export function App() {
  async function handleNewGame(difficulty: number) {
    return (
      <>
        <div className="flex game-container">
          <h1>Minesweeper</h1>
          <h2>{/*dynamicH2()*/}</h2>
          <div className="difficulty-buttons">
            <button onClick={() => handleNewGame(0)}>Easy (8x8)</button>
            <button onClick={() => handleNewGame(1)}>
              Intermediate (16x16)
            </button>
            <button onClick={() => handleNewGame(2)}>Expert (24x24)</button>
          </div>
          <GameBoard />
        </div>
      </>
    )
  }
}

export default App
