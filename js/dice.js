"use strict";

const dieMin = 1, dieMax = 6;

function getRandomInt (minInt, maxInt) {
	return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

const diceRoller = {
	dice: [1],
	numLuckyRolls: 0,
	
	get sum () {
		let sum = 0;
		this.dice.forEach(function add (die) {
			sum += die;
		});
		return sum;
	},
	
	get isLuckyRoll () {
		/* A roll is lucky if:
		1. Rolling a 6 if rolling a single die.
		2. Rolling all the same number if rolling more than one dice. */
		if (this.dice.length <= 0) {
			return false;
		}
		
		else if (this.dice.length === 1) {
			return this.dice[0] === 6;
		}
		
		else {
			let isLucky = true;
			for (let i = 0; i < this.dice.length; ++i) {
				if (this.dice[i] != this.dice[0]) {
					isLucky = false;
					break;
				}
			}
			return isLucky;
		}
	},
	
	updateNumLuckyRolls: function (isLucky) {
		if (isLucky) {
			++this.numLuckyRolls;
		}
		else {
			this.numLuckyRolls = 0;
		}
		return;
	},
	
	rollDice: function () {
		for (let i = 0; i < this.dice.length; ++i) {
			this.dice[i] = getRandomInt(dieMin, dieMax);
		}
		this.updateNumLuckyRolls(this.isLuckyRoll);
		return;
	},
	
	addDie: function () {
		this.dice.push(1);
		this.updateNumLuckyRolls(false);
		return;
	},
	
	removeLastDie: function () {
		this.dice.pop();
		this.updateNumLuckyRolls(false);
		return;
	},
	
};

const diceDOMManager = {
	diceHolder: document.getElementById("dice-holder"),
	dice: document.getElementsByClassName("die"),
	sum: document.getElementById("sum"),
	luckyRolls: document.getElementById("lucky-rolls"),
	addButton: document.getElementById("add"),
	removeButton: document.getElementById("remove"),
	
	hideOriginalDisplay: function () {
		for (let i = 0; i < this.dice.length; ++i) {
			this.dice[i].innerHTML = "&nbsp;";		
		}
		this.sum.className = "hidden";
		this.luckyRolls.className = "hidden";
		return;
	},
	
	updateDisplay: function () {
		if (this.dice.length != diceRoller.dice.length) { // this part is used to prevent accessing indices out of bound
			return;
		}
		
		for (let i = 0; i < this.dice.length; ++i) {
			this.dice[i].innerHTML = diceRoller.dice[i];		
		}
		this.sum.innerHTML = diceRoller.sum;
		this.luckyRolls.innerHTML = diceRoller.numLuckyRolls;
		
		/* Check if it is lucky roll, and change color accordingly */
		if (diceRoller.numLuckyRolls > 0) { // if it is a lucky roll
			this.sum.className = "lucky";
			this.luckyRolls.className = "lucky";
		}
		else { // if it is not a lucky roll
			this.sum.removeAttribute("class");
			this.luckyRolls.removeAttribute("class");
		}
		
		return;
	},
	
	setButtonStatus: function () {
		/* Allowed: 1-6 dice */
		
		if (this.dice.length >= 6) {
			this.addButton.disabled = true;
		}
		else {
			this.addButton.disabled = false;
		}
		
		if (this.dice.length <= 1) {
			this.removeButton.disabled = true;
		}
		else {
			this.removeButton.disabled = false;
		}
		
		
		return;
	},
	
	rollDice: function () {
		this.hideOriginalDisplay();
		diceRoller.rollDice();
		setTimeout(this.updateDisplay.bind(this), 150);
		return;
	},
	
	addDie: function () {
		diceRoller.addDie();
		
		/* Create new die HTML element */
		let newDie = document.createElement("div");
		newDie.setAttribute("class", "die");
		newDie.innerHTML = "1";
		this.diceHolder.appendChild(newDie);
		
		this.setButtonStatus();
		this.updateDisplay();
		
		return;
	},
	
	removeLastDie: function () {
		diceRoller.removeLastDie();
		
		/* Locate the last die on the page */
		let lastDie = this.dice[this.dice.length - 1];
		this.diceHolder.removeChild(lastDie);
		
		this.setButtonStatus();
		this.updateDisplay();
				
		return;
	},

};
