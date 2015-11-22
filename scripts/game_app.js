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
            NUM_HAND_CARDS: 6,
            NUM_DECK_CARDS: 38,
            NUM_EVENT_CARDS: 6,
            startGame: function(counterPartyUid, uid) {
                console.log('qqq', counterPartyUid, uid);
                //create new game
                DinoGame.model.game = new GameTemplate();
                DinoGame.app.initDeck();
                DinoGame.app.initHand();
                DinoGame.app.initEvents();
                DinoGame.app.initBoard();
                DinoGame.app.updateFirebase(counterPartyUid, uid);
                //ref.child('game').child(authData.uid).on('value', function(snapshotgame) {
                //    console.log('www', snapshotgame.val());
                //    DinoGame.app.updateGame(snapshotgame.val());
                //    DinoGame.app.renderGame();
                //});
                DinoGame.app.renderGame();
                console.log(DinoGame);
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
                for(var i=0; i<DinoGame.app.NUM_DECK_CARDS;i++)
                {
                    DinoGame.model.game.deck.push(DinoGame.model.cards.pop());
                }
                DinoGame.app.shuffleDeck();
            },
            initHand: function(){
                for(var i=0; i<DinoGame.app.NUM_HAND_CARDS;i++)
                {
                  DinoGame.app.addCardToHand(DinoGame.app.drawCard());
                }
            },
            initEvents: function(){
                for(var i=0; i<DinoGame.app.NUM_EVENT_CARDS; i++){

                  DinoGame.app.addCardToEvents(undefined);
                }

            },
            shuffleDeck: function() {
                var array = DinoGame.model.game.deck;
                var currentIndex = array.length, temporaryValue, randomIndex ;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                  // Pick a remaining element...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;

                  // And swap it with the current element.
                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }

                return array;
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
                return DinoGame.model.game.deck.pop();
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
              for (var i=0; i<DinoGame.app.NUM_HAND_CARDS; i++){
                if (DinoGame.model.game.hand[i] === undefined){
                    DinoGame.model.game.hand[i] = card;
                    break;
                }
              }
              
            },
            getCardFromHand: function(index){
              return DinoGame.model.game.hand[index];
            },
            removeCardFromHand(index){
                DinoGame.model.game.hand[index] = undefined;
            },
            removeCardWithIdFromHand: function(cardId){
              var removeIndex = -1;
              for (var i=0; i<DinoGame.app.NUM_HAND_CARDS; i++){
                var card = DinoGame.app.getCardFromHand(i);
                if (card === undefined){
                  continue;
                }
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
                for (var i=0; i<DinoGame.app.NUM_EVENT_CARDS; i++){
                  if (DinoGame.model.game.events[i] === undefined){
                      DinoGame.model.game.events[i] = card;
                      break;
                  }
              }
            },
            getCardFromEvents: function(index){
              return DinoGame.model.game.events[index];
            },
            removeCardFromEvents: function(index){
                DinoGame.model.game.events[index] = undefined;
            },
            removeCardWithIdFromEvents: function(cardId){
              var removeIndex = -1;
              for (var i=0; i<DinoGame.app.NUM_EVENT_CARDS; i++){
                var card = DinoGame.app.getCardFromEvents(i);
                if (!card){
                  continue;
                }
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
              //var gameJson = DinoGame.app.gameStateToJson(counterPartyUid, uid);
              //ref.child('game').child(authData.uid).set(gameJson);
              //ref.child('game').child(counterPartyUid).set(gameJson);
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
            renderCard: function(card, location){
              if (!card){
                return;
              }
              var $img = undefined;
              var em = "";
              if (location == 'event'){
                $img = $('<img class="eventCard grow" src="'+card.img+'.png" alt="" />');
                em = "-1.5em";
              } else if (location == 'hand'){
                $img = $('<img class="handCard grow" src="'+card.img+'.png" alt="" />');
                em = "1.5em";
              } else {
                $img = $('<img class="boardCard grow" src="'+card.img+'.png" alt="" />');
                em = "1.5em";
              }
              $img.mouseenter(function(){
                $(this).css({"transform": "scale(10.0) translateX("+em+")"});
              })
              $img.mouseleave(function(){
                $(this).css({"transform": "scale(1.0) translateX(0em)"});
              })
              return $img;
            },
            renderBoard: function(){
              for (var x=0; x<DinoGame.model.game.board.length; x++){
                for (var y=0; y<DinoGame.model.game.board[x].length; y++){
                  var $cell = $('#board td[data-x="'+x+'"][data-y="'+y+'"]');
                  $cell.html('');
                  var card = DinoGame.app.getCardFromBoard(x, y);
                  var $img = DinoGame.app.renderCard(card, 'board');
                  $cell.append($img);
                }
              }
            },
            renderHand: function(){
              for (var i=0; i<DinoGame.app.NUM_HAND_CARDS; i++){
                var $div = $('#hand'+i);
                $div.html('');
                var card = DinoGame.app.getCardFromHand(i);
                var $img = DinoGame.app.renderCard(card, 'hand');
                $div.append($img);
              }
            },
            renderEvents: function(){
              for (var i=0; i<DinoGame.app.NUM_EVENT_CARDS; i++){
                var $div = $('#event'+i);
                $div.html('');
                var card = DinoGame.app.getCardFromEvents(i);
                var $img = DinoGame.app.renderCard(card, 'event');
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


$(function(){
  DinoGame.app.startGame("cat1", "cat2");

  //end game
    //count scores
    //displays who wins
    //enables start game button

  //draw card
  //click "deck" button, draw card
  $('#deck').click(function(){
    console.log('clicked deck');
    var newCard = DinoGame.app.drawCard();
    DinoGame.app.addCardToHand(newCard);
    DinoGame.app.renderGame();
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
    DinoGame.app.renderGame();
  });

  $('.events .event').click(function(){
    var cardId = DinoGame.app.eventIdToIndex(this.id);
    var card = DinoGame.app.getCardFromEvents(cardId);
    DinoGame.app.setClickedCard(card);
    DinoGame.app.renderGame();
  });

  $('#board td').click(function(){
    console.log('clicked board');
    var clickedCard = DinoGame.turnState.clickedCard;
    if (clickedCard === undefined){
      return;
    }
    if (clickedCard.type !== 'event'){
      DinoGame.app.removeCardFromGame(clickedCard.id);
      var cellX = $(this).data('x');
      var cellY = $(this).data('y');
      DinoGame.app.addCardToBoard(clickedCard, cellX, cellY);
    }
    DinoGame.app.renderGame();
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
    DinoGame.app.renderGame();
  });


  //end turn
  //click end turn button
  $('#end-turn').click(function(){
    DinoGame.app.endTurnAndUpdateFirebase();
  });



});


