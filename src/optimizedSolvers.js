var recurseQueen = function(board, boardSize, rowCount, colsUsed, majorDiagUsed, minorDiagUsed) {
    var solutions = 0;
    // if rowCount = n and valid board
    if (rowCount === boardSize) {
      var currentBoardArr = board.rows();
      if (currentBoardArr[0][Math.floor(boardSize / 2)]) {
        // var tempArray = [];
        // for (var i = 0; i < boardSize; i++) {
        //   tempArray[i] = currentBoardArr[i].slice();
        // }
        // var tempBoard = new Board(tempArray);
        // return [1];
        return 1;
      } else {// return board or solutions (some value)
        // var tempArray = [];
        // var tempArrayReverse = [];
        // for (var i = 0; i < boardSize; i++) {
        //   tempArray[i] = currentBoardArr[i].slice();
        //   tempArrayReverse[i] = currentBoardArr[i].slice().reverse();
        // }
        // var tempBoard = new Board(tempArray);
        // var tempBoardReverse = new Board(tempArrayReverse);
        // return [1, 1];
        return 2;
      }
    }
    // for loop for each column
    var colLimit = rowCount ? boardSize : Math.ceil(boardSize / 2);
    for (var colIndex = 0; colIndex < colLimit; colIndex++) {
      // make a copy of the board that was initially passed in to recursive call
      if (colsUsed.hasOwnProperty(colIndex)|| majorDiagUsed.hasOwnProperty(colIndex - rowCount)||minorDiagUsed.hasOwnProperty(colIndex + rowCount)) {
        continue;
      }
      // place the queen at that column (corresponding to index in for loop)
      board.togglePiece(rowCount, colIndex);
      colsUsed[colIndex] = true;
      majorDiagUsed[colIndex - rowCount] = true;
      minorDiagUsed[colIndex + rowCount] = true;
      // make tempRowCount = rowCount and recursively call passing in the created board with updated rowCount
      var tempRowCount = rowCount + 1;
      returnValue = recurseQueen(board, boardSize, tempRowCount, colsUsed, majorDiagUsed, minorDiagUsed);
      if (returnValue) {
        // solutions = solutions.concat(returnValue);
        solutions += returnValue;
      }
      board.togglePiece(rowCount, colIndex);
      delete colsUsed[colIndex];
      delete majorDiagUsed[colIndex - rowCount];
      delete minorDiagUsed[colIndex + rowCount];
    }
    return solutions;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var colsUsed = {};
  var rowCount = 0;
  var boardSize = n;
  if (boardSize === 0) {
    return [];
  } else if (boardSize === 1) {
    return [[1]];
  }
  
  // recursive function pass in solutions, board and rowCount
  
  var queenSolutions = recurseQueen(board, boardSize, rowCount, colsUsed);
   if (queenSolutions.length === 0) {
    return new Board({n:n}).rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(queenSolutions[0].rows()));
  return queenSolutions[0].rows();
};

countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var rowCount = 0;
  var colsUsed = {};
  var majorDiagUsed = {};
  var minorDiagUsed = {};
  var boardSize = n;
  if (boardSize === 0) {
    return 1;
  } else if (boardSize === 1) {
    return 1;
  }
  // removed .length since we're just returning a number now
  var solutionCount = recurseQueen(board, boardSize, rowCount, colsUsed, majorDiagUsed, minorDiagUsed);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};