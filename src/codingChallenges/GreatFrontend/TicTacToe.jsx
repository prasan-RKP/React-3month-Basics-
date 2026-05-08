import React, { useState } from "react";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  // ✅ winner logic
  const getWinner = (board) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = getWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  // ✅ handle click
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  // ✅ reset
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Tic Tac Toe</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {board.map((value, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
                background:"red",
              width: "80px",
              height: "80px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {winner && <h3>Winner: {winner}</h3>}
        {isDraw && <h3>It's a Draw!</h3>}
        {!winner && !isDraw && <h3>Turn: {isXTurn ? "X" : "O"}</h3>}
      </div>

      <button onClick={resetGame} style={{ marginTop: "15px" }}>
        Reset
      </button>
    </div>
  );
}