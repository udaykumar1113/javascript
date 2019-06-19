/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;
scores=[0,0];
roundScore=0;
activePlayer=0;

document.querySelector('.dice').style.display='none';//hiding the default image

//updating the score values to 0
document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;
document.getElementById('current-0').textContent=0;
document.getElementById('current-1').textContent=0;

//event listener
document.querySelector('.btn-roll').addEventListener('click',function(){
    
    //1.calculating random number for dice
    var dice=Math.floor(Math.random()*6+1);
    
    //2.getting dice document and displaying the dice image of the number
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';//this will display the hidden image
    diceDOM.src='dice-'+dice+'.png';//this will update the src tag of the dice image
    
    //3.update the score to 0 if rolled number is 1
    if(dice!==1){
        roundScore+=dice;
        document.getElementById('current-'+activePlayer).textContent=roundScore;
    }
    else{
        roundScore=0;
        //next player
        activePlayer==0?activePlayer=1:activePlayer=0;
        document.getElementById('current-0').textContent=0;
        document.getElementById('current-1').textContent=0;
        document.querySelector('.dice').style.display='none';
        
        //toggling which player is active, if one class is active, 
        //the active class is removed and if class is not active it willadd active
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //we cam also ass aclass or remove class as below
        //document.querySelector('.player-0-panel').classList.add('active');
        //document.querySelector('.player-0-panel').classList.remove('active');
    }
    
});
