import React, { useState } from 'react'

function App() {
  const [game, setGame] = useState<Game>({
    board: [],
    id: undefined,
    winner: undefined,
    state: undefined,
  })

  type Cell =
    | ' '
    | '_'
    | 'F'
    | '*'
    | '@'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
  type Row = Array<Cell>
  type Board = Array<Row>

  type Game = {
    board: Board
    id: number | undefined
    state: string | undefined
    winner: string | undefined
  }

  async function handleNewGame(difficulty: number) {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ difficulty }),
      }
    )
    const newGame = (await response.json()) as Game
    if (response.ok) {
      setGame(newGame)
    }
  }

  async function handleClickCell(
    row: number,
    col: number,
    action: 'check' | 'flag',
    event: React.MouseEvent
  ) {
    if (game.state == 'won' || game.state == 'lost') {
    }
    event.preventDefault()
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`
    const body = { row, col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const newGame = (await response.json()) as Game
      setGame(newGame)
    }
  }

  function dynamicH2() {
    if (game.state == 'won') {
      return 'Nice one! Press below to play again.'
    } else if (game.state == 'lost') {
      return 'Oof! Press below to play again.'
    } else if (game.state == null) {
      return 'Choose a difficulty!'
    } else if (game.state == 'playing' || 'new') {
      return 'Good luck! Click below to reset.'
    }
  }

  function transformCellValue(value: string) {
    switch (value) {
      case 'F':
        return <i className="fa-brands fa-font-awesome"></i>
      case '*':
        return <i className="fa-solid fa-bomb"></i>
      case '_':
        return ' '
      case '@':
        return <i className="text-fit">Nice</i>
      default:
        return value
    }
  }

  function transformClassName(cell: string) {
    switch (cell) {
      case 'F':
        return 'flag'
      case '*':
        return 'bomb'
      case ' ':
        return 'not-yet-clicked'
      case '@':
        return 'flagged-bomb'
      default:
        return 'taken'
    }
  }

  return (
    <div className="flex game-container">
      <h1>Minesweeper</h1>
      <h2>{dynamicH2()}</h2>
      <div className="other-button">
        <button onClick={() => handleNewGame(0)}>Easy (8x8)</button>
        <button onClick={() => handleNewGame(1)}>Intermediate (16x16)</button>
        <button onClick={() => handleNewGame(2)}>Expert (24x24)</button>
      </div>
      <ul className={`difficulty-${game.board.length}`}>
        {game.board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <li
              className={transformClassName(cell)}
              key={columnIndex}
              onClick={(event) => {
                handleClickCell(rowIndex, columnIndex, 'check', event)
              }}
              onContextMenu={(event) => {
                handleClickCell(rowIndex, columnIndex, 'flag', event)
              }}
            >
              {transformCellValue(cell)}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
