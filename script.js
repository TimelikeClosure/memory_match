
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

    $('.card').on('mouseup','.back',function(){
        hideCardBackIfInvisible($(this));
    });
    $('.card').on('mouseleave','.back',function(){
        hideCardBackIfInvisible($(this));
    });
});