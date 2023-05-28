import React, { useState } from 'react'

export default function GameBoard() {
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

  return (
    <div>
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
