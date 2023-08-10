// (function () {
//   const O_TEXT = "O";
//   const X_TEXT = "X";
//   const PLAYER_1 = "Player 1";
//   const PLAYER_2 = "Player 2";

//   let currentPlayer = X_TEXT;
//   let spaces = Array(9).fill(null);
//   let gameEnded = false;

//   let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
//     "--winning-blocks"
//   );

//   const playerText = document.getElementById("playerText");
//   const restartBtn = document.getElementById("restartBtn");
//   const boxes = Array.from(document.getElementsByClassName("box"));

//   const winningCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   const startGame = () => {
//     boxes.forEach((box) => box.addEventListener("click", boxClicked));
//     restartBtn.addEventListener("click", restart);
//     updatePlayerText();
//   };

//   function boxClicked(e) {
//     if (gameEnded) {
//       return;
//     }

//     const id = e.target.id;

//     if (!spaces[id]) {
//       spaces[id] = currentPlayer;
//       e.target.innerText = currentPlayer;

//       if (playerHasWon()) {
//         playerText.innerHTML = `${getPlayerName(currentPlayer)} has won! 🎉🎊`;
//         let winning_blocks = playerHasWon();
//         winning_blocks.map(
//           (box) => (boxes[box].style.backgroundColor = winnerIndicator)
//         );
//         highlightWinningBoxes(playerHasWon());
//         endGame();
//         return;
//       }

//       if (isBoardFull()) {
//         playerText.innerHTML = "It's a draw!";
//         endGame();
//         return;
//       }

//       currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
//       updatePlayerText();
//     }
//   }

//   function playerHasWon() {
//     for (const combo of winningCombos) {
//       const [a, b, c] = combo;

//       if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
//         return combo;
//       }
//     }

//     return null;
//   }

//   function isBoardFull() {
//     return spaces.every((space) => space !== null);
//   }

//   function highlightWinningBoxes(winningCombo) {
//     winningCombo.forEach((boxIndex) => {
//       boxes[boxIndex].classList.add("win");
//     });
//   }

//   function endGame() {
//     gameEnded = true;
//     boxes.forEach((box) => box.removeEventListener("click", boxClicked));
//   }

//   function restart() {
//     spaces.fill(null);
//     boxes.forEach((box) => {
//       box.innerText = "";
//       box.classList.remove("win");
//       box.style.backgroundColor = "";
//     });
//     playerText.innerHTML = "Tic Tac Toe";
//     currentPlayer = X_TEXT;
//     gameEnded = false;
//     startGame();
//   }

//   function updatePlayerText() {
//     playerText.innerHTML = `Current Player: ${getPlayerName(currentPlayer)}`;
//   }

//   function getPlayerName(player) {
//     return player === X_TEXT ? PLAYER_1 : PLAYER_2;
//   }

//   startGame();
// })();

(function () {
  const O_TEXT = "O";
  const X_TEXT = "X";
  const PLAYER_1 = "Player 1";
  const PLAYER_2 = "Player 2";

  let currentPlayer = X_TEXT;
  let spaces = Array(9).fill(null);
  let gameEnded = false;

  let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
    "--winning-blocks"
  );

  const playerText = document.getElementById("playerText");
  const restartBtn = document.getElementById("restartBtn");
  const boxes = Array.from(document.getElementsByClassName("box"));

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const startGame = () => {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restart);
    updatePlayerText();
  };

  function boxClicked(e) {
    if (gameEnded) {
      return;
    }

    const id = e.target.id;

    if (!spaces[id]) {
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer;

      if (playerHasWon()) {
        playerText.innerHTML = `${getPlayerName(currentPlayer)} has won! 🎉🎊`;
        let winning_blocks = playerHasWon();
        winning_blocks.map(
          (box) => (boxes[box].style.backgroundColor = winnerIndicator)
        );
        highlightWinningBoxes(playerHasWon());
        endGame();
        speak(`${getPlayerName(currentPlayer)} has won!`);
        return;

        
      }

      if (isBoardFull()) {
        playerText.innerHTML = "It's a draw!";
        endGame();
        speak("It's a draw!");
        return;
      }

      currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
      updatePlayerText();
    }
  }

  function playerHasWon() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;

      if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
        return combo;
      }
    }

    return null;
  }

  function isBoardFull() {
    return spaces.every((space) => space !== null);
  }

  function highlightWinningBoxes(winningCombo) {
    winningCombo.forEach((boxIndex) => {
      boxes[boxIndex].classList.add("win");
    });
  }

  function endGame() {
    gameEnded = true;
    boxes.forEach((box) => box.removeEventListener("click", boxClicked));

    // add this code to create confetti when there is a winner
    if (playerHasWon()) {
      const confettiSettings = {
        target: "confetti",
        clock: 25,
        max: 150,
        size: 1,
        rotate: true,
        props: ["circle", "square"],
        colors: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
        start_from_edge: true,
        respawn: true,
        duration: 5000,
      };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      speak(`${getPlayerName(currentPlayer)} has won!`);

      // append the #confetti element to the <body> of the page
      document.body.appendChild(document.getElementById("confetti"));

      // add this code to stop the confetti after the specified duration
      setTimeout(() => {
        confetti.clear();
      }, confettiSettings.duration);
    }
  }

  function restart() {
    spaces.fill(null);
    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("win");
      box.style.backgroundColor = "";
    });
    playerText.innerHTML = "Tic Tac Toe";
    currentPlayer = X_TEXT;
    gameEnded = false;
    startGame();
  }

  function updatePlayerText() {
    playerText.innerHTML = `Current Player: ${getPlayerName(currentPlayer)}`;
  }

  function getPlayerName(player) {
    return player === X_TEXT ? PLAYER_1 : PLAYER_2;
  }

  function speak(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    window.speechSynthesis.speak(speech);
  }

  startGame();
})();
