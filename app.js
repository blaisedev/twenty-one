
var scores, cardValue, activePlayer, gamePlaying, isHold;

init();

document.querySelector('.next-card').addEventListener('click', function() {
if(gamePlaying){
        var card = Math.floor(Math.random() * 52) + 1;
        console.log(card);
        document.getElementById('card').style.display = 'block';
        document.getElementById('card').src = 'cards/' + card + '.png';

        var score = getCardValue(card);
        scores[activePlayer] += score;

        var html = '<img src="cards/%card%.png" alt="Card" class="new-cards">';
        var newHtml = html.replace('%card%', card);
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#player-' + activePlayer).insertAdjacentHTML('beforeend', newHtml);

        //Check if bust or won
        if(scores[activePlayer] > 21) {
             document.querySelector('#name-' + activePlayer).textContent = 'Bust!';
             console.log("active player  " + activePlayer);
             activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
             console.log("active player  " + activePlayer);
             document.querySelector('.player-' + activePlayer  + '-panel').classList.add('winner');
             document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
             gamePlaying = false;

        } else if (scores[activePlayer] === 21) {
             document.querySelector('.player-' + activePlayer  + '-panel').classList.add('winner');
             document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
             gamePlaying = false;
        }

        // Check if previus player is holding
        if(!isHold){
            nextPlayer();
        }
        }

});


function aceSelection() {
   var selection = parseInt(prompt("Please enter 11 or 1 as your ace value!"));
   if(selection === 1 || selection === 11) {
         return selection;
   }
   aceSelection();
}


function nextPlayer() {
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

    }


document.querySelector('.btn-new').addEventListener('click', init);


     function init() {
         console.log('Application initializing!')
         scores = [0,0];
         activePlayer = 0;
         roundScore = 0;
         gamePlaying = true;
         isHold = false;

         document.querySelector('.card').style.display = 'none';

         document.getElementById('score-0').textContent = 0;
         document.getElementById('score-1').textContent = 0;

         document.getElementById('name-0').textContent = 'Player 1';
         document.getElementById('name-1').textContent = 'Player 2';
         document.querySelector('.player-0-panel').classList.remove('winner');
         document.querySelector('.player-1-panel').classList.remove('winner');
         document.querySelector('.player-0-panel').classList.remove('bust');
         document.querySelector('.player-1-panel').classList.remove('bust');
         document.querySelector('.player-0-panel').classList.remove('active');
         document.querySelector('.player-1-panel').classList.remove('active');
         document.querySelector('.player-0-panel').classList.add('active');


         const removeElements = (elms) => elms.forEach(el => el.remove());
         // Use like:
         removeElements( document.querySelectorAll(".new-cards") );



         for(i = 1; i <= 4; i++){
            var card = Math.floor(Math.random() * 48) + 1;
            document.getElementById('card-' + i).src = 'cards/' + card + '.png';
            if (i <= 2) {
                scores[0] +=  getCardValue(card);
            } else {
                scores[1] +=  getCardValue(card);
            }

         }

        document.querySelector('#score-0').textContent = scores[0];
        document.querySelector('#score-1').textContent = scores[1];

     }


     function getCardValue(card){
         switch(true) {
                     case (card <= 4):
                         console.log("Inside 1-4")
                         return 2;
                     case (card >= 5 && card <= 8):
                         console.log("Inside 5-8")
                         return 3;
                     case (card >= 9 && card <= 12):
                         console.log("Inside 9-12")
                         return 4;
                     case (card >= 13 && card <= 16):
                         console.log("Inside 13-16")
                         return 5;
                     case (card >= 17 && card <=  20):
                         console.log("Inside 17-20")
                         return 6;
                     case (card >= 21 && card <= 24):
                         console.log("Inside 21-24")
                         return 7;
                     case (card >= 25 && card <= 28):
                         console.log("Inside 25-28")
                         return 8;
                     case (card >= 29 && card <= 32):
                         console.log("Inside 29-32")
                         return 9;
                     case (card >= 33 && card <=  48):
                         console.log("Inside 33-48");
                         return 10;
                     default:
                          return aceSelection();
                          console.log("will be ace selection!!!")
                 }
     }

 document.querySelector('.btn-hold').addEventListener('click', function() {
     if(gamePlaying) {
         // Check if the player won the game.
         isHold = true;
         if(scores[activePlayer] >= 21) {
             document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
             document.querySelector('.card').style.display = 'none';
             document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
             document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
             gamePlaying = false;
         } else{
            //Next player
            nextPlayer();
         }
     }

    });