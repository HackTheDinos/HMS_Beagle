// #!/usr/bin/env node

 var GameTemplate = function() {

     this.board = []; //10x10,
     this.hand = [];
     this.events = [];
     this.deck = [];
     this.discard = [];
     this.activePlayer = undefined;
 };

//console.log(new GameTemplate());

 var DinoGame = {
           app: {
            startGame:function() {
               //create new game
                DinoGame.model.game=new GameTemplate();
                console.log(DinoGame);
                DinoGame.app.initDeck();
                DinoGame.app.initHand();
                DinoGame.app.initBoard();
                DinoGame.app.updateFirebase();
             },
            initBoard: function(){
                DinoGame.model.game.board=[
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]];
            },
            initDeck:function() {
                //create deck of random cards (40)
                for(var i=0; i<38;i++)
                {
                    DinoGame.model.game.deck.push(DinoGame.model.cards.pop());
                }
            },
            initHand: function(){
                for(var i=0; i<6;i++)
                {
                  DinoGame.app.addCardToHand(DinoGame.app.drawCard());
                }
            },
            drawCard: function(){
                DinoGame.model.game.deck.pop();
            },
            removeCardFromGame: function(card_id){
              var success = removeCardWithIdFromHand(index);
              if (!success){
                success = removeCardWithIdFromEvents(index);
              }
              if (!success){
                success = removeCardWithIdFromBoard(index);
              }
              return success;
            },
            addCardToHand: function(card){
              DinoGame.model.game.hand.push(card);
            },
            getCardFromHand: function(index){
              return DinoGame.model.game.hand[index];
            },
            removeCardFromHand(index){
                DinoGame.model.game.hand.splice(index, 1);
            },
            removeCardWithIdFromHand: function(card_id){
              var remove_index = -1;
              for (var i=0; i<DinoGame.mode.game.hand.length; i++){
                var card = DinoGame.app.getCardFromHand(i);
                if (card.id == card_id){
                  remove_index = i;
                  break;
                }
              }
              if (remove_index >= 0){
                DinoGame.app.removeCardFromHand(remove_index);
                return true;
              }
              return false;
            },
            handIdToIndex: function(handId){
              return parseInt(handId.replace('hand', ''));
            },
            addCardToEvents: function(card){
                DinoGame.model.game.events.push(card);
            },
            getCardFromEvents: function(index){
              return DinoGame.model.game.events[index];
            },
            removeCardFromEvents(index){
                DinoGame.model.game.events.splice(index, 1);
            },
            removeCardWithIdFromEvents: function(card_id){
              var remove_index = -1;
              for (var i=0; i<DinoGame.mode.game.events.length; i++){
                var card = DinoGame.app.getCardFromEvents(i);
                if (card.id == card_id){
                  remove_index = i;
                  break;
                }
              }
              if (remove_index >= 0){
                DinoGame.app.removeCardFromEvents(remove_index);
                return true;
              }
              return false;
            },
            addCardToBoard: function(card, x, y){
                DinoGame.model.game.board[x][y] = card;
            },
            getCardFromBoard: function(x, y){
                return DinoGame.model.game.board[x][y];
            },
            removeCardFromBoard: function(x, y){
                DinoGame.model.game.board[x][y] = 0;
            },
            addCardToDiscard: function(card){
                DinoGame.model.game.discard.push(card);
            },
            removeCardWithIdFromBoard: function(card_id){
              var remove_x = -1;
              var remove_y = -1;
              for (var x=0; x<DinoGame.model.game.board.length; x++){
                for (var y=0; y<DinoGame.model.game.board[x].length; y++){
                  var card = DinoGame.app.getCardFromBoard(x, y);
                  if (card.id == card_id){
                    remove_x = x;
                    remove_y = y;
                    break;
                  }
                }
              }
              if (remove_x >= 0 && remove_y >= 0){
                DinoGame.app.removeCardFromBoard(remove_x, remove_y);
                return true;
              }
              return false;
            },
            getClickedCard: function(){
                return DinoGame.turnState.clickedId !== undefined;
            },
            endTurnAndUpdateFirebase: function(){
              DinoGame.app.clearTurnState();
              DinoGame.app.updateFirebase();
            },
            updateFirebase: function(){
              var gameJson = DinoGame.app.gameStateToJson();
              ref.child('game').child(authData.uid).set(gameJson);
            },
            gameStateToJson: function(){
              return {
                'board': DinoGame.model.game.board,
                'deck': DinoGame.model.game.deck,
                'discard': DinoGame.model.game.discard,
                'events': DinoGame.model.game.events
              };
            },
            clearTurnState: function(){
                DinoGame.turnState.clickedId = undefined;
                DinoGame.turnState.clickedType = undefined;
            },
            renderCard: function(card, is_event){
              if (is_event){
                return $('<img class="eventCard grow grow-hover" src="'+card.img+'.png" alt="" />');
              }else{
                return $('<img class="card grow grow-hover" src="'+card.img+'.png" alt="" />');
              }
            },
            renderBoard: function(){
              for (var x=0; x<DinoGame.model.game.board.length; x++){
                for (var y=0; y<DinoGame.model.game.board[x].length; y++){
                  var $cell = $('#board td[data-x="'+x+'"][data-y="'+y+'"]');
                  $cell.html("");
                  var card = DinoGame.app.getCardFromBoard(x, y);
                  $img = DinoGame.app.renderCard(card);
                  $cell.append($img);
                }
              }
            },
            renderHand: function(){
              for (var i=0; i<DinoGame.model.game.hand.length; i++){
                var $div = $('#hand'+i);
                $div.html("");
                var card = DinoGame.app.getCardFromHand(i);
                $img = DinoGame.app.renderCard(card);
                $div.append($img);
              }
            },
            renderEvents: function(){
              for (var i=0; i<DinoGame.model.game.events.length; i++){
                var $div = $('#events'+i);
                $div.html("");
                var card = DinoGame.app.getCardFromEvents(i);
                $img = DinoGame.app.renderCard(card, true);
                $div.append($img);
              }
            },
            renderGame: function(){
              DinoGame.app.renderBoard();
              DinoGame.app.renderHand();
              DinoGame.app.renderEvents();
            },
            setClickedCard: function(card){
              console.log('clicked species card');
              DinoGame.turnState.clickedCard = card;
            },
            handleEventCardClickedInHand: function(card){
              console.log('clicked event card in hand');
              if (DinoGame.turnState.clickedCard !== undefined && 
                  DinoGame.turnState.clickedCard.type === 'event' &&
                  DinoGame.turnState.clickedCard.id == card.id
                  ){
                DinoGame.app.removeCardFromGame(card.id);
                DinoGame.app.addCardToEvents(card);
              }else{
                DinoGame.app.setClickedCard(card);
              }
            },
          },
          model:{
            cards: CARD_DATA.cards, //load all cards
            game:{}
          },
          turnState: {
            clickedCard: undefined,
          },
          dom:{}
  };

  
//end game
  //count scores
  //displays who wins
  //enables start game button
  
//draw card
//click "deck" button, draw card
$('#deck').click(function(){
  console.log("clicked deck");
  var newCard = DinoGame.app.drawCardFromDeck();
  DinoGame.app.addCardToHand(newCard);
});

//move
//play creature card
//remove card from board
//play event card
$('.hand .cardContainer').click(function(){
  var card_id = DinoGame.app.handIdToIndex(this.id);
  var card = DinoGame.app.getCardFromHand(card_id);
  }if (card.type == 'event'){
    DinoGame.app.handleEventCardClickedInHand(card);
  }else{
    DinoGame.app.setClickedCard(card);
  }
});

$('.events .event').click(function(){
  var card_id = DinoGame.app.eventIdToIndex(this.id);
  var card = DinoGame.app.getCardFromEvents(card_id);
  DinoGame.app.setClickedCard(card);
});

$('#board td').click(function(){
  console.log('clicked board');
  var clickedCard = DinoGame.turnState.clickedCard;
  if (clickedCard === undefined){
    return;
  }
  if (clickedCard.type !== 'event'){
    var id = DinoGame.app.handIdToIndex(clickedCard.id);
    var card = DinoGame.app.removeCardFromGame(id);
    var cellX = $(this).data('x');
    var cellY = $(this).data('y');
    DinoGame.app.addCardToBoard(card, cellX, cellY);
  }
});

//discard
//click card + then click discard pile
$('#graveyard').click(function(){
  console.log('clicked discard');
  var clickedCard = DinoGame.turnState.clickedCard;
  if (clickedCard === undefined){
    return;
  }
  var success = DinoGame.app.removeCardFromGame(clickedCard.id);
  if (success){
    DinoGame.app.addCardToDiscard(clickedCard);
  }
});


//end turn 
//click end turn button
$('#end-turn').click(function(){
  DinoGame.app.endTurnAndUpdateFirebase();
});

