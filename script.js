
//  Begin Card Data List

var card_data = {
    front: {
        armor_chain: {
            name: 'armor_chain',
            src: 'images/item_armor_chain.png',
            alt: 'Chain Armor',
            match: 'self'
        },
        armor_diamond: {
            name: 'armor_diamond',
            src: 'images/item_armor_diamond.png',
            alt: 'Diamond Armor',
            match: 'self'
        },
        armor_gold: {
            name: 'armor_gold',
            src: 'images/item_armor_gold.png',
            alt: 'Gold Armor',
            match: 'self'
        },
        armor_iron: {
            name: 'armor_iron',
            src: 'images/item_armor_iron.png',
            alt: 'Iron Armor',
            match: 'self'
        },
        armor_leather: {
            name: 'armor_leather',
            src: 'images/item_armor_leather.png',
            alt: 'Leather Armor',
            match: 'self'
        },
        armor_none: {
            name: 'armor_none',
            src: 'images/item_armor_none.png',
            alt: 'No Armor',
            match: 'self'
        },
        fluid_lava: {
            name: 'fluid_lava',
            src: 'images/item_fluid_lava.gif',
            alt: 'Lava Source',
            match: 'fluid_water'
        },
        fluid_water: {
            name: 'fluid_water',
            src: 'images/item_fluid_water.gif',
            alt: 'Water Source',
            match: 'fluid_lava'
        },
        pickaxe_diamond: {
            name: 'pickaxe_diamond',
            src: 'images/item_pickaxe_diamond.png',
            alt: 'Diamond Pickaxe',
            match: 'self'
        },
        pickaxe_gold: {
            name: 'pickaxe_gold',
            src: 'images/item_pickaxe_gold.png',
            alt: 'Gold Pickaxe',
            match: 'self'
        },
        pickaxe_iron: {
            name: 'pickaxe_iron',
            src: 'images/item_pickaxe_iron.png',
            alt: 'Iron Pickaxe',
            match: 'self'
        },
        pickaxe_stone: {
            name: 'pickaxe_stone',
            src: 'images/item_pickaxe_stone.png',
            alt: 'Stone Pickaxe',
            match: 'self'
        },
        pickaxe_wooden: {
            name: 'pickaxe_wooden',
            src: 'images/item_pickaxe_wooden.png',
            alt: 'Wooden Pickaxe',
            match: 'self'
        },
        sword_diamond: {
            name: 'sword_diamond',
            src: 'images/item_sword_diamond.png',
            alt: 'Diamond Sword',
            match: 'self'
        },
        sword_gold: {
            name: 'sword_gold',
            src: 'images/item_sword_gold.png',
            alt: 'Gold Sword',
            match: 'self'
        },
        sword_iron: {
            name: 'sword_iron',
            src: 'images/item_sword_iron.png',
            alt: 'Iron Sword',
            match: 'self'
        },
        sword_stone: {
            name: 'sword_stone',
            src: 'images/item_sword_stone.png',
            alt: 'Stone Sword',
            match: 'self'
        },
        sword_wooden: {
            name: 'sword_wooden',
            src: 'images/item_sword_wooden.png',
            alt: 'Wooden Sword',
            match: 'self'
        }
    },
    back: {
        grass: {
            name: 'grass',
            src: 'images/texture_block_grass.png',
            alt: 'Grass Block',
            depth: 0
        },
        dirt: {
            name: 'dirt',
            src: 'images/texture_block_dirt.png',
            alt: 'Dirt Block',
            depth: 1
        },
        stone: {
            name: 'stone',
            src: 'images/texture_block_stone.png',
            alt: 'Stone Block',
            depth: 2
        },
        coal_ore: {
            name: 'coal_ore',
            src: 'images/texture_block_coal_ore.png',
            alt: 'Coal Ore Block',
            depth: 3
        },
        iron_ore: {
            name: 'iron_ore',
            src: 'images/texture_block_iron_ore.png',
            alt: 'Iron Ore Block',
            depth: 4
        },
        gold_ore: {
            name: 'gold_ore',
            src: 'images/texture_block_gold_ore.png',
            alt: 'Gold Ore Block',
            depth: 5
        },
        diamond_ore: {
            name: 'diamond_ore',
            src: 'images/texture_block_diamond_ore.png',
            alt: 'Diamond Ore Block',
            depth: 6
        }
    }
};

//  Close Card Data List

//  Begin Game Global Parameters

var game_param = {
    current_game: {
        rows: 4,
        columns: 6,
        total_matches: 12,
        current_match_attempts: 0,
        current_matches: 0,
        current_match_failures: function(){
            return this.current_match_attempts - this.current_matches;
        },
        current_match_accuracy: function(){
            if (this.current_match_attempts == 0){
                return 0;
            }
            return this.current_matches / this.current_match_attempts;
        }
    },
    statistics: {
        match_attempts: 0,
        match_successes: 0,
        match_failures: function(){
            return this.match_attempts - this.match_successes;
        },
        match_accuracy: function(){
            if(this.match_attempts == 0) {
                return 0;
            }
            return this.match_successes / this.match_attempts;
        },
        games_reset: 0,
        games_won: 0,
        games_lost: 0,
        games_played: function(){
            return this.games_reset + this.games_won + this.games_lost;
        },
        games_win_ratio: function(){
            if (this.games_played() == 0){
                return 0;
            }
            return this.games_won / this.games_played();
        }
    },

    /**
     * Display stats in stats section on page.
     */
    display_stats: function(){
        //  Insert Total Games into html
        var winPercentage = (100 * this.statistics.games_win_ratio()).toFixed(2) + ' %';
        var gamesPlayed = $('.total-games .value');
        gamesPlayed.html('');
        gamesPlayed.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Played : '}),
                    $('<th>',{text: this.statistics.games_played()})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Won : '}),
                    $('<td>',{text: this.statistics.games_won})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Lost : '}),
                    $('<td>',{text: this.statistics.games_lost})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Abandoned : '}),
                    $('<td>',{text: this.statistics.games_reset})
                ),
                $('<tr>').append(
                    $('<th>',{text: 'Win Rate : '}),
                    $('<th>',{text: winPercentage})
                )
            )
        );

        //  Insert Total Matches into html
        var totalMatchAccuracy = (100 * this.statistics.match_accuracy()).toFixed(2) + ' %';
        var totalMatches = $('.total-matches .value');
        totalMatches.html('');
        totalMatches.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Attempted : '}),
                    $('<th>',{text: this.statistics.match_attempts})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Completed : '}),
                    $('<td>',{text: this.statistics.match_successes})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Failed : '}),
                    $('<td>',{text: this.statistics.match_failures()})
                ),
                $('<tr>').append(
                    $('<th>',{text: 'Match Accuracy : '}),
                    $('<th>',{text: totalMatchAccuracy})
                )
            )
        );

        //  Insert Current Matches into html
        var currentMatchAccuracy = (100 * this.current_game.current_match_accuracy()).toFixed(2) + ' %';
        var currentMatches = $('.current-matches .value');
        currentMatches.html('');
        currentMatches.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Attempted : '}),
                    $('<th>',{text: this.current_game.current_match_attempts})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Completed : '}),
                    $('<td>',{text: this.current_game.current_matches})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Failed : '}),
                    $('<td>',{text: this.current_game.current_match_failures()})
                ),
                $('<tr>').append(
                    $('<th>',{text: 'Match Accuracy : '}),
                    $('<th>',{text: currentMatchAccuracy})
                )
            )
        );
    },
    //  Close display_stats method

    reset_game: function(){
        freezeFlips(true);
        var main = $('main');
        if (!(main.hasClass('win')) && !(main.hasClass('lose'))) {
            this.statistics.games_reset++;
        } else {
            main.removeClass('win').removeClass('lose');
        }
        this.current_game.current_match_attempts = 0;
        this.current_game.current_matches = 0;
        $('.card').removeClass('cleared').removeClass('flipped').removeClass('breakable');
        this.display_stats();
        freezeFlips(false);
    }

};

//  Close Game Global Parameters

//  Begin Function Definitions

/**
 * Checks if the given index is a legal board index
 * @param {number} index
 * @returns {boolean} true if index is a valid card index, false otherwise
 */
function checkValidIndex(index) {
    var rows = game_param.current_game.rows;
    var columns = game_param.current_game.columns;
    return (index >= 0 && index < rows * columns);
}

/**
 * Checks if the given position is a legal board position
 * @param {Array} position
 * @returns {boolean} true if position is legal, false otherwise
 */
function checkValidPosition(position) {
    var rows = game_param.current_game.rows;
    var columns = game_param.current_game.columns;
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
    var rows = game_param.current_game.rows;
    var columns = game_param.current_game.columns;
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
    var columns = game_param.current_game.columns;
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
    var position = getPositionFromIndex(card.index());
    if (position[1] == 0) {
        return true;
    }
    var neighbors = getValidNeighbors(position);
    for (var i=0; i<neighbors.length; i++) {
        var neighborCard = getCardFromIndex(getIndexFromPosition(neighbors[i]));
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

/**
 * Takes a $('.card') element and returns its card properties. Returns null if not found.
 * @param {Object} card
 * @param {string} face "front" or "back"
 * @returns {Object|null} list of data properties for the given card's type, null if not found
 */
function getCardDataFromCard (card, face) {

    var cardSrc = $(card).find('.'+face+'>img').attr('src');
    for (var cardType in card_data[face]) {
        if(card_data[face].hasOwnProperty(cardType)) {
            if (cardSrc == card_data[face][cardType].src) {
                return card_data[face][cardType];
            }
        }
    }
    return null;
}

/**
 * Returns whether the given card data meets all the conditions to be matched.
 * @param {Array} flippedCardData
 * @returns {boolean} true if cards can be legally matched, false otherwise
 */
function checkMatchConditionsMet(flippedCardData) {
    //  Checks whether cards are compatible for matching
    if (flippedCardData[0].match == 'self' && flippedCardData[1].match == 'self') {
        if (flippedCardData[0].name != flippedCardData[1].name) {
            return false;
        }
    } else if (flippedCardData[0].match != flippedCardData[1].name || flippedCardData[1].match != flippedCardData[0].name) {
        return false;
    }
    //  Checks whether cards can be matched based upon outside requirements, specific to card type
    //  (to be added)

    //  Returns true if all conditions are met
    return true;
}

function applyMatchConsequences (flippedCardData) {
    game_param.current_game.current_matches++;
    return null;
}

/**
 * Checks whether any conditions for game failure have been satisfied.
 * @returns {boolean} true if conditions for game failure satisfied, false otherwise
 */
function checkFailureConditions () {
    return false;
}

/**
 * Checks whether all conditions for game success have been satisfied.
 * @returns {boolean} true if all conditions are met, false otherwise
 */
function checkWinConditions () {
    if (game_param.current_game.current_matches != game_param.current_game.total_matches) {
        return false;
    }
    return true;
}

/**
 * Runs game loss procedures.
 * @returns {null}
 */
function gameLost() {
    $('main').addClass('lose');
    game_param.statistics.games_lost++;
    game_param.display_stats();
    $('.game-message').text('You Lose!');
    return null;
}

/**
 * Runs game win procedures.
 * @returns {null}
 */
function gameWon() {
    $('main').addClass('win');
    game_param.statistics.games_won++;
    game_param.display_stats();
    $('.game-message').text('You Win!');
    return null;
}

/**
 * Runs card flipping procedure. New cards cannot be flipped by user while running. Starts matching procedure after
 * delay if at least two cards are flipped, otherwise returns flipping control to the user and returns null.
 * @param {Object} card
 * @returns {Object|null} reference of setTimeout function if matchingRound() is set to run, null otherwise
 */
function flippingRound (card) {
    freezeFlips(true);
    flipCard(card);
    var flippedCards = getFlippedCards();
    if (flippedCards.length < 2) {
        return freezeFlips(false);
    }
    return setTimeout(function(){matchingRound(flippedCards);}, 2000);
}

/**
 * Runs card matching procedure.  Activates win or loss procedures if conditions are met, otherwise returns flipping
 * control to the user.
 * @param flippedCards
 * @returns {null}
 */
function matchingRound (flippedCards) {
    var flippedCardData = [];
    for (var i = 0; i < flippedCards.length; i++) {
        flippedCardData.push(getCardDataFromCard(flippedCards[i], 'front'));
    }
    game_param.current_game.current_match_attempts++;
    game_param.statistics.match_attempts++;
    if (!checkMatchConditionsMet(flippedCardData)) {
        unflipCards(flippedCards);
        game_param.display_stats();
        return freezeFlips(false);
    }
    game_param.statistics.match_successes++;
    applyMatchConsequences(flippedCardData);
    if (checkFailureConditions()) {
        setTimeout(function(){gameLost();},2000);
        return freezeFlips(true);
    }
    clearCards(flippedCards);
    if (checkWinConditions()) {
        setTimeout(function(){gameWon();},2000);
        return freezeFlips(true);
    }
    game_param.display_stats();
    return freezeFlips(false);
}

function resetStats() {

}

//  Close Function Definitions

//  Begin Document Ready Section

$(document).ready(function(){
    game_param.display_stats();
    $('.card,.card img').attr({'draggable': 'false'});

    $('#game-area').on('mouseenter','.card:not(.breakable):not(.cleared) .back',function(){
        if (checkBreakable($(this).parent())) {
            $(this).parent().addClass('breakable');
        }
    });
    $('#game-area').on('mousedown','.card:not(.breakable):not(.cleared) .back',function(){
        $(this).trigger('mouseenter');
    });
    $('#game-area').on('mouseup','.card.breakable:not(.cleared) .back',function(){
        if(checkCardBackInvisible($(this))) {
            flippingRound($(this).parent());
        }
    });
    $('#game-area').on('mouseleave','.card.breakable:not(.cleared) .back',function(){
        $(this).trigger('mouseup');
    });
    $('.reset').on('click',function(){
        game_param.reset_game();
    });
});

//  Close Document Ready Section