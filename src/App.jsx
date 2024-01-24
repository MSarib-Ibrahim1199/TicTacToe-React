import { useState } from "react";

function App() {
  const defaultTicTacToeData = {
    top_left: null,
    top_middle: null,
    top_right: null,
    middle_left: null,
    middle_middle: null,
    middle_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  };
  const [tictactoe, setTicTacToe] = useState(defaultTicTacToeData);
  const [isTickNext, setTickNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [availableTiles, setAvailableTiles] = useState(9);

  const handleClick = (position) => {
    if (tictactoe[position] === null) {
      const updatedState = {
        ...tictactoe,
        [position]: isTickNext ? "0" : "X",
      };
      setTicTacToe(updatedState);
      setTickNext(!isTickNext);

      if (checkWinner(updatedState)) {
        setWinner(isTickNext ? "0" : "X");
        setTickNext(true);
      }
    }
  };

  const renderTicTacToe = (position) => (
    <div
      onClick={() => {
        if (winner !== null || availableTiles === -1) {
          return;
        }
        handleClick(position);
        setAvailableTiles(parseInt(availableTiles - 1));
        console.log(availableTiles);
      }}
      className="flex items-center text-4xl justify-center bg-gray-800 text-white h-32 rounded-xl"
    >
      {tictactoe[position]}
    </div>
  );

  const checkWinner = (state) => {
    const winningCombos = [
      ["top_left", "top_middle", "top_right"],
      ["top_left", "middle_left", "bottom_left"],
      ["top_left", "middle_middle", "bottom_right"],
      ["top_middle", "middle_middle", "bottom_middle"],
      ["middle_left", "middle_middle", "middle_right"],
      ["bottom_left", "bottom_middle", "bottom_right"],
      ["top_right", "middle_right", "bottom_right"],
      ["top_right", "middle_middle", "bottom_left"],
    ];

    for (const combos of winningCombos) {
      const [x, y, z] = combos;
      if (state[x] && state[x] === state[y] && state[x] === state[z]) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <h1 className="text-5xl text-bold text-center m-5">Tic Tac Toe</h1>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 m-10 p-5 w-[50%]">
          {renderTicTacToe("top_left")}
          {renderTicTacToe("top_middle")}
          {renderTicTacToe("top_right")}
          {renderTicTacToe("middle_left")}
          {renderTicTacToe("middle_middle")}
          {renderTicTacToe("middle_right")}
          {renderTicTacToe("bottom_left")}
          {renderTicTacToe("bottom_middle")}
          {renderTicTacToe("bottom_right")}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 justify-center">
        <button
          type="button"
          className="text-2xl border border-input border-black p-2 rounded hover:bg-stone-200"
          onClick={() => {
            setTicTacToe(defaultTicTacToeData);
            setWinner(null);
            setAvailableTiles(9);
          }}
        >
          Reset Game
        </button>
        {availableTiles === 0 && winner === null && (
          <div className="text-3xl mt-10">The Game is a Draw!</div>
        )}
        {winner && <div className="text-3xl">The Winner is "{winner}"</div>}
      </div>
    </>
  );
}

export default App;
