window.addEventListener('load', function() {

  setTimeout(function() {

    var loader = document.getElementById('loader');

    var content = document.getElementById('content');

    // Hide the content initially

    content.style.opacity = 0;

    // Fade out the loader gradually

    var opacity = 1;

    var fadeOutInterval = setInterval(function() {

      opacity -= 0.05;

      loader.style.opacity = opacity;

      // When the loader is completely faded out

      if (opacity <= 0) {

        clearInterval(fadeOutInterval);

        loader.style.display = 'none'; // Hide the loader completely

        // Show the content

        content.style.display = 'block';

        // Fade in the content gradually

        opacity = 0;

        var fadeInInterval = setInterval(function() {

          opacity += 0.05;

          content.style.opacity = opacity;

          // When the content is fully faded in

          if (opacity >= 1) {

            clearInterval(fadeInInterval);

          }

        }, 100);

      }

    }, 100);

  }, 5000); // Wait for 5 seconds before showing the content

});

const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Represents the Tic Tac Toe board

const userSymbol = "×";

const computerSymbol = "o";

function makeMove(index) {

  if (board[index] !== 0) return; // Cell already occupied

  board[index] = userSymbol; // User makes a move

  document.getElementsByClassName("cell")[index].textContent = userSymbol;

  if (checkWin(userSymbol)) {

    setTimeout(() => {

      alert("You win!");

      resetBoard();

    }, 100);

    return;

  }

  if (board.filter(cell => cell === 0).length === 0) {

    setTimeout(() => {

      alert("It's a tie!");

      resetBoard();

    }, 100);

    return;

  }

  const computerMove = getComputerMove();

  board[computerMove] = computerSymbol; // Computer makes a move

  document.getElementsByClassName("cell")[computerMove].textContent = computerSymbol;

  if (checkWin(computerSymbol)) {

    setTimeout(() => {

      alert("Computer wins!");

      resetBoard();

    }, 100);

    return;

  }

}

function getComputerMove() {

  // Call the minimax function to get the best move for the computer

  const bestMove = minimax(board, computerSymbol).index;

  return bestMove;

}

function minimax(newBoard, player) {

  // Base cases: check for terminal states (win, lose, tie)

  if (checkWin(userSymbol)) {

    return { score: -1 };

  } else if (checkWin(computerSymbol)) {

    return { score: 1 };

  } else if (newBoard.filter(cell => cell === 0).length === 0) {

    return { score: 0 };

  }

  // Collect all possible moves and their scores

  const moves = [];

  for (let i = 0; i < newBoard.length; i++) {

    if (newBoard[i] === 0) {

      const move = {};

      move.index = i;

      newBoard[i] = player;

      if (player === computerSymbol) {

        const result = minimax(newBoard, userSymbol);

        move.score = result.score;

      } else {

        const result = minimax(newBoard, computerSymbol);

        move.score = result.score;

      }

      newBoard[i] = 0;

      moves.push(move);

    }

  }

  // Choose the move with the highest score if the computer's turn, or the move with the lowest score if the user's turn

  let bestMove;

  if (player === computerSymbol) {

    let bestScore = -Infinity;

    for (let i = 0; i < moves.length; i++) {

      if (moves[i].score > bestScore) {

        bestScore = moves[i].score;

        bestMove = i;

      }

    }

  } else {

    let bestScore = Infinity;

    for (let i = 0; i < moves.length; i++) {

      if (moves[i].score < bestScore) {

        bestScore = moves[i].score;

        bestMove = i;

      }

    }

  }

  // Return the chosen move

  return moves[bestMove];

}

function checkWin(symbol) {

  // Check if the specified symbol has won the game

  const winPatterns = [

    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows

    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns

    [0, 4, 8], [2, 4, 6] // Diagonals

  ];

  for (let pattern of winPatterns) {

    if (

      board[pattern[0]] === symbol &&

      board[pattern[1]] === symbol &&

      board[pattern[2]] === symbol

    ) {

      return true;

    }

  }

  return false;

}

function resetBoard() {

  board.fill(0);

  const cells = document.getElementsByClassName("cell");

  for (let i = 0; i < cells.length; i++) {

    cells[i].textContent = "";

  }

}

