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
    if (game.state == 'won' || game.state == 'lost') {
      return
    }
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
      e.preventDefault()
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

  function transformCellValue(value: string) {
    if (value === 'F') {
      return <i className="fa-brands fa-font-awesome"></i>
    }
    if (value === '_') {
      return ' '
    }
    if (value === '*') {
      return <i className="fa-solid fa-bomb"></i>
    }
    if (value === '@') {
      return <i className="text-fit">Nice</i>
    }
    return value
  }

  function transformClassName(value: string) {
    if (value === 'F') {
      return 'flag'
    }
    if (value === '*') {
      return 'bomb'
    }
    if (value === ' ') {
      return 'not-yet-clicked'
    }
    if (value === '@') {
      return 'flagged-bomb'
    } else return 'taken'
  }

  let dynamicButton
  if (game.state == 'won') {
    dynamicButton = 'Nice one! Press here to play again.'
  } else if (game.state == 'lost') {
    //lostGame = {lost}
    dynamicButton = 'Oof! Press here to play again.'
  } else if (game.state == null) {
    dynamicButton = 'Press here to play!'
  } else if (game.state == 'playing' || 'new') {
    dynamicButton = 'Click here to reset.'
  }

  return (
    <div className="flex game-container">
      <h1>Minesweeper</h1>
      <div className="button">
        <button onClick={() => handleNewGame(0)}>{dynamicButton}</button>
      </div>
      <ul>
        {game.board.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <li
              className={transformClassName(cell)}
              key={columnIndex}
              onClick={(e) => {
                handleClickCell(rowIndex, columnIndex, e)
              }}
              onContextMenu={(e) => {
                handleClickCell(rowIndex, columnIndex, e)
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
