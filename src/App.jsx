// Importar las dependencias necesarias
import React, { useState, useEffect } from 'react';

function TicTacToe() {
  // Estado inicial del tablero y del jugador actual
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  
  // Nombres de los jugadores
  const [playerXName, setPlayerXName] = useState('Jugador X'); // Estado para el nombre de jugador X
  const [playerOName, setPlayerOName] = useState('Jugador O'); // Estado para el nombre de jugador O

  // useEffect para verificar si hay un ganador cada vez que se actualiza el tablero
  useEffect(() => {
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
      ];

      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const gameWinner = checkWinner();
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!board.includes(null)) {
      setWinner('Empate');
    }
  }, [board]);

  // Función para manejar clics en las casillas
  const handleClick = (index) => {
    if (board[index] || winner) return; // No permitir movimiento si la casilla está ocupada o si ya hay un ganador

    const newBoard = board.slice(); // Crear una copia del tablero actual
    newBoard[index] = currentPlayer; // Asignar el símbolo del jugador actual a la casilla seleccionada
    setBoard(newBoard); // Actualizar el estado del tablero
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Cambiar de jugador
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reiniciar el tablero
    setCurrentPlayer('X'); // El jugador X empieza primero
    setWinner(null); // Reiniciar el ganador
  };

  // Renderizar una casilla
  const renderSquare = (index) => {
    return (
      <button 
        className="square" 
        onClick={() => handleClick(index)}
        style={{ width: '60px', height: '60px', fontSize: '24px', cursor: 'pointer' }}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Tateti (Tic Tac Toe)</h1>
      
      {/* Inputs para ingresar los nombres de los jugadores */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nombre del jugador X" 
          value={playerXName} 
          onChange={(e) => setPlayerXName(e.target.value)} 
          style={{ marginRight: '10px', padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Nombre del jugador O" 
          value={playerOName} 
          onChange={(e) => setPlayerOName(e.target.value)} 
          style={{ padding: '10px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '5px', justifyContent: 'center' }}>
        {board.map((_, index) => renderSquare(index))}
      </div>

      {winner && (
        <div>
          <h2>{winner === 'Empate' ? '¡El juego terminó en empate!' : `🎉 ¡${winner === 'X' ? playerXName : playerOName} Es el ganador! 🎉`}</h2>
          <button onClick={resetGame} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Reiniciar Juego</button>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
