// #!/usr/bin/env node

 var GameTemplate = function() {

     this.board = []; //10x10,
     this.hand = [];
     this.events = [];
     this.deck = [];
     this.discard = [];
     this.active_player = undefined;
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
                return DinoGame.model.hand.splice(index, 1);
            },
            addCardToHand: function(card){
                  DinoGame.model.hand.push(card);
            },
            handIdToCardId: function(hand_id){
              return parseInt(hand_id.replace('hand', ''));
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
                return DinoGame.turn_state.clicked_id !== undefined;
            },
            endTurnAndSendData: function(){
              DinoGame.app.clearTurnState();
              var game_json = DinoGame.app.gameStateToJson();
              ref.child('game').child(authData.uid).set(game_json);
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
                DinoGame.turn_state.clicked_id = undefined;
                DinoGame.turn_state.clicked_type = undefined;
                DinoGame.turn_state.end_turn = false;
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
          turn_state: {
            clicked_id: undefined,
            clicked_type: undefined,
            end_turn:false
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
  var new_card = DinoGame.app.drawCardFromDeck();
  DinoGame.app.addCardToHand(new_card);
});

//move
//play creature card
//remove card from board
//play event card
$('.hand .species .card').click(function(){
  console.log('clicked species card in hand');
  DinoGame.turn_state.clicked_id = this.id;
  DinoGame.turn_state.clicked_type = 'species';
});

$('.hand .event .card').click(function(){
  console.log('clicked event card in hand');
  if (DinoGame.turn_state.clicked_id !== undefined && DinoGame.turn_state.clicked_type === 'event'){
    var id = DinoGame.app.handIdToCardId(DinoGame.turn_state.clicked_id);
    var card = DinoGame.app.removeCardFromHand(id);
    DinoGame.app.addCardToEvents(card);
    DinoGame.turn_state.end_turn = true;
  }else{
    DinoGame.turn_state.clicked_id = this.id;
    DinoGame.turn_state.clicked_type = 'event';
  }
});

$('#board td').click(function(){
  console.log('clicked board');
  if (DinoGame.turn_state.clicked_type === 'species'){
    var id = DinoGame.app.handIdToCardId(DinoGame.turn_state.clicked_id);
    var card = DinoGame.app.removeCardFromHand(id);
    var cell_x = $(this).data('x');
    var cell_y = $(this).data('y');
    DinoGame.app.addCardToBoard(card, cell_x, cell_y);
    DinoGame.turn_state.end_turn = true;
  }
});

//discard
//click card + then click discard pile
$('.discard').click(function(){
  console.log('clicked discard');
  if (DinoGame.turn_state.clicked_id !== undefined){
    var id = DinoGame.app.handIdToCardId(DinoGame.turn_state.clicked_id);
    var card = DinoGame.app.removeCardFromHand(id);
    DinoGame.app.addCardToDiscard(card);
  }
});


//end game  
//click end game button
//or activate when a player has no cards left

