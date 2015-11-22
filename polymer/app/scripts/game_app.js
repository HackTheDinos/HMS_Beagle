// #!/usr/bin/env node


var CARD_DATA = {
  "cards": [
    {
      "tidbit": "n/a",
      "flight": 2,
      "description": "dimorphodon macronyx was discovered near lyme regis, england, on what is now called the jurassic coast. dimorphodon means \u201ctwo-form tooth,\u201d which refers to its two distinct types of teeth. macronyx refers to its large claws.",
      "rules": "flight: 2",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "ar",
      "id": 0,
      "count": 1,
      "name": "dimorphodon macronyx",
      "img": "",
      "level": 3,
      "points": 5,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "jeholopterus was named after a city near where it was found in northeastern china. it lived in the forest, hunted insects, and is the only known species in its genus.",
      "rules": "flight: 1",
      "terrain": [
        "land"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "ar",
      "id": 1,
      "count": 1,
      "name": "jeholopterus ningchengensis",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 2,
      "description": "pteranodon is one of the most famous pterosaurs, having appeared in movies such as king kong. its name means \u201cwing without tooth\u201d and has been found in western kansas. scientists think it may have dived for fish.",
      "rules": "flight: 2",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "ar",
      "id": 2,
      "count": 1,
      "name": "pteranodon longiceps",
      "img": "",
      "level": 3,
      "points": 5,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "this pterosaur\u2019s name comes from the greek word \u201cpteron\u201d (wing) and the latin word \u201causter\u201d (south wind).  it may have used its thousands of bristle-like teeth to strain crustaceans, plankton, and other small aquatic animals.",
      "rules": "flight: 1",
      "terrain": [
        "ocean",
        "fresh_water"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "ar",
      "id": 3,
      "count": 1,
      "name": "pterodaustro guinazui",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 3,
      "description": "named after both the aztec air god quetzalcoatl and the northrop corporation, this texan pterosaur had a wingspan of roughly 33 feet (the size of a 2-person airplane) and a height of 16-18 feet!",
      "rules": "flight: 3. special restriction: must be played adjacent to two different level 2 cards.",
      "terrain": [
        "fresh_water",
        "land"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "ar",
      "id": 4,
      "count": 1,
      "name": "quetzalcoatlus northropi",
      "img": "",
      "level": 3,
      "points": 7,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 2,
      "description": "tupuxuara\u00a0means \"long crested\" and has been found along ancient south american coasts. scientists are not sure if they ate fruit or fish.",
      "rules": "flight: 2",
      "terrain": [
        "ocean",
        "land"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "ar",
      "id": 5,
      "count": 1,
      "name": "tupuxuara leonardii",
      "img": "",
      "level": 3,
      "points": 5,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs all had the same basic body plan, but species varied dramatically.",
      "flight": 0,
      "description": "aeger elegans is a species of shrimp found in the solnhofen limestone of germany.",
      "rules": "n/a",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "common",
      "id": 6,
      "count": 2,
      "name": "aeger elegans",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "the earliest pterosaurs were relatively small and robust, with long tails, short necks and jaws lined with teeth.",
      "flight": 0,
      "description": "this extinct shrimp is named after the german paleontologist karl beurlen (1901-1985), who studied fossils in brazil.",
      "rules": "n/a",
      "terrain": [
        "fresh_water"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 7,
      "count": 1,
      "name": "beurlenia",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "in the jurassic period a new group of pterosaurs emerged. they had shorter tails, longer hands and neck bones, and bony crests on top of their heads.",
      "flight": 0,
      "description": "these coniferous trees lived all over the globe during the jurassic and cretaceous periods.",
      "rules": "n/a",
      "terrain": [
        "land"
      ],
      "periods": [
        "jurassic",
        "cretaceous"
      ],
      "freq": "common",
      "id": 8,
      "count": 2,
      "name": "brachyphyllum",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs began life on the ground, hatching from eggs.",
      "flight": 0,
      "description": "the organs of clams are surrounded by watery blood that contains nutrients and oxygen.",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 9,
      "count": 2,
      "name": "clam",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "when pterosaurs walked, they tucked in their wings. the fourth finger was connected to the hand by a roller joint, so the wings could fold like umbrella spokes.",
      "flight": 0,
      "description": "the fan-shaped leaves of this ancient ginkgo tree, now extinct, are similar to modern ginkgo leaves.",
      "rules": "n/a",
      "terrain": [
        "land"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 10,
      "count": 1,
      "name": "ginkgo",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "baby pterosaurs were very independent. with long wings and toothy jaws, they could probably live on their own right after hatching, even able to find their own food.",
      "flight": 0,
      "description": "gnetales are an evolutionary step between cone-bearing conifers and modern flowering plants, displaying both cones and flowers.",
      "rules": "n/a",
      "terrain": [
        "land"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 11,
      "count": 1,
      "name": "gnetales",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs may have traveled in flocks or gathered at the same spots to feed.",
      "flight": 0,
      "description": "water lily fossils have been found from as early as the cretaceous period.",
      "rules": "n/a",
      "terrain": [
        "fresh_water"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 12,
      "count": 2,
      "name": "nymphaeales (water lily)",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "a wide variety of pterosaurs lived during the cretaceous period, including the largest known pterosaurs.",
      "flight": 0,
      "description": "the name \u201cpaleomattae\u201d means \"ancient delicacy\u201d and is derived from the latin word deliciosa which means delicious.",
      "rules": "n/a",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 13,
      "count": 1,
      "name": "paleomattea",
      "img": "",
      "level": 1,
      "points": 1,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs are close cousins of dinosaurs, but evolved on a separate branch of the reptile family tree.",
      "flight": 0,
      "description": "despite their large shells that could grow up to seven feet across, these predatory, squid-like shellfish were capable of swimming.",
      "rules": "n/a",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "common",
      "id": 14,
      "count": 2,
      "name": "ammonite",
      "img": "",
      "level": 2,
      "points": 3,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "when scientists find a small pterosaur they try to determine whether it was a juvenile or an adult member of a small species of pterosaur.",
      "flight": 0,
      "description": "cockroaches existed before pterosaurs and dinosaurs. the first fossils of modern cockroaches appeared in the early cretaceous period.",
      "rules": "n/a",
      "terrain": [
        "land"
      ],
      "periods": [
        "jurassic",
        "cretaceous"
      ],
      "freq": "common",
      "id": 15,
      "count": 2,
      "name": "cockroaches",
      "img": "",
      "level": 2,
      "points": 2,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs were neither birds nor bats. they were flying reptiles that lived between ~220 and ~66 million years ago.",
      "flight": 1,
      "description": "dragonflies are among the fastest and most ancient flying insects in the world!",
      "rules": "flight: 1",
      "terrain": [
        "fresh_water",
        "land"
      ],
      "periods": [
        "jurassic",
        "cretaceous"
      ],
      "freq": "common",
      "id": 16,
      "count": 2,
      "name": "dragonfly",
      "img": "",
      "level": 2,
      "points": 2,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs left no descendants\u2014only fossils.",
      "flight": 0,
      "description": "the water strider\u2019s long and slender legs with several thousand hairs enable them to walk on water.",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "common",
      "id": 17,
      "count": 1,
      "name": "water strider",
      "img": "",
      "level": 2,
      "points": 3,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "in 1809, french zoologist georges cuvier was the first to identify a pterosaur. cuvier called it a flying reptile, and he named it ptero-dactyle, meaning \u201cwing finger.\u201d",
      "flight": 0,
      "description": "waterscorpions are insects,  but are not closely related to true scorpions.",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water",
        "land"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "common",
      "id": 18,
      "count": 1,
      "name": "waterscorpion",
      "img": "",
      "level": 2,
      "points": 3,
      "extinct": false,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "n/a",
      "rules": "play this card on another player's turn when they use an event card against you. effect: stop the effect of their event card and discard this card.",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "common",
      "id": 19,
      "count": 2,
      "name": "i don't think so",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "in morocco, scientists found the tracks of a theropod (a type of carnivorous dinosaur) among those of pterosaurs. did dinosaurs pose a threat to pterosaurs? evidence is scarce, but some fossils suggest they did.",
      "rules": "play on one pterosaur to remove it from the game and leave this card in its place.",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "common",
      "id": 20,
      "count": 2,
      "name": "theropod attack",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "n/a",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water",
        "land"
      ],
      "periods": [
        "jurassic",
        "cretaceous"
      ],
      "freq": "n/a",
      "id": 21,
      "count": 2,
      "name": "home",
      "img": "",
      "level": null,
      "points": 2,
      "extinct": false,
      "type": "home"
    },
    {
      "tidbit": "pterosaurs were the first vertebrates (animals with backbones) to have powered flight.",
      "flight": 0,
      "description": "aspidorhynchus was a speedy, two-foot-long fish, with tooth-lined, elongated jaws.",
      "rules": "n/a",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic",
        "cretacious"
      ],
      "freq": "rare",
      "id": 22,
      "count": 1,
      "name": "aspidorhynchus",
      "img": "",
      "level": 2,
      "points": 2,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "no one knows exactly what pterosaurs looked like. the pterosaur colors and patterns on these cards are inferred from animals living today that had similar lifestyles.",
      "flight": 0,
      "description": "the long spine attached to the dorsal fin of the ischyodus may have been venomous.",
      "rules": "n/a",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "rare",
      "id": 23,
      "count": 1,
      "name": "ischyodus",
      "img": "",
      "level": 2,
      "points": 2,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "pterosaurs were the first animals after insects to evolve powered flight\u2014not just leaping or gliding, but flapping their wings to generate lift and traveling long distances through the air.",
      "flight": 0,
      "description": "fossils of these small freshwater fish have been found in large groups, suggesting they congregated in sandbars.",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water"
      ],
      "periods": [
        "jurassic",
        "cretaceous"
      ],
      "freq": "rare",
      "id": 24,
      "count": 1,
      "name": "lycoptera",
      "img": "",
      "level": 2,
      "points": 2,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "more than 150 species of pterosaurs have been discovered in excavations around the globe.",
      "flight": 0,
      "description": "obaichthys is a primitive garfish, whose fossils have been found in brazil.",
      "rules": "n/a",
      "terrain": [
        "ocean",
        "fresh_water"
      ],
      "periods": [
        "cretacious"
      ],
      "freq": "rare",
      "id": 25,
      "count": 1,
      "name": "obaichthys",
      "img": "",
      "level": 2,
      "points": 3,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 2,
      "description": "anhanguera means \"old devil.\" the bumps on the tip of its bill may have helped it stabilize its head when snatching fish as they leapt out of the water!",
      "rules": "flight: 2",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "rare",
      "id": 26,
      "count": 1,
      "name": "anhanguera blittersdorffi",
      "img": "",
      "level": 3,
      "points": 5,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 2,
      "description": "dsungaripterus was first found in china in the junggar basin. its jaw was not designed to catch and eat fish, but rather to dig up clams along the beach and crush them with its large flat teeth.",
      "rules": "flight: 2",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "rare",
      "id": 27,
      "count": 1,
      "name": "dsungaripterus weii",
      "img": "",
      "level": 3,
      "points": 5,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "nyctosaurus means \"night lizard.\" it has been found in the niobrara formation of the mid-western united states. nyctosaurus possessed an extraordinarily large antler-like crest, which is surprising given how small the pterosaur was.",
      "rules": "flight: 1",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "rare",
      "id": 28,
      "count": 1,
      "name": "nyctosaurus gracilis",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "these were the first pterosaurs ever to be identified, found in 1784 by the german scientist cosimo alessandro collini for the wonder cabinet he curated.",
      "rules": "flight: 1",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "rare",
      "id": 29,
      "count": 1,
      "name": "pterodactylus antiquus",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "rhamphorhynchus means \"beak snout.\" this pterosaur has been found in germany. it had a very long tail, and its long, needle-like teeth helped it catch fish over open water.",
      "rules": "flight: 1",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "jurassic"
      ],
      "freq": "rare",
      "id": 30,
      "count": 1,
      "name": "rhamphorhynchus muensteri",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "scaphognathus means \"fat snout\" in latin. it has been found in germany and had a good sense of sight.",
      "rules": "flight: 1",
      "terrain": [
        "ocean"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "rare",
      "id": 31,
      "count": 1,
      "name": "scaphognathus",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 1,
      "description": "tapejara means \"old being\" and has been found in northeast brazil. the tip of its lower jaw is turned downward. it may have been a fruit eater, or skimmed the surface of the ocean for fish.",
      "rules": "flight: 1",
      "terrain": [
        "ocean",
        "land"
      ],
      "periods": [
        "cretaceous"
      ],
      "freq": "rare",
      "id": 32,
      "count": 1,
      "name": "tapejara wellnhoferi",
      "img": "",
      "level": 3,
      "points": 4,
      "extinct": true,
      "type": "species"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "the climate has shifted.",
      "rules": "play on any level 1 or 2 card. effect: leave this event card on the table and permanently change the terrain of the card underneath to land, sea or ocean. (remove at end of game so opponent can collect the points underneath.)",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "rare",
      "id": 33,
      "count": 1,
      "name": "climate change",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "pterosaurs aren't immune to this fact of life: death!",
      "rules": "play on any pterosaur card and leave it there. effect: the pterosaur group lives on but has been reduced in number, with a point value reduced by 2.  insects can now feed off dead pterosaurs (they love decaying meat.)",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "rare",
      "id": 34,
      "count": 1,
      "name": "dead pterosaur",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "a meteorite has crashed, disrupting the entire ecosystem! play on any level 1 or 2 card.",
      "rules": "play on any level 1 or 2 card. effect: destroy the selected card and each card lower than it on its food chain. discard this card.",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "rare",
      "id": 35,
      "count": 1,
      "name": "meteorite crash",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "the season has changed. time to move!",
      "rules": "play on any level 3. effect: turn any level 3 card around and take control of it. then discard this card.",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "rare",
      "id": 36,
      "count": 1,
      "name": "migration",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    },
    {
      "tidbit": "n/a",
      "flight": 0,
      "description": "a volcano has erupted, wiping out larger reptiles in this land or water area.",
      "rules": "play on any level 1 or 2 card. effect: destroy the selected card, discard this one, and freeze movement for all adjacent cards for one round (only horizontal and vertical).",
      "terrain": [
        
      ],
      "periods": [
        
      ],
      "freq": "rare",
      "id": 37,
      "count": 1,
      "name": "volcano",
      "img": "",
      "level": null,
      "points": null,
      "extinct": false,
      "type": "event"
    }
  ]
};

 var GameTemplate = function() {

     this.board = []; //10x10,
     this.players = {
         player1: {
             hand: [],
         },
         player2: {
             hand: [],
         }
     };
     this.deck = [];
     this.discard = [];
 };

//console.log(new GameTemplate());

 var DinoGame = {
           app: {
             startGame:function() {
               //create new game
                DinoGame.model.game=new GameTemplate();
                console.log(DinoGame);

                //create deck of random cards (40)
                for(var i=0;i<38;i++)
                {
                    DinoGame.model.game.deck.push(DinoGame.app.getCardFromDeck());
                }               
                //deal  player  hand
                for(var i=0;i<6;i++)
                {
                  DinoGame.model.game.players.player1.hand.push(DinoGame.model.game.deck.pop());
                }
                DinoGame.model.game.board=[
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]];
                //sync with other player hand
                  
                //pick who's turn it is (random)
                
             },
              getCardFromDeck:function() {
                return  DinoGame.model.cards.pop();  
              }
           },
           model:{
             cards: CARD_DATA.cards, //load all cards
             game:{}
           },
           dom:{}
         };

  
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


//DinoGame.app.startGame();
