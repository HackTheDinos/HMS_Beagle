
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

 Card={
        "id":0
        "type": "",
        "name": "",
        "img": "",
        "level": 0,
        "points": 0,
        "periods": [],
        "terrain": [],
        "flight": 0,
        "description": "",
        "play": "",
        "effect": "",
        "extinct": false
}

 DinoGame = {
           app: {
             startGame:function() {
               //create new game
                DinoGame.model.game==new GameTemplate();

                //create deck of random cards (40)
                for(int i=0<i<40;i++)
                {
                    DinoGame.model.game.deck.push(DinoGame.app.getCardFromDeck());
                }               
                //deal  player  hand
                for(int i=0<i<6;i++)
                {
                  DinoGame.model.players.player1.push(DinoGame.model.game.deck.pop());
                }
                //sync with other player hand
                  
                //pick who's turn it is (random)
                
             },
              getCardFromDeck:function() {
                return  DinoGame.model.cards.pop();  
              }
           },
           model:{
             cards:[],//load all cards
             game:{}
           },
           dom:{}
         }
         

  
//end game
  //count scores
  //displays who wins
  //enables start game button
  
//draw card

//move

//discard

//play event card

//play creature card

//remove card from board

//end game  



