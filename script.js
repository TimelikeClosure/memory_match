
//  Begin Card Data List

var cardData = {
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
    },

    /**
     * Takes a $('.card') element and returns its card properties. Returns null if not found.
     * @param {Object} card
     * @param {string} face "front" or "back"
     * @returns {Object|null} list of data properties for the given card's type, null if not found
     */
    getCardDataFromCard: function(card, face) {
        var cardSrc = $(card).find('.'+face+'>img').attr('src');
        for (var cardType in cardData[face]) {
            if(cardData[face].hasOwnProperty(cardType)) {
                if (cardSrc == cardData[face][cardType].src) {
                    return cardData[face][cardType];
                }
            }
        }
        return null;
    }
};

//  Close Card Data List

//  Begin Game Global Parameters

var gameHandler = {
    currentGame: {
        rows: 4,
        columns: 6,
        totalMatches: function(){
            return this.rows * this.columns / 2;
        },
        currentMatchAttempts: 0,
        currentMatches: 0,

        /**
         * Returns the current failed match attempts.
         * @returns {number}
         */
        currentMatchFailures: function(){
            return this.currentMatchAttempts - this.currentMatches;
        },

        /**
         * Return the current match accuracy.
         * @returns {number}
         */
        currentMatchAccuracy: function(){
            if (this.currentMatchAttempts == 0){
                return 0;
            }
            return this.currentMatches / this.currentMatchAttempts;
        }
    },
    statistics: {
        matchAttempts: 0,
        matchSuccesses: 0,
        matchFailures: function(){
            return this.matchAttempts - this.matchSuccesses;
        },
        matchAccuracy: function(){
            if(this.matchAttempts == 0) {
                return 0;
            }
            return this.matchSuccesses / this.matchAttempts;
        },
        gamesReset: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesPlayed: function(){
            return this.gamesReset + this.gamesWon + this.gamesLost;
        },
        gamesWinRatio: function(){
            if (this.gamesPlayed() == 0){
                return 0;
            }
            return this.gamesWon / this.gamesPlayed();
        }
    },

    /**
     * Checks if the given index is a legal board index
     * @param {number} index
     * @returns {boolean} true if index is a valid card index, false otherwise
     */
    checkValidIndex: function(index) {
        var rows = gameHandler.currentGame.rows;
        var columns = gameHandler.currentGame.columns;
        return (index >= 0 && index < rows * columns);
    },

    /**
     * Checks if the given position is a legal board position
     * @param {Array} position
     * @returns {boolean} true if position is legal, false otherwise
     */
    checkValidPosition: function(position) {
        var rows = gameHandler.currentGame.rows;
        var columns = gameHandler.currentGame.columns;
        if (position[0] >= 0 && position[0] < columns && position[1] >=0 && position[1] < rows) {
            return true;
        }
        return false;
    },

    /**
     * Returns the column and row for a card index
     * @param {number} index
     * @returns {null|Array} array of zero-based column and row positions
     */
     getPositionFromIndex: function(index) {
        var rows = gameHandler.currentGame.rows;
        var columns = gameHandler.currentGame.columns;
        if (!gameHandler.checkValidIndex(index)) {
            return null;
        }
        var position = [];
        position.push(index % columns);
        position.push((index - (index % columns))/columns);
        return position;
    },

    /**
     * Returns the index of the given position. If the position is invalid, returns null.
     * @param {Array} position
     * @returns {number|null} index number if position is valid, null otherwise
     */
     getIndexFromPosition: function(position) {
        var columns = gameHandler.currentGame.columns;
        if (gameHandler.checkValidPosition(position)) {
            return position[0] + columns * position[1];
        }
        return null;
    },

    /**
     * Returns jQuery card selector. If the index is invalid, returns null.
     * @param {number} index
     * @returns {Object|null} card selector object if index is valid, null otherwise
     */
     getCardFromIndex: function(index) {
        if(!gameHandler.checkValidIndex(index)) {
            return null;
        }
        return $('.card:nth-of-type('+(index+1)+')');
    },

    /**
     * Returns the set of all positions adjacent to the given position, which are on the game board
     * @param {Array} position
     * @returns {Array} array of positions
     */
     getValidNeighbors: function(position) {
        var neighbors = [];
        neighbors.push([position[0], position[1] - 1]);
        neighbors.push([position[0] + 1, position[1]]);
        neighbors.push([position[0], position[1] + 1]);
        neighbors.push([position[0] - 1, position[1]]);
        for (var i = neighbors.length-1; i>=0; i--) {
            if (!gameHandler.checkValidPosition(neighbors[i])) {
                neighbors.splice(i,1);
            }
        }
        return neighbors;
    },

    /**
     * If the given card is breakable, returns true, otherwise false.
     * @param {Object} card
     * @returns {boolean} True if card is breakable, false otherwise.
     */
     checkBreakable: function(card) {
        var position = gameHandler.getPositionFromIndex(card.index());
        if (position[1] == 0) {
            return true;
        }
        var neighbors = gameHandler.getValidNeighbors(position);
        for (var i=0; i<neighbors.length; i++) {
            var neighborCard = gameHandler.getCardFromIndex(gameHandler.getIndexFromPosition(neighbors[i]));
            if (neighborCard.hasClass('cleared')){
                return true;
            }
        }
        return false;
    },

    /**
     * If the given card back is transparent, returns true, otherwise false.
     * @param {Object} cardBack
     * @returns {boolean} true if cardBack is transparent, false otherwise
     */
     checkCardBackInvisible: function(cardBack) {
        return (cardBack.css('opacity') == 0);
    },

    /**
     * Sets the game area to stop or start allowing card flips
     * @param condition
     * @returns {null}
     */
     freezeFlips: function(condition) {
        if (condition) {
            $('#game-area').addClass('freeze-flips');
        } else {
            $('#game-area').removeClass('freeze-flips');
        }
        return null;
    },

    /**
     * Returns the set of all non-cleared face up cards
     * @returns {Object|jQuery|HTMLElement}
     */
     getFlippedCards: function() {
        return $('.flipped:not(.cleared)');
    },

    /**
     * Flips the given card face up.
     * @param card
     * @returns {null}
     */
     flipCard: function(card) {
        card.addClass('flipped');
        return null;
    },

    /**
     * Flips the given set of cards face down.
     * @param flippedCards
     * @returns {null}
     */
     unflipCards: function(flippedCards) {
        flippedCards.removeClass('flipped');
        return null;
    },

    /**
     * Clears the given set of cards.
     * @param flippedCards
     * @returns {null}
     */
     clearCards: function(flippedCards) {
        flippedCards.addClass('cleared');
        return null;
    },

    /**
     * Returns whether the given card data meets all the conditions to be matched.
     * @param {Array} flippedCardData
     * @returns {boolean} true if cards can be legally matched, false otherwise
     */
    checkMatchConditionsMet: function(flippedCardData) {
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
    },

    /**
     * Applies the consequences of the currently matched cards
     * @param flippedCardData
     * @returns {null}
     */
    applyMatchConsequences: function(flippedCardData) {
        gameHandler.currentGame.currentMatches++;
        return null;
    },

    /**
     * Runs card flipping procedure. New cards cannot be flipped by user while running. Starts matching procedure after
     * delay if at least two cards are flipped, otherwise returns flipping control to the user and returns null.
     * @param {Object} card
     * @returns {Object|null} reference of setTimeout function if matchingRound() is set to run, null otherwise
     */
    flippingRound: function(card) {
        gameHandler.freezeFlips(true);
        gameHandler.flipCard(card);
        var flippedCards = gameHandler.getFlippedCards();
        if (flippedCards.length < 2) {
            return gameHandler.freezeFlips(false);
        }
        return setTimeout(function(){gameHandler.matchingRound(flippedCards);}, 500);
    },

    /**
     * Runs card matching procedure.  Activates win or loss procedures if conditions are met, otherwise returns flipping
     * control to the user.
     * @param flippedCards
     * @returns {null}
     */
    matchingRound: function (flippedCards) {
        var flippedCardData = [];
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCardData.push(cardData.getCardDataFromCard(flippedCards[i], 'front'));
        }
        this.currentGame.currentMatchAttempts++;
        this.statistics.matchAttempts++;
        if (!gameHandler.checkMatchConditionsMet(flippedCardData)) {
            gameHandler.unflipCards(flippedCards);
            this.display_stats();
            return gameHandler.freezeFlips(false);
        }
        this.statistics.matchSuccesses++;
        gameHandler.applyMatchConsequences(flippedCardData);
        if (gameHandler.checkFailureConditions()) {
            setTimeout(function(){gameHandler.gameLost();},2000);
            return gameHandler.freezeFlips(true);
        }
        gameHandler.clearCards(flippedCards);
        if (gameHandler.checkWinConditions()) {
            setTimeout(function(){gameHandler.gameWon();},2000);
            return gameHandler.freezeFlips(true);
        }
        this.display_stats();
        return gameHandler.freezeFlips(false);
    },

    /**
     * Checks whether any conditions for game failure have been satisfied.
     * @returns {boolean} true if conditions for game failure satisfied, false otherwise
     */
    checkFailureConditions: function() {
        return false;
    },

    /**
     * Runs game loss procedures.
     * @returns {null}
     */
    gameLost: function() {
        $('main').addClass('lose');
        gameHandler.statistics.gamesLost++;
        gameHandler.display_stats();
        $('.game-message').text('You Lose!');
        return null;
    },


    /**
    * Checks whether all conditions for game success have been satisfied.
    * @returns {boolean} true if all conditions are met, false otherwise
    */
    checkWinConditions: function() {
        if (gameHandler.currentGame.currentMatches != gameHandler.currentGame.totalMatches()) {
            return false;
        }
        return true;
    },


    /**
     * Runs game win procedures.
     * @returns {null}
     */
    gameWon: function() {
        $('main').addClass('win');
        gameHandler.statistics.gamesWon++;
        gameHandler.display_stats();
        $('.game-message').text('You Win!');
        return null;
    },

    /**
     * Display stats in stats section on page.
     */
    display_stats: function(){
        //  Insert Total Games into html
        var winPercentage = (100 * this.statistics.gamesWinRatio()).toFixed(2) + ' %';
        var gamesPlayed = $('.total-games .value');
        gamesPlayed.html('');
        gamesPlayed.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Played : '}),
                    $('<th>',{text: this.statistics.gamesPlayed()})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Won : '}),
                    $('<td>',{text: this.statistics.gamesWon})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Lost : '}),
                    $('<td>',{text: this.statistics.gamesLost})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Abandoned : '}),
                    $('<td>',{text: this.statistics.gamesReset})
                ),
                $('<tr>').append(
                    $('<th>',{text: 'Win Rate : '}),
                    $('<th>',{text: winPercentage})
                )
            )
        );

        //  Insert Total Matches into html
        var totalMatchAccuracy = (100 * this.statistics.matchAccuracy()).toFixed(2) + ' %';
        var totalMatches = $('.total-matches .value');
        totalMatches.html('');
        totalMatches.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Attempted : '}),
                    $('<th>',{text: this.statistics.matchAttempts})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Completed : '}),
                    $('<td>',{text: this.statistics.matchSuccesses})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Failed : '}),
                    $('<td>',{text: this.statistics.matchFailures()})
                ),
                $('<tr>').append(
                    $('<th>',{text: 'Match Accuracy : '}),
                    $('<th>',{text: totalMatchAccuracy})
                )
            )
        );

        //  Insert Current Matches into html
        var currentMatchAccuracy = (100 * this.currentGame.currentMatchAccuracy()).toFixed(2) + ' %';
        var currentMatches = $('.current-matches .value');
        currentMatches.html('');
        currentMatches.append(
            $('<table>').append(
                $('<tr>').append(
                    $('<th>',{text: 'Attempted : '}),
                    $('<th>',{text: this.currentGame.currentMatchAttempts})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Completed : '}),
                    $('<td>',{text: this.currentGame.currentMatches})
                ),
                $('<tr>').append(
                    $('<td>',{text: 'Failed : '}),
                    $('<td>',{text: this.currentGame.currentMatchFailures()})
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
        gameHandler.freezeFlips(true);
        var main = $('main');
        if (!(main.hasClass('win')) && !(main.hasClass('lose'))) {
            this.statistics.gamesReset++;
        } else {
            main.removeClass('win').removeClass('lose');
        }
        this.currentGame.currentMatchAttempts = 0;
        this.currentGame.currentMatches = 0;
        $('.card').removeClass('cleared').removeClass('flipped').removeClass('breakable');
        this.display_stats();
        gameHandler.freezeFlips(false);
    }

};

//  Close Game Global Parameters

//  Begin Function Definitions



//  Close Function Definitions

//  Begin Document Ready Section

$(document).ready(function(){
    gameHandler.display_stats();
    $('.card,.card img').attr({'draggable': 'false'});

    $('#game-area').on('mouseenter','.card:not(.breakable):not(.cleared) .back',function(){
        if (gameHandler.checkBreakable($(this).parent())) {
            $(this).parent().addClass('breakable');
        }
    });
    $('#game-area').on('mousedown','.card:not(.breakable):not(.cleared) .back',function(){
        $(this).trigger('mouseenter');
    });
    $('#game-area').on('mouseup','.card.breakable:not(.cleared) .back',function(){
        if(gameHandler.checkCardBackInvisible($(this))) {
            gameHandler.flippingRound($(this).parent());
        }
    });
    $('#game-area').on('mouseleave','.card.breakable:not(.cleared) .back',function(){
        $(this).trigger('mouseup');
    });
    $('.reset').on('click',function(){
        gameHandler.reset_game();
    });
});

//  Close Document Ready Section