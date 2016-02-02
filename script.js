
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
        },

        /**
         * Increments match attempt counter(s) and updates the statistics page.
         * @param {string} matchAttemptType 'success' or 'failure'
         * @returns {null}
         */
        addMatchAttempt: function(matchAttemptType) {
            if (matchAttemptType == 'success') {
                this.currentMatchAttempts++;
                this.currentMatches++;
            } else if (matchAttemptType == 'failure') {
                this.currentMatchAttempts++;
            }
            this.updateStatDisplay();
            return null;
        },

        /**
         * Checks if the given index is a legal board index
         * @param {number} index
         * @returns {boolean} true if index is a valid card index, false otherwise
         */
        checkValidIndex: function(index) {
            var rows = this.rows;
            var columns = this.columns;
            return (index >= 0 && index < rows * columns);
        },

        /**
         * Checks if the given position is a legal board position
         * @param {Array} position
         * @returns {boolean} true if position is legal, false otherwise
         */
        checkValidPosition: function(position) {
            var rows = this.rows;
            var columns = this.columns;
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
            var rows = this.rows;
            var columns = this.columns;
            if (!this.checkValidIndex(index)) {
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
            var columns = this.columns;
            if (this.checkValidPosition(position)) {
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
            if(!this.checkValidIndex(index)) {
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
                if (!this.checkValidPosition(neighbors[i])) {
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
            var position = this.getPositionFromIndex(card.index());
            if (position[1] == 0) {
                return true;
            }
            var neighbors = this.getValidNeighbors(position);
            for (var i=0; i<neighbors.length; i++) {
                var neighborCard = this.getCardFromIndex(this.getIndexFromPosition(neighbors[i]));
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
         * Updates statistics panel with matches for current game.
         */
        updateStatDisplay: function() {
            var currentMatchAccuracy = (100 * this.currentMatchAccuracy()).toFixed(2) + ' %';
            var currentMatches = $('.current-matches .value');
            currentMatches.html('');
            currentMatches.append(
                $('<table>').append(
                    $('<tr>').append(
                        $('<th>',{text: 'Attempted : '}),
                        $('<th>',{text: this.currentMatchAttempts})
                    ),
                    $('<tr>').append(
                        $('<td>',{text: 'Completed : '}),
                        $('<td>',{text: this.currentMatches})
                    ),
                    $('<tr>').append(
                        $('<td>',{text: 'Failed : '}),
                        $('<td>',{text: this.currentMatchFailures()})
                    ),
                    $('<tr>').append(
                        $('<th>',{text: 'Match Accuracy : '}),
                        $('<th>',{text: currentMatchAccuracy})
                    )
                )
            );
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

        /**
         * Increments match attempt counter(s) and updates the statistics page.
         * @param {string} matchAttemptType 'success' or 'failure'
         * @returns {null}
         */
        addMatchAttempt: function(matchAttemptType) {
            if (matchAttemptType == 'success') {
                this.matchAttempts++;
                this.matchSuccesses++;
            } else if (matchAttemptType == 'failure') {
                this.matchAttempts++;
            }
            this.updateStatDisplay('matches');
            return null;
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
        },

        /**
         * Adds statistics for game completion
         * @param {string} outcome
         * @returns {null}
         */
        addGameCompletion: function(outcome) {
            switch (outcome) {
                case 'win':
                    this.gamesWon++;
                    break;
                case 'loss':
                    this.gamesLost++;
                    break;
                case 'reset':
                    this.gamesReset++;
                    break;
            }
            return this.updateStatDisplay('games');
        },

        /**
         * Updates statistics panel with the given statistics type.
         * @param {string} statType
         * @returns {null}
         */
        updateStatDisplay: function(statType){
            if (statType == 'games') {  //  Insert Total Games into html
                var winPercentage = (100 * this.gamesWinRatio()).toFixed(2) + ' %';
                var gamesPlayed = $('.total-games .value');
                gamesPlayed.html('');
                gamesPlayed.append(
                    $('<table>').append(
                        $('<tr>').append(
                            $('<th>',{text: 'Played : '}),
                            $('<th>',{text: this.gamesPlayed()})
                        ),
                        $('<tr>').append(
                            $('<td>',{text: 'Won : '}),
                            $('<td>',{text: this.gamesWon})
                        ),
                        $('<tr>').append(
                            $('<td>',{text: 'Lost : '}),
                            $('<td>',{text: this.gamesLost})
                        ),
                        $('<tr>').append(
                            $('<td>',{text: 'Abandoned : '}),
                            $('<td>',{text: this.gamesReset})
                        ),
                        $('<tr>').append(
                            $('<th>',{text: 'Win Rate : '}),
                            $('<th>',{text: winPercentage})
                        )
                    )
                );
            } else if (statType == 'matches') {  //  Insert Total Matches into html
                var totalMatchAccuracy = (100 * this.matchAccuracy()).toFixed(2) + ' %';
                var totalMatches = $('.total-matches .value');
                totalMatches.html('');
                totalMatches.append(
                    $('<table>').append(
                        $('<tr>').append(
                            $('<th>',{text: 'Attempted : '}),
                            $('<th>',{text: this.matchAttempts})
                        ),
                        $('<tr>').append(
                            $('<td>',{text: 'Completed : '}),
                            $('<td>',{text: this.matchSuccesses})
                        ),
                        $('<tr>').append(
                            $('<td>',{text: 'Failed : '}),
                            $('<td>',{text: this.matchFailures()})
                        ),
                        $('<tr>').append(
                            $('<th>',{text: 'Match Accuracy : '}),
                            $('<th>',{text: totalMatchAccuracy})
                        )
                    )
                );
            }
            return null;  //  Returns null
        }
    },

    addMatchAttempt: function(matchAttemptType) {
        this.currentGame.addMatchAttempt(matchAttemptType);
        this.statistics.addMatchAttempt(matchAttemptType);
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
     * Applies the consequences of the currently mis-matched cards
     * @param {Array} flippedCardData
     * @returns {null}
     */
    applyNoMatchConsequences: function(flippedCardData) {
        this.addMatchAttempt('failure');
        return null;
    },

    /**
     * Applies the consequences of the currently matched cards
     * @param {Array} flippedCardData
     * @returns {null}
     */
    applyMatchConsequences: function(flippedCardData) {
        this.addMatchAttempt('success');
        return null;
    },

    /**
     * Runs card flipping procedure. New cards cannot be flipped by user while running. Starts matching procedure after
     * delay if at least two cards are flipped, otherwise returns flipping control to the user and returns null.
     * @param {Object} card
     * @returns {Object|null} reference of setTimeout function if matchHandler() is set to run, null otherwise
     */
    flipHandler: function(card) {
        this.currentGame.freezeFlips(true);
        this.currentGame.flipCard(card);
        var flippedCards = this.currentGame.getFlippedCards();
        if (flippedCards.length < 2) {
            return this.currentGame.freezeFlips(false);
        }
        return setTimeout(function(){gameHandler.matchHandler(flippedCards);}, 500);
    },

    /**
     * Runs card matching procedure.  Activates win or loss procedures if conditions are met, otherwise returns flipping
     * control to the user.
     * @param flippedCards
     * @returns {null}
     */
    matchHandler: function (flippedCards) {
        var flippedCardData = [];
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCardData.push(cardData.getCardDataFromCard(flippedCards[i], 'front'));
        }
        if (!this.checkMatchConditionsMet(flippedCardData)) {
            this.currentGame.unflipCards(flippedCards);
            this.applyNoMatchConsequences(flippedCardData);
            return this.currentGame.freezeFlips(false);
        }
        this.applyMatchConsequences(flippedCardData);
        if (this.checkFailureConditions()) {
            setTimeout(function(){gameHandler.gameLost();},2000);
            return this.currentGame.freezeFlips(true);
        }
        this.currentGame.clearCards(flippedCards);
        if (this.checkWinConditions()) {
            setTimeout(function(){gameHandler.gameWon();},2000);
            return this.currentGame.freezeFlips(true);
        }
        this.displayAllStats();
        return this.currentGame.freezeFlips(false);
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
        this.statistics.addGameCompletion('loss');
        return null;
    },

    /**
    * Checks whether all conditions for game success have been satisfied.
    * @returns {boolean} true if all conditions are met, false otherwise
    */
    checkWinConditions: function() {
        if (this.currentGame.currentMatches != this.currentGame.totalMatches()) {
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
        this.statistics.addGameCompletion('win');
        return null;
    },

    /**
     *
     * @param {Array} statTypes
     */
    displayAllStats: function(statTypes){
        //  Insert Total Games into html
        this.statistics.updateStatDisplay('games');
        //  Insert Total Matches into html
        this.statistics.updateStatDisplay('matches');
        //  Insert Current Matches into html
        this.currentGame.updateStatDisplay();
    },
    //  Close displayAllStats method

    reset_game: function(){
        this.currentGame.freezeFlips(true);
        var main = $('main');
        if (!(main.hasClass('win')) && !(main.hasClass('lose'))) {
            this.statistics.addGameCompletion('reset');
        } else {
            main.removeClass('win').removeClass('lose');
        }
        this.currentGame.currentMatchAttempts = 0;
        this.currentGame.currentMatches = 0;
        $('.card').removeClass('cleared').removeClass('flipped').removeClass('breakable');
        this.displayAllStats();
        this.currentGame.freezeFlips(false);
    }

};

//  Close Game Global Parameters

//  Begin Function Definitions



//  Close Function Definitions

//  Begin Document Ready Section

$(document).ready(function(){
    gameHandler.displayAllStats();
    $('.card,.card img').attr({'draggable': 'false'});

    $('#game-area').on('mouseenter','.card:not(.breakable):not(.cleared) .back',function(){
        if (gameHandler.currentGame.checkBreakable($(this).parent())) {
            $(this).parent().addClass('breakable');
        }
    });
    $('#game-area').on('mousedown','.card:not(.breakable):not(.cleared) .back',function(){
        $(this).trigger('mouseenter');
    });
    $('#game-area').on('mouseup','.card.breakable:not(.cleared) .back',function(){
        if(gameHandler.currentGame.checkCardBackInvisible($(this))) {
            gameHandler.flipHandler($(this).parent());
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