import React, { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

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
    if (game.state != undefined) {
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
      return 'Nice one! Choose a difficulty to play again.'
    } else if (game.state == 'lost') {
      return 'Oof! Choose a difficulty to play again.'
    } else if (game.state == undefined) {
      return 'Choose a difficulty!'
    } else if (game.state == 'playing' || 'new') {
      return `Good luck!
       (Choose a difficulty to reset the game.)`
    }
  }

  function dynamicGameState() {}

  function transformCellValue(value: string) {
    return value === 'F' ? (
      <i className="fa-brands fa-font-awesome"></i>
    ) : value == '*' ? (
      <i className="fa-solid fa-bomb"></i>
    ) : value == '_' ? (
      ' '
    ) : value == '@' ? (
      <i className="text-fit">Nice</i>
    ) : (
      value
    )
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
      <div className="difficulty-buttons">
        <button onClick={() => handleNewGame(0)}>Easy (8x8)</button>
        <button onClick={() => handleNewGame(1)}>Intermediate (16x16)</button>
        <button onClick={() => handleNewGame(2)}>Expert (24x24)</button>
      </div>
      <ul className={`difficulty-${game.board.length}`}>
        {game.board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <li
              className={
                game.state == ('lost' || 'won')
                  ? 'disabled'
                  : transformClassName(cell)
              }
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
