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
            startGame: function(counterPartyUid, uid) {
                console.log('qqq', counterPartyUid, uid);
                //create new game
                DinoGame.model.game = new GameTemplate();
                console.log(DinoGame);
                DinoGame.app.initDeck();
                DinoGame.app.initHand();
                DinoGame.app.initBoard();
                DinoGame.app.updateFirebase(counterPartyUid, uid);
                ref.child('game').child(authData.uid).on('value', function(snapshotgame) {
                    console.log('www', snapshotgame.val());
                    DinoGame.app.updateGame(snapshotgame.val());
                    DinoGame.app.renderGame();
                });
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
            updateGame: function(json_data){
              DinoGame.model.game.deck = json_data.deck === undefined ? [] : json_data.deck;
              DinoGame.model.game.board = json_data.board === undefined ? [] : json_data.board;
              DinoGame.model.game.events = json_data.events === undefined ? [] : json_data.events;
              DinoGame.model.game.hand = json_data.hand === undefined ? []: json_data.hand;
              DinoGame.model.game.discard = json_data.discard === undefined ? [] : json_data.discard;
              if (DinoGame.mode.game.board === []){
                DinoGame.app.initBoard();
              }
            },
            drawCard: function(){
                DinoGame.model.game.deck.pop();
            },
            removeCardFromGame: function(cardId){
              var success = DinoGame.app.removeCardWithIdFromHand(cardId);
              if (!success){
                success = DinoGame.app.removeCardWithIdFromEvents(cardId);
              }
              if (!success){
                success = DinoGame.app.removeCardWithIdFromBoard(cardId);
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
            removeCardWithIdFromHand: function(cardId){
              var removeIndex = -1;
              for (var i=0; i<DinoGame.model.game.hand.length; i++){
                var card = DinoGame.app.getCardFromHand(i);
                if (card.id === cardId){
                  removeIndex = i;
                  break;
                }
              }
              if (removeIndex >= 0){
                DinoGame.app.removeCardFromHand(removeIndex);
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
            removeCardWithIdFromEvents: function(cardId){
              var removeIndex = -1;
              for (var i=0; i<DinoGame.mode.game.events.length; i++){
                var card = DinoGame.app.getCardFromEvents(i);
                if (card.id === cardId){
                  removeIndex = i;
                  break;
                }
              }
              if (removeIndex >= 0){
                DinoGame.app.removeCardFromEvents(removeIndex);
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
            removeCardWithIdFromBoard: function(cardId){
              var removeX = -1;
              var removeY = -1;
              for (var x=0; x<DinoGame.model.game.board.length; x++){
                for (var y=0; y<DinoGame.model.game.board[x].length; y++){
                  var card = DinoGame.app.getCardFromBoard(x, y);
                  if (card.id === cardId){
                    removeX = x;
                    removeY = y;
                    break;
                  }
                }
              }
              if (removeX >= 0 && removeY >= 0){
                DinoGame.app.removeCardFromBoard(removeX, removeY);
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
            updateFirebase: function(counterPartyUid, uid){
              var gameJson = DinoGame.app.gameStateToJson(counterPartyUid, uid);
              ref.child('game').child(authData.uid).set(gameJson);
            },
            gameStateToJson: function(counterPartyUid, uid){
              return {
                counterParty: counterPartyUid,
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
            renderCard: function(card, isEvent){
              if (isEvent){
                return $('<img class="eventCard grow grow-hover" src="'+card.img+'.png" alt="" />');
              }else{
                return $('<img class="card grow grow-hover" src="'+card.img+'.png" alt="" />');
              }
            },
            renderBoard: function(){
              for (var x=0; x<DinoGame.model.game.board.length; x++){
                for (var y=0; y<DinoGame.model.game.board[x].length; y++){
                  var $cell = $('#board td[data-x="'+x+'"][data-y="'+y+'"]');
                  $cell.html('');
                  var card = DinoGame.app.getCardFromBoard(x, y);
                  var $img = DinoGame.app.renderCard(card);
                  $cell.append($img);
                }
              }
            },
            renderHand: function(){
              for (var i=0; i<DinoGame.model.game.hand.length; i++){
                var $div = $('#hand'+i);
                $div.html('');
                var card = DinoGame.app.getCardFromHand(i);
                var $img = DinoGame.app.renderCard(card);
                $div.append($img);
              }
            },
            renderEvents: function(){
              for (var i=0; i<DinoGame.model.game.events.length; i++){
                var $div = $('#events'+i);
                $div.html('');
                var card = DinoGame.app.getCardFromEvents(i);
                var $img = DinoGame.app.renderCard(card, true);
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
                  DinoGame.turnState.clickedCard.id === card.id
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
  console.log('clicked deck');
  var newCard = DinoGame.app.drawCardFromDeck();
  DinoGame.app.addCardToHand(newCard);
});

//move
//play creature card
//remove card from board
//play event card
$('.hand .cardContainer').click(function(){
  var cardId = DinoGame.app.handIdToIndex(this.id);
  var card = DinoGame.app.getCardFromHand(cardId);
  if (card.type === 'event'){
    DinoGame.app.handleEventCardClickedInHand(card);
  }else{
    DinoGame.app.setClickedCard(card);
  }
});

$('.events .event').click(function(){
  var cardId = DinoGame.app.eventIdToIndex(this.id);
  var card = DinoGame.app.getCardFromEvents(cardId);
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

