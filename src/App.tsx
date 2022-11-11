import React, { useState } from 'react'

function App() {
  const [game, setGame] = useState<Game>({
    board: [
      [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })

  type Square = 'X' | 'O' | ' '
  type Row = [Square, Square, Square, Square, Square, Square, Square, Square]
  type Board = [Row, Row, Row, Row, Row, Row, Row, Row]
  type Game = {
    board: Board
    id: null | number
    winner: null | string
  }

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <ul>
        {game.board.map(function (row, rowIndex) {
          return row.map(function (column, columnIndex) {
            return <li key={column}>{column}</li>
          })
        })}
      </ul>
    </div>
  )
}

export default App
