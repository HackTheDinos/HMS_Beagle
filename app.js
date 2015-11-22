
 GameTemplate={
   board:[]//10x10,
     players{
       player1:{
         hand:[],
       },
       player2:{
         hand:[],
       }
     }
   deck:[],
   discard:[],
   }

}


 DinoGame = {
           app: {
             startGame:function() {
                //create new game
                DinoGame.model.game==new GameTemplate();
                DinoGame.app.initDeck();
                DinoGame.app.initHand();
              },
              initDeck:function() {
                //create deck of random cards (40)
                for(int i=0<i<40;i++)
                {
                    DinoGame.model.game.deck.push(DinoGame.model.cards.pop());
                }
              },
              initHand: function(){
                for(int i=0<i<6;i++)
                {
                  DinoGame.app.addCardToHand(DinoGame.app.drawCard());
                }
              },
              drawCard: function(){
                DinoGame.model.game.deck.pop()
              },
             removeCardFromHand: function(index){
                return DinoGame.model.hand.splice(index, 1);
              },
             addCardToHand: function(card){
                  DinoGame.model.hand.push(card);
              },
             addCardToEvents: function(card){
                DinoGame.model.game.events.push(card);
              },
             addCardToBoard: function(card, x, y){
                DinoGame.model.game.board[x][y] = card;
              },
             addCardToDiscard: function(card){
                DinoGame.model.game.discard.push(card);
              }
           },
           model:{
             cards: CARD_DATA.cards, //load all cards
             game:{}
           },
           dom:{}
         }



var TurnState = {
  clicked_id: undefined,
  clicked_type: undefined,
  end_turn:false
}

//end game
  //count scores
  //displays who wins
  //enables start game button
  
//draw card
//click "deck" button, draw card
$("#deck").click(function(){
  var new_card = DinoGame.app.drawCardFromDeck();
  DinoGame.app.addCardToHand(new_card);
});

//move
//play creature card
//remove card from board
//play event card
$("#hand .species .card").click(function(){
  TurnState.clicked_id = this.id;
  TurnState.clicked_type = "species";
});

$("#hand .event .card").click(function(){
  if (TurnState.clicked_id !== undefined && TurnState.clicked_type == "event"){
    var card = DinoGame.app.removeCardFromHand(TurnState.clicked_id);
    DinoGame.app.addCardToEvents(card);
    TurnState.end_turn = true;
  }else{
    TurnState.clicked_id = this.id;
    TurnState.clicked_type = "event";
  }
});

$("#species-board td").click(function(){
  if (TurnState.clicked_type == "species"){
    var card = DinoGame.app.removeCardFromHand(TurnState.clicked_id);
    var cell_x = $(this).data("x");
    var cell_y = $(this).data("y");
    DinoGame.app.addCardToBoard(card, cell_x, cell_y);
    TurnState.end_turn = true;
  }
});

//discard
//click card + then click discard pile
$(".discard").click(function(){
  if (TurnState.clicked_id !== undefined){
    var card = DinoGame.app.removeCardFromHand(TurnState.clicked_id);
    DinoGame.app.addCardToDiscard(card);
  }
});


//end game  
//click end game button
//or activate when a player has no cards left



