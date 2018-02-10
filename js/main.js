// This is an array of objects. Each object holds a card value. example: Ace of spades, king of hearts.
var cards = [];
// This is an array that holds the values of the cards the player is dealt.
var playerCard = [];
// This is an array that holds the values of the cards the dealer is dealt.
var dealerCard = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var message = document.getElementById('message');
var output = document.getElementById('output');
var playerHolder = document.getElementById('player');
var dealerHolder = document.getElementById('dealer');
var playerHolder = document.getElementById('player');
var cardCount = 0;
var mydollars = 100;
var endplay = false;
var pValue = document.getElementById('pValue');
var dValue = document.getElementById('dValue');

/*Build out deck of cards by looping through arrays and assigning cards
This for loops essentially builds out deck of cards by creating and object for each card value then 
pushes that object into the cards array*/

/* The inside for loop creates an object with the numb array which is then looped by the
outside for loop to assign each object a suit*/
for (s in suits) {
	// This variable targets the first letter of each word in the suits array. rember arrays are objects.
	var suit = suits[s][0].toUpperCase();
	// If suit is spade or club apply background color black, if not apply red
	var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
	for (n in numb) {
		// if card value is greater than index 9 in numb then its value is 10
		var cardValue = (n>9) ? 10 : parseInt(n)+1
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



function Start() {
	// Goes to the top of the DOM and LITERALLY changes the value of the cards array.
	shuffleDeck(cards);
	// Uses the newly shuffled cards array and assigns index values to distribute the cards.
	dealNew();
	// outputCard();
	document.getElementById('start').style.display = "none";
	document.getElementById('dollars').innerHTML = mydollars;
}
/* This function assigns cards to each player by */
function dealNew() {
	playerCard =[];
	playerCard =[];
	dealerHolder.innerHTML = "";
	playerHolder.innerHTML = "";

	var betvalue = document.getElementById('mybet').value;
	mydollars=mydollars-betvalue;
	// This makes an adjustment to the HTMl
	document.getElementById('dollars').innerHTML = mydollars;
	document.getElementById('myactions').style.display = "block";
	message.innerHTML = "Get up to 21 and bet the dealer to win. <br> Current bet is $" + betvalue;
	document.getElementById('mybet').disabled = true;
	document.getElementById('maxbet').disabled = true;
	deal();

	console.log(dealerCard);
	console.log(playerCard);
}

function deal() {
	console.log(cards);
	// card count reshuffle
	for(x=0; x < 2; x++) {
		/* This adds an object from the cards Array to 
		the dealerCard array. CardCount adds and index alue of 2 everytime its 
		entered.*/
		dealerCard.push(cards[cardCount]);
		dealerHolder.innerHTML += cardOutput(cardCount, x);
		// The if statment is responsible for hiding the dealers card.
		if(x===0) {
			dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
		}
		cardCount++
		playerCard.push(cards[cardCount]);
		playerHolder.innerHTML += cardOutput(cardCount, x);
		cardCount++

	}
}

function cardOutput(n, x) {
	var hpos = (x>0) ? x * 60+100 : 100;
	return  '<div class="icard '+cards[n].icon+'" style="left:' + hpos + 'px;"><div class="top-card suit"> '+cards[n].cardnum+'<br></div><div class="content-card suit"></div><div class="bottom-card suit">'+cards[n].cardnum+'<br></div></div>';
}

/* This looks at which Button is clicked (hit, hold or double) then
based on the value of the onclick the certian case will be seleted. */
function cardAction(a) {
	console.log(a);
	switch (a) {
		case 'hit': 
			playucard(); //add new card to players hand
			break;
		case 'hold':
			playend(); //playout and calculate
			break;
		case 'double':
			// double current bet remove value from mydollars
			playucard(); //add new cart to players hand
			playend(); //playout and calculate
			break;
			default:
			console.log('done');
			playend(); 

	}
}

	function playucard() {
		playerCard.push(cards[cardCount]);
		playerHolder.innerHTML += cardOutput(cardCount, 
		(playerCard.length -1));
		cardCount++;

		var rValue = checktotal(playerCard);
		pValue.innerHTML = rValue;
		if(rValue>21) {
			message.innerHTML = "busted!";
			playend();
		}
	}

	function playend() {
		endplay = true;
		document.getElementById('cover').style.display = "none";
		document.getElementById('myactions').style.display = "none";
		document.getElementById('btndeal').style.display = "block";
		document.getElementById('mybet').disabled = false;
		document.getElementById('maxbet').disabled = false;
		message.innerHTML = "Game Over";

		var dealervalue = checktotal(dealerCard);
		dValue.innerHTML = dealervalue;

		while(dealervalue<17){
		dealerCard.push(cards[cardCount]);
		dealerHolder.innerHTML += cardOutput(cardCount, 
		(dealerCard.length -1));
		cardCount++;
		dealervalue = checktotal(dealerCard);
		dValue.innerHTML = dealervalue;
		}

	}

	function checktotal(arr){
		var rValue = 0;
		var aceAdjust = false;
		for(var i in arr) {
			if(arr[i].cardnum == 'A'&& !aceAdjust) {
				aceAdjust=true;
				rValue=rValue+10;
			}
			rValue=rValue+arr[i].cardvalue;
		}
		if(aceAdjust && rValue > 21) {
			rValue=rValue-10;
		}
		return rValue;
	}


/* The shuffleDeck function assigns a random number (j) to be the new index
of the cards array. This for loop creates a randomly organized deck of cards. */
function shuffleDeck(array) {
	for(var i = array.length -1; i > 0; i--){
	var j = Math.floor(Math.random() * (i+1));
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
	}
	console.log(array);
	return array;
}


// function outputCard() {
// 	output.innerHTML += "<span style='color:" + cards[0].bgcolor +"'>&" + cards[0].icon + ";" + cards[0].cardnum +  "</span> ";
// }

