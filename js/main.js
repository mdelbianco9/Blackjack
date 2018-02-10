
var cards = [];
var playerCard = [];
var dealerCard = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var dealerHolder = document.getElementById('dealer');
var playerHolder = document.getElementById('player');
var cardCount = 0;

// Build out deck of cards by looping through arrays and assigning cards
for (s in suits) {
	// This variable targets the first letter of each word in the suits array. rember arrays are objects.
	var suit = suits[s][0].toUpperCase();
	// If suit is spade or club apply background color black, if not apply red
	var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
	for (n in numb) {
		
		// if card value is greater that index 9 in numb then its value is 10
		var cardValue = (n>9) ? 10 : parseInt(n)+1

		/* buildout a card object. This creates an object for 
		each card. Each of these objects is placed into the card array
		*/
		var card = {
			suit:suit,
			icon:suits[s],
			bgcolor:bgcolor,
			cardnum:numb[n],
			cardvalue:cardValue
		}
		cards.push(card);
	}
}

console.log(cards);

// function Start() {
// // created a random number generator
// var randomNum = Math.floor(Math.random()*52);
// This add each card to the div, USE += more. This outputs each card 
// as its own span element. You literally build out an inline styled element here.
// output.innerHTML += "<span style='color:" + cards[randomNum].bgcolor +"'>&" + cards[randomNum].icon + ";" + cards[randomNum].cardnum +  "</span> ";
// }
// Start();

function Start() {
	shuffleDeck(cards);
	dealNew();
	// outputCard();
}

function dealNew() {
	playerCard =[];
	playerCard =[];
	dealerHolder.innerHTML = "";
	playerHolder.innerHTML = "";

	for(x=0; x < 2; x++) {
		/* This adds an object from the cards Array to 
		the dealerCard array. CardCount adds and index alue of 2 everytime its 
		entered.*/
		dealerCard.push(cards[cardCount]);
		dealerHolder.innerHTML += cardOutput(cardCount, x);
		cardCount++
		playerCard.push(cards[cardCount]);
		playerHolder.innerHTML += cardOutput(cardCount, x);
		cardCount++

	}
	console.log(dealerCard);
	console.log(playerCard);
}

function cardOutput(n, x) {
	var hpos = (x>0) ? x * 60+100 : 100;
	return  '<div class="icard '+cards[n].icon+'" style="left:' + hpos + 'px;"><div class="top-card suit"> '+cards[n].cardnum+'<br></div><div class="content-card suit"></div><div class="bottom-card suit">'+cards[n].cardnum+'<br></div></div>';
}

// Loops through an array backwards. 
/* J is our random index. Our cards array is reassigned to have
an index value of J.  */
function shuffleDeck(array) {
	for(var i = array.length -1; i > 0; i--){
	var j = Math.floor(Math.random() * (i+1));
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
	}
	// console.log(temp);
	return array;
}

// function outputCard() {
// 	output.innerHTML += "<span style='color:" + cards[0].bgcolor +"'>&" + cards[0].icon + ";" + cards[0].cardnum +  "</span> ";
// }

