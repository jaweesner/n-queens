/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var recurseRook = function(board, boardSize, rowCount) {
    var solutions = [];
    // if rowCount = n and valid board
    if (rowCount === boardSize && !board.hasAnyRooksConflicts()) {
      // return board or solutions (some value)
      return [board];
    }
    // for loop for each column
    for (var colIndex = 0; colIndex < boardSize; colIndex++) {
      // make a copy of the board that was initially passed in to recursive call
      var tempArray = [];
      for (var i = 0; i < boardSize; i++) {
        tempArray[i] = board.rows()[i].slice();
      }
      var tempBoard = new Board(tempArray);
      // place the queen at that column (corresponding to index in for loop)
      tempBoard.togglePiece(rowCount, colIndex);
      // check if queen value is valid
      if (!tempBoard.hasAnyRooksConflicts()) {
        // if not valid continue
        // else make tempRowCount = rowCount and recursively call passing in the created board with updated rowCount
        var tempRowCount = rowCount + 1;
        returnValue = recurseRook(tempBoard, boardSize, tempRowCount);
        if (returnValue) {
          solutions = solutions.concat(returnValue);
        }
      }
    }
    return solutions;
}

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var rowCount = 0;
  var boardSize = n;
  
  // recursive function pass in solutions, board and rowCount
  
  var rookSolutions = recurseRook(board, boardSize, rowCount);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rookSolutions[0].rows()));
  return rookSolutions[0].rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var rowCount = 0;
  var boardSize = n;

  var solutionCount = recurseRook(board, boardSize, rowCount).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

var recurseQueen = function(board, boardSize, rowCount) {
    var solutions = [];
    // if rowCount = n and valid board
    if (rowCount === boardSize && !board.hasAnyQueensConflicts()) {
      // return board or solutions (some value)
      return [board];
    }
    // for loop for each column
    for (var colIndex = 0; colIndex < boardSize; colIndex++) {
      // make a copy of the board that was initially passed in to recursive call
      var tempArray = [];
      for (var i = 0; i < boardSize; i++) {
        tempArray[i] = board.rows()[i].slice();
      }
      var tempBoard = new Board(tempArray);
      // place the queen at that column (corresponding to index in for loop)
      tempBoard.togglePiece(rowCount, colIndex);
      // check if queen value is valid
      if (!tempBoard.hasAnyQueensConflicts()) {
        // if not valid continue
        // else make tempRowCount = rowCount and recursively call passing in the created board with updated rowCount
        var tempRowCount = rowCount + 1;
        returnValue = recurseQueen(tempBoard, boardSize, tempRowCount);
        if (returnValue) {
          solutions = solutions.concat(returnValue);
        }
      }
    }
    return solutions;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var rowCount = 0;
  var boardSize = n;
  if (boardSize === 0) {
    return [];
  }
  
  // recursive function pass in solutions, board and rowCount
  
  var queenSolutions = recurseQueen(board, boardSize, rowCount);
   if (queenSolutions.length === 0) {
    return new Board({n:n}).rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(queenSolutions[0].rows()));
  return queenSolutions[0].rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var rowCount = 0;
  var boardSize = n;

  var solutionCount = recurseQueen(board, boardSize, rowCount).length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
