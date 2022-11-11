import React, { useState } from 'react'

function App() {
  const [game, setGame] = useState<Game>({
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
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

  type Cell = ' ' | '_' | 'F' | '*' | '@' | '1'
  type Row = Array<Cell>
  type Board = Array<Row>
  type Game = {
    board: Board
    id: null | number
    winner: null | string
  }

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <ul className="board">
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
