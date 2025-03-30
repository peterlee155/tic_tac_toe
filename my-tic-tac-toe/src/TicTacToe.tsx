import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);

  const handleClick = (i: number): void => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result && !winner) {
      setWinner(result);
      launchFireworks();
    }
  }, [board]);

  const launchFireworks = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 250);
  };

  const status: string = winner
    ? `🎉 Winner is ${winner}!`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (i: number) => (
    <button className="square" onClick={() => handleClick(i)}>
      <span style={{ color: board[i] === 'X' ? '#007BFF' : '#FF4136' }}>
        {board[i]}
      </span>
    </button>
  );

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe Game 🕹️</h1>
      <div className={`status ${winner ? 'winner-box' : ''}`}>
  {winner ? (
    <div className="winner-celebrate">
      <span className="trophy">🏆</span>
      <span className="winner-text">Winner is</span>
      <span className="winner-name">{winner}</span>
      <span className="trophy">🏆</span>
    </div>
  ) : (
    `Next player: ${isXNext ? 'X' : 'O'}`
  )}
</div>

      <div className="board">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
