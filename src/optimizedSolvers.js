var recurseQueen = function(board, boardSize, rowCount) {
    var solutions = [];
    // if rowCount = n and valid board
    if (rowCount === boardSize && !board.hasAnyQueensConflicts()) {
      // return board or solutions (some value)
      var tempArray = [];
      for (var i = 0; i < boardSize; i++) {
        tempArray[i] = board.rows()[i].slice();
      }
      var tempBoard = new Board(tempArray);
      return [tempBoard];
    }
    // for loop for each column
    for (var colIndex = 0; colIndex < boardSize; colIndex++) {
      // make a copy of the board that was initially passed in to recursive call

      // // place the queen at that column (corresponding to index in for loop)
      board.togglePiece(rowCount, colIndex);
      // check if queen value is valid
      if (!board.hasAnyQueensConflicts()) {
        // if not valid continue
        // else make tempRowCount = rowCount and recursively call passing in the created board with updated rowCount
        var tempRowCount = rowCount + 1;
        returnValue = recurseQueen(board, boardSize, tempRowCount);
        if (returnValue) {
          solutions = solutions.concat(returnValue);
        }
        
      }
      board.togglePiece(rowCount, colIndex);
    }
    return solutions;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
findNQueensSolution = function(n) {
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