// snakes-ladders.js
'use client';
import { useState } from 'react';
import Head from 'next/head';

// Define board layout and snakes/ladders
const boardSize = 10;
const snakes = { 99: 21, 76: 42, 53: 19, 43: 5 };
const ladders = { 2: 38, 7: 14, 8: 31, 28: 84 };

export default function SnakesAndLadders() {
  const [playerPosition, setPlayerPosition] = useState(1); // Start position
  const [dice, setDice] = useState(1);
  const [message, setMessage] = useState('');

  const rollDice = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setDice(diceValue);
    movePlayer(diceValue);
  };

  const movePlayer = (diceValue) => {
    let newPosition = playerPosition + diceValue;
    if (newPosition > 100) {
      setMessage('You cannot move beyond 100!');
      return;
    }

    // Check for snakes or ladders
    if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
      setMessage(`Oh no! Snake! Slide down to ${newPosition}`);
    } else if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
      setMessage(`Yay! Ladder! Climb up to ${newPosition}`);
    } else {
      setMessage(`You moved to ${newPosition}`);
    }

    setPlayerPosition(newPosition);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Head>
        <title>Snakes and Ladders</title>
      </Head>

      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Snakes & Ladders</h1>
        <p className="text-2xl">Current Position: {playerPosition}</p>
        <p className="text-2xl">Dice Rolled: {dice}</p>
        <p className="text-lg mt-4">{message}</p>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-10 gap-1 mb-8">
        {Array.from({ length: 100 }, (_, index) => {
          const boardNumber = 100 - index; // Reverse order
          const isPlayer = playerPosition === boardNumber;
          return (
            <div
              key={boardNumber}
              className={`w-12 h-12 border flex items-center justify-center ${isPlayer ? 'bg-yellow-500' : 'bg-gray-800'}`}
            >
              {boardNumber}
            </div>
          );
        })}
      </div>

      {/* Roll Dice Button */}
      <button
        onClick={rollDice}
        className="text-white text-2xl bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Roll Dice
      </button>
    </div>
  );
}
