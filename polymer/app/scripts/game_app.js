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
            removeCardFromHand: function(index){
                return DinoGame.model.game.hand.splice(index, 1);
            },
            addCardToHand: function(card){
                  DinoGame.model.game.hand.push(card);
            },
            handIdToCardId: function(handId){
              return parseInt(handId.replace('hand', ''));
            },
            addCardToEvents: function(card){
                DinoGame.model.game.events.push(card);
            },
            addCardToBoard: function(card, x, y){
                DinoGame.model.game.board[x][y] = card;
            },
            addCardToDiscard: function(card){
                DinoGame.model.game.discard.push(card);
            },
            getClickedCard: function(){
                return DinoGame.turnState.clickedId !== undefined;
            },
            endTurnAndSendData: function(){
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
                'events': DinoGame.mode.game.events
              };
            },
            clearTurnState: function(){
                DinoGame.turnState.clickedId = undefined;
                DinoGame.turnState.clickedType = undefined;
                DinoGame.turnState.endTurn = false;
            },
            /*
            renderBoard: function(){
              var $board = $("#board");
              for (var x=0; x<DinoGame.model.game.board.length; x++){

              }
              DinoGame.model.game.board
            }
            */
          },
          model:{
            cards: CARD_DATA.cards, //load all cards
            game:{}
          },
          turnState: {
            clickedId: undefined,
            clickedType: undefined,
            endTurn:false
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
  var newCard = DinoGame.app.drawCardFromDeck();
  DinoGame.app.addCardToHand(newCard);
});

//move
//play creature card
//remove card from board
//play event card
$('.hand .species .card').click(function(){
  console.log('clicked species card in hand');
  DinoGame.turnState.clickedId = this.id;
  DinoGame.turnState.clickedType = 'species';
});

$('.hand .event .card').click(function(){
  console.log('clicked event card in hand');
  if (DinoGame.turnState.clickedId !== undefined && DinoGame.turnState.clickedType === 'event'){
    var id = DinoGame.app.handIdToCardId(DinoGame.turnState.clickedId);
    var card = DinoGame.app.removeCardFromHand(id);
    DinoGame.app.addCardToEvents(card);
    DinoGame.turnState.endTurn = true;
  }else{
    DinoGame.turnState.clickedId = this.id;
    DinoGame.turnState.clickedType = 'event';
  }
});

$('#board td').click(function(){
  console.log('clicked board');
  if (DinoGame.turnState.clickedType === 'species'){
    var id = DinoGame.app.handIdToCardId(DinoGame.turnState.clickedId);
    var card = DinoGame.app.removeCardFromHand(id);
    var cellX = $(this).data('x');
    var cellY = $(this).data('y');
    DinoGame.app.addCardToBoard(card, cellX, cellY);
    DinoGame.turnState.endTurn = true;
  }
});

//discard
//click card + then click discard pile
$('.discard').click(function(){
  console.log('clicked discard');
  if (DinoGame.turnState.clickedId !== undefined){
    var id = DinoGame.app.handIdToCardId(DinoGame.turnState.clickedId);
    var card = DinoGame.app.removeCardFromHand(id);
    DinoGame.app.addCardToDiscard(card);
  }
});


//end game  
//click end game button
//or activate when a player has no cards left

