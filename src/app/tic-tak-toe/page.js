'use client';











import { useState } from 'react';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <button className="w-24 h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  }

  return (
    <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>
      <div className="flex flex-wrap justify-center">
        <div className="grid grid-cols-3 gap-2">
          {Array(9).fill(null).map((_, i) => (
            <div key={i}>
              {renderSquare(i)}
            </div>
          ))}
        </div>
        <div className="p-2">
          {winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}
        </div>
        <button className="bg-green-500 hover:bg-green-700 h-10 text-white font-bold py-2 px-4 rounded m-1" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}