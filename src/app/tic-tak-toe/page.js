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
      <button
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white font-bold text-2xl rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array(9).fill(null).map((_, i) => (
          <div key={i}>
            {renderSquare(i)}
          </div>
        ))}
      </div>
      <div className="mt-8 text-2xl">
        {winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}
      </div>
      <button
        className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={resetGame}
      >
        Reset Game
      </button>
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
