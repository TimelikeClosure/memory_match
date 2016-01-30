
//  Begin Game Global Parameters

var game_param = {
    rows : 4,
    columns: 6
};

//  Close Game Global Parameters

//  Begin Card Data List

var card_data = {
    front: {
        armor_chain: {
            src: 'images/item_armor_chain.png',
            match: 'self'
        },
        armor_diamond: {
            src: 'images/item_armor_diamond.png',
            match: 'self'
        },
        armor_gold: {
            src: 'images/item_armor_gold.png',
            match: 'self'
        },
        armor_iron: {
            src: 'images/item_armor_iron.png',
            match: 'self'
        },
        armor_leather: {
            src: 'images/item_armor_leather.png',
            match: 'self'
        },
        armor_none: {
            src: 'images/item_armor_none.png',
            match: 'self'
        },
        fluid_lava: {
            src: 'images/item_fluid_lava.png',
            match: 'fluid_water'
        },
        fluid_water: {
            src: 'images/item_fluid_water.png',
            match: 'fluid_lava'
        },
        pickaxe_diamond: {
            src: 'images/item_pickaxe_diamond.png',
            match: 'self'
        },
        pickaxe_gold: {
            src: 'images/item_pickaxe_gold.png',
            match: 'self'
        },
        pickaxe_iron: {
            src: 'images/item_pickaxe_iron.png',
            match: 'self'
        },
        pickaxe_stone: {
            src: 'images/item_pickaxe_stone.png',
            match: 'self'
        },
        pickaxe_wooden: {
            src: 'images/item_pickaxe_wooden.png',
            match: 'self'
        },
        sword_diamond: {
            src: 'images/item_sword_diamond.png',
            match: 'self'
        },
        sword_gold: {
            src: 'images/item_sword_gold.png',
            match: 'self'
        },
        sword_iron: {
            src: 'images/item_sword_iron.png',
            match: 'self'
        },
        sword_stone: {
            src: 'images/item_sword_stone.png',
            match: 'self'
        },
        sword_wooden: {
            src: 'images/item_sword_wooden.png',
            match: 'self'
        }
    },
    back: {
        grass: {
            src: 'images/texture_block_grass.png',
            depth: 0
        },
        dirt: {
            src: 'images/texture_block_dirt.png',
            depth: 1
        },
        stone: {
            src: 'images/texture_block_stone.png',
            depth: 2
        },
        coal_ore: {
            src: 'images/texture_block_coal_ore.png',
            depth: 3
        },
        iron_ore: {
            src: 'images/texture_block_iron_ore.png',
            depth: 0
        },
        gold_ore: {
            src: 'images/texture_block_gold_ore.png',
            depth: 0
        },
        diamond_ore: {
            src: 'images/texture_block_diamond_ore.png',
            depth: 0
        }
    }
};

//  Close Card Data List

//  Begin Function Definitions

/**
 * Checks if the given index is a legal board index
 * @param {number} index
 * @returns {boolean} true if index is a valid card index, false otherwise
 */
function checkValidIndex(index) {
    var rows = game_param.rows;
    var columns = game_param.columns;
    return (index >= 0 && index < rows * columns);
}

/**
 * Checks if the given position is a legal board position
 * @param {Array} position
 * @returns {boolean} true if position is legal, false otherwise
 */
function checkValidPosition(position) {
    var rows = game_param.rows;
    var columns = game_param.columns;
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
    var rows = game_param.rows;
    var columns = game_param.columns;
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
    var columns = game_param.columns;
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

/**
 * If the given card back is transparent, returns true, otherwise false.
 * @param {Object} cardBack
 * @returns {boolean} true if cardBack is transparent, false otherwise
 */
function checkCardBackInvisible(cardBack) {
    return (cardBack.css('opacity') == 0);
}

/**
 * Sets the game area to stop or start allowing card flips
 * @param condition
 * @returns {null}
 */
function freezeFlips(condition) {
    if (condition) {
        $('#game-area').addClass('freeze-flips');
    } else {
        $('#game-area').removeClass('freeze-flips');
    }
    return null;
}

/**
 * Returns the set of all non-cleared face up cards
 * @returns {Object|jQuery|HTMLElement}
 */
function getFlippedCards() {
    return $('.flipped:not(.cleared)');
}

/**
 * Flips the given card face up.
 * @param card
 * @returns {null}
 */
function flipCard(card) {
    card.addClass('flipped');
    return null;
}

/**
 * Flips the given set of cards face down.
 * @param flippedCards
 * @returns {null}
 */
function unflipCards(flippedCards) {
    flippedCards.removeClass('flipped');
    return null;
}

/**
 * Clears the given set of cards.
 * @param flippedCards
 * @returns {null}
 */
function clearCards(flippedCards) {
    flippedCards.addClass('cleared');
    return null;
}

function checkMatchConditionsMet(flippedCards) {


    return true;
}

function applyMatchConsequences (flippedCards) {
    return null;
}

function checkFailureConditions () {
    return false;
}

function checkWinConditions () {
    return false;
}

function gameLost() {
    return null;
}

function gameWon() {
    return null;
}

function matchingRound (card) {
    freezeFlips(true);
    flipCard(card);
    var flippedCards = getFlippedCards();
    if (flippedCards.length < 2) {
        return freezeFlips(false);
    } else if (flippedCards.length > 2) {
        console.log("Too many cards flipped");
        unflipCards(flippedCards);
        return freezeFlips(false);
    }
    if (!checkMatchConditionsMet(flippedCards)) {
        unflipCards(flippedCards);
        return freezeFlips(false);
    }
    applyMatchConsequences(flippedCards);
    if (checkFailureConditions()) {
        gameLost();
        return freezeFlips(true);
    }
    clearCards(flippedCards);
    if (checkWinConditions()) {
        gameWon();
        return freezeFlips(true);
    }
    return freezeFlips(false);
}

//  Close Function Definitions

//  Begin Document Ready Section

$(document).ready(function(){
    $('.card,.card img').attr({'draggable': 'false'});

    $('.card:not(.breakable):not(.cleared)').on('mouseenter','.back',function(){
        if (checkBreakable($(this).parent())) {
            $(this).parent().addClass('breakable');
        }
    });
    $('#game-area').on('mouseup','.card.breakable .back',function(){
        if(checkCardBackInvisible($(this))) {
            matchingRound($(this).parent());
        }
    });
    $('#game-area').on('mouseleave','.card.breakable .back',function(){
        $(this).trigger('mouseup');
    });
});

//  Close Document Ready Section