
//  Game board global parameters
var game_board = {
    rows : 4,
    columns: 6
};

/**
 * Checks if the given index is a legal board index
 * @param {number} index
 * @returns {boolean} true if index is a valid card index, false otherwise
 */
function checkValidIndex(index) {
    var rows = game_board.rows;
    var columns = game_board.columns;
    return (index >= 0 && index < rows * columns);
}

/**
 * Checks if the given position is a legal board position
 * @param {Array} position
 * @returns {boolean} true if position is legal, false otherwise
 */
function checkValidPosition(position) {
    var rows = game_board.rows;
    var columns = game_board.columns;
    if (position[0] >= 0 && position[0] < columns && position[1] >=0 && position[1] < rows) {
        return true;
    }
    return false;
}

/**
 * Returns the column and row for a card index
 * @param {number} index
 * @returns {null|Array} array of zero-based column and row positions
 */
function getPositionFromIndex(index) {
    var rows = game_board.rows;
    var columns = game_board.columns;
    if (!checkValidIndex(index)) {
        return null;
    }
    var position = [];
    position.push(index % columns);
    position.push((index - (index % columns))/columns);
    return position;
}

/**
 * Returns the index of the given position. If the position is invalid, returns null.
 * @param {Array} position
 * @returns {number|null} index number if position is valid, null otherwise
 */
function getIndexFromPosition(position) {
    var columns = game_board.columns;
    if (checkValidPosition(position)) {
        return position[0] + columns * position[1];
    }
    return null;
}

/**
 * Returns jQuery card selector. If the index is invalid, returns null.
 * @param {number} index
 * @returns {Object|null} card selector object if index is valid, null otherwise
 */
function getCardFromIndex(index) {
    if(!checkValidIndex(index)) {
        return null;
    }
    return $('.card:nth-of-type('+(index+1)+')');
}

/**
 * Returns the column and row for a card
 * @param {number|Object} card
 * @returns {Array} array of zero-based column and row positions
 */
function getPositionFromCard(card) {
    //  Get index from card
    var index = card.index();
    //  Get position from index
    return getPositionFromIndex(index);
}

/**
 * Returns jQuery card selector. If the position is invalid, returns null.
 * @param {Array} position
 * @returns {Object|null} card selector object if position is valid, null otherwise
 */
function getCardFromPosition (position) {
    var index = getIndexFromPosition(position);
    if (index === null) {
        return null;
    }
    return getCardFromIndex(index);
}

/**
 * Returns the set of all positions adjacent to the given position, which are on the game board
 * @param {Array} position
 * @returns {Array} array of positions
 */
function getValidNeighbors(position) {
    var neighbors = [];
    neighbors.push([position[0], position[1] - 1]);
    neighbors.push([position[0] + 1, position[1]]);
    neighbors.push([position[0], position[1] + 1]);
    neighbors.push([position[0] - 1, position[1]]);
    for (var i = neighbors.length-1; i>=0; i--) {
        if (!checkValidPosition(neighbors[i])) {
            neighbors.splice(i,1);
        }
    }
    return neighbors;
}

/**
 * If the given card is breakable, returns true, otherwise false.
 * @param {Object} card
 * @returns {boolean} True if card is breakable, false otherwise.
 */
function checkBreakable(card) {
    var position = getPositionFromCard(card);
    if (position[1] == 0) {
        return true;
    }
    var neighbors = getValidNeighbors(position);
    for (var i=0; i<neighbors.length; i++) {
        var neighborCard = getCardFromPosition(neighbors[i]);
        if (neighborCard.hasClass('cleared')){
            return true;
        }
    }
    return false;
}


function hideCardBackIfInvisible(cardBack) {
    if (cardBack.css('opacity') == 0) {
        cardBack.hide();
        var card = cardBack.parent();
        flipCard(card);
    }
}

function flipCard(card){

}

$(document).ready(function(){
    $('.card,.card img').attr({'draggable': 'false'});

    $('.card:not(.breakable):not(.cleared)').on('mouseenter','.back',function(){
        var breakable = checkBreakable($(this).parent());
        if (breakable) {
            $(this).parent().addClass('breakable');
        }
    });
    $('#game-area').on('mouseup','.card.breakable .back',function(){
        hideCardBackIfInvisible($(this));
    });
    $('#game-area').on('mouseleave','.card.breakable .back',function(){
        hideCardBackIfInvisible($(this));
    });
});