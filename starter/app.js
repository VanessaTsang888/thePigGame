/*
The Pig Game:
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* FIRST DOM ACCESS AND MANIPULATION */

// BAIC VARIABLES: Create a few variables to track things happening in our game, i.e. the score for each player.
// Use an Array to track the score for each player.
// This only needs to be 1 value as we only need 1 round score at a time.
// scores = [0, 0]; To read and store values.
// These are the variables for the scores:
// A variable to tell me which is the active player, to keep track on the current player that is playing: active player.
// 0 will be the first player and 1 will be the second player.

// I can use these variables that I've defined in other scopes and functions:
var scores, roundScore, activePlayer, gamePlaying;

init();

// scores = [0, 0]; 
// roundScore = 0;
// activePlayer = 0;

// THE DICE:
// In order to create the dice, we need to calculate a random number.
// The 'floor' method used with the 'random' method is used to create integer numbers.

// console.log(dice);

// Do some DOM manipulation: using the .querySelector method to manipulate/change values and elements of our webpage.
// The object that will give us access to the DOM is the Document Object.
// How this querySelector works: to use as it lets us select stuff, like in CSS but it only selects the first element that it finds.
// We want to select the the current score and print out the value of our dice right there, so we dont need to open the console to see our value.
// The score on the left starts with 43, so we use the id="current-0" (the round score). So we select that element using the hash symbol:
// To change the text, we use the text content method. We say this should be the dice above in the: console.log(dice);
// Using the 'current' variable to build a string. It will contain the number which is the value of activePlayer.
// To test, we can set the 'activePlayer' variable from 0 to 1. This chances the current score of second player. We've just changed the content of an HTML element here.
// To change the content of a selection, there are 2 ways, we can use the 'textContent'. But if we want to put some HTML also in the selected element, then we use the inner HTML method instead of the text content.

// document.querySelector('#current-' + activePlayer).textContent = dice;

// The <em> is the emphasis tag in HTML. We use this to make the current dice value italic rather than just regular font style.
// This is kown as the Setter.
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// We can also use the .querySelector method to only read elements from a webpage and then store them in some variable for example.
// This time we don't set it to anything as we are just to read the value or the content of the element with this id 'score 0' and store into variable x. 
// The Result: the 43 in the console is the value we read from the round score / Player 1, stored in our x variable and then printed to the console.
// This is know as the Getter (we get a value):
// var x = document.querySelector('#score-0').textContent;
// console.log(x);



/*  SET UP AN EVENT HANDLER  */

// Select the element in which the event will happen. In this case it will be the button, where we will roll the dice.
// Then add the Event Listener. Then the event type, which in our case is: click.
// The second part is the function that will be called when the event happens. Image we have a function that we want to call when we click on the button.

// As soon as the function is called, This callback function: btn is not called by us but by another function (as an argument) the Event Listener will call it for us.
// document.querySelector('.btn-roll').addEventListener('click', btn);

// Event Listener method:
// An anonymous function is a function that doesn't have a name, so it cant be reused.

document.querySelector('.btn-roll').addEventListener('click', function() {
    // If the game is playing then we do something:
    if(gamePlaying) {
            // 1. Random number. This function is the only one that has access to the dice variable, we have access to the other scopes - the scores, the roundScore and activePlayer variables.
        var dice = Math.floor(Math.random() * 6) + 1; // 0-6, floor = 0-5 + 1 = 6.

    // 2. Display the result (the corrisponding dice number).
    // Set Display property to: block. Then set the correct number using the image files, i.e. dice-1.png Create a variable where I store the selection, and then, use this variable whenever I need it.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; // variable dice number 1-6.

    // 3. Update the round score IF the rolled number was NOT a 1. Is dice different to 1? True or False?
    // IF you roll a 1, then its the next players turn:
        if (dice !== 1) { // dice should be different from 1. This don't do type coercion.
        // Add Score. Add dice result to our round score.
        roundScore += dice; // Same as: roundScore = roundScore + dice.
        // Display the new value of 'dice' on webpage:
        // If the activePlayer is 0, the current 0 element will get the textContent. The content that we want is the roundScore.
        // Each time player rolls the dice, the above roundScore and the below roundScore gets updated and this happens in below element with this class:'#current-'
        // 
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // Here the active player is 0, the roundScore is in red box.

        } else {
        // Next Player. Ternary operator.
        nextPlayer();
        }
    }

});

    /* IMPLEMENTING OUR 'HOLD' FUNCTION AND THE DRY (dont repeat yourself) PRINCIPLE */    

        // Hold points so that they get added up in the Global Score: set-up an Event Listener:
        // The '.btn-hold' id is from the .html file. We want it to happen on the click, going to use an anonymous function with no parameters (a function which doesn't have a name and can't reuse in another point of our code).
        // Within the body, We define what we want to happen when the user clicks the hold button.
        // First add the current score to the player's global score. Then update the UI. Then check if the player won the game.

        document.querySelector('.btn-hold').addEventListener('click', function() {
            if(gamePlaying) {
                // Add Current score to Global Score: access or mutate the scores. Add the score the player got in this round to the score he already has.
            // The below is the same as this: scores[activePlayer] = scores[activePlayer] + roundScore; 
                scores[activePlayer] += roundScore;

            // Update the UI: using the id: score-0. Using our activePlayer variable to construct our string name. Here we have our activePlayer score selected
            // and the UI, now change the content using the textContent method: .textContent
            // Print the value that we defined before. So we go into our score array again, then select the points from the active player.
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Check if player won the game: the first player to reach 100 points on Global Score, wins the game.
            // Use if/else statement to check if the score of the activePlayer is more or equal to 100:
                if (scores[activePlayer] >= 20) {
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.querySelector('.dice').style.display = 'none';
                    // We know the winner class is not there, so we add it:
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    // We know the active class is there, so we remove it:
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    // Detect if the player has won a game: turn variable to false:
                    gamePlaying = false;
                } else {
                    // Call next player:
                    nextPlayer();
                }
            }
        });

        // Ternary operator: New function called: nextPlayer
        function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer  = 0;
        // As soon as player rolls a 1, his roundScore gets eet back to 0.
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
            // add the class, if the class is NOT there. If the class is already there, it removes it:
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        // When a player rolls a 1, then hide the dice. 
        document.querySelector('.dice').style.display = 'none';
        }
        // Add New Game button:
        // We have a button and an Event, then we need to listen for that event.
        // Passing the init function into the EventListener function:
        // When someone press this button, then call the init function:
        document.querySelector('.btn-new').addEventListener('click', init);
            // Set our scores back to 0:
            // scores = [0, 0];
            // Set the activePlayer back to 0, as that is the player who always starts.
            // activePlayer = 0;
            // If any score left from our last game, then we also need to set that back to 0:
            // roundScore = 0;

    function init() {
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        gamePlaying = true;

// We can also use the .querySelector to change the CSS of some element.
// We want to hide the dice (with radom number) at the beginning of the game. To do that in CSS we set the display property to: none.
// So we want to set the display property to: none.
// style is the method, display is the CSS property, none is the CSS value.
        document.querySelector('.dice').style.display = 'none';

/* EVENTS AND EVENT HANDLING: ROLLING THE DICE */

// Another method: document.getElementById. Only works for id's but its fater than .querySelector. Set to string of 0.
// Set all four values (scores) to 0.
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

    };





























