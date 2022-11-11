import React, { useState } from 'react'

function App() {
  const [game, setGame] = useState<Game>({
    board: [],
    id: null,
    winner: null,
    state: null,
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
    id: null | number
    state: string | null
    winner: null | string
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
    e: React.SyntheticEvent<HTMLLIElement>
  ) {
    if (e.type === 'click') {
      const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`
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
    } else if (e.type === 'contextmenu') {
      const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`
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
  }

  // async function handleFlagCell(row: number, col: number) {
  //   console.log('clicked!')
  // }

  return (
    <div>
      <h1>Minesweeper</h1>
      <div className="button">
        <button onClick={() => handleNewGame(0)}>Start a game!</button>
      </div>
      <ul>
        {game.board.map((row, rowIndex) =>
          row.map((column, columnIndex) => (
            <li
              key={columnIndex}
              onClick={(e) => {
                handleClickCell(rowIndex, columnIndex, e)
              }}
              onContextMenu={(e) => {
                handleClickCell(rowIndex, columnIndex, e)
              }}
            >
              {column}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
