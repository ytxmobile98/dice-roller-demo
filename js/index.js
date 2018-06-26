"use strict";

var diceHolder = document.getElementById("dice-holder");
var dice = document.getElementsByClassName("die");
var sum = document.getElementById("sum");
var luckyRolls = document.getElementById("lucky-rolls");
var numLuckyRolls = 0;

const dieMin = 1, dieMax = 6;

function addDie () {
	if (dice.length >= 6) {
		setButtonStatus();
		updateSum();
		return;
	}
		
	var emptyTextNode = diceHolder.lastChild; 
	if (emptyTextNode.nodeType == 3) {
		diceHolder.removeChild(emptyTextNode);
	}
	
	var newDie = document.createElement("div");
	newDie.setAttribute("class", "die");
	newDie.innerHTML = "1";
	diceHolder.appendChild(newDie);
		
	setButtonStatus();
	updateSum();
	updateLuckyRolls(false);
	return;
}

function removeLastDie () {
	if (dice.length <= 1) {
		setButtonStatus();
		updateSum();
		return;
	}
	
	var lastDie = dice[dice.length - 1];
	document.getElementById("dice-holder").removeChild(lastDie);
	
	setButtonStatus();
	updateSum();
	updateLuckyRolls(false);
	return;
}

function setButtonStatus () {
	var addButton = document.getElementById("Add");
	var removeButton = document.getElementById("Remove");
	
	if (dice.length >= 6) {
		addButton.disabled = true;
	} else {
		addButton.disabled = false;
	}
	
	if (dice.length <= 1) {
		removeButton.disabled = true;
	} else {
		removeButton.disabled = false;
	}
}

function hideNumbers () {
	var i = 0;
	for (i = 0; i < dice.length; ++i) {
		dice[i].innerHTML = "&nbsp;";
	}
	sum.classList.add("hidden");
	luckyRolls.classList.add("hidden");
	
	return;
}

function rollDice () {
	var i = 0;
	for (i = 0; i < dice.length; ++i) {
		dice[i].innerHTML = getRandomInt(dieMin, dieMax);
	}
	updateSum();
}

function getRandomInt (minInt, maxInt) {
	return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

function updateSum () {
	var diceSum = 0, i = 0;
	for (i = 0; i < dice.length; ++i) {
		diceSum += Number(dice[i].innerHTML);
	}
	sum.innerHTML = diceSum;
	isLucky();
	return;
}

function isLucky () {
	var refVal = 0, i = 0;
	var curRollIsLucky = true;
	
	if (dice.length == 1) { // if rolling one die, 6 is the lucky roll
		refVal = 6;
		curRollIsLucky = (Number(sum.innerHTML) == refVal);
	}
	else {
		refVal = Number(document.getElementsByClassName("die")[0].innerHTML);
		for (i = 0; i < dice.length; ++i) {
			if (Number(document.getElementsByClassName("die")[i].innerHTML) != refVal) {
				curRollIsLucky = false;
				break;
			}
		}
	}
	
	updateLuckyRolls(curRollIsLucky);
	
	return;
}

function updateLuckyRolls (curRollIsLucky) {
	
	if (curRollIsLucky) {
		sum.setAttribute("class", "lucky");
		luckyRolls.setAttribute("class", "lucky");
		++numLuckyRolls;
	} else {
		sum.removeAttribute("class");
		luckyRolls.removeAttribute("class");
		numLuckyRolls = 0;
	}
	
	luckyRolls.innerHTML = numLuckyRolls;
}