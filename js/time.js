"use strict";
const time = document.getElementById("time");

function getCurrentTime () {
	
	let today = new Date();
	let hh = checkNum(today.getHours());
	let mm = checkNum(today.getMinutes());
	let ss = checkNum(today.getSeconds());
	
	time.innerHTML = hh + ":" + mm + ":" + ss;
	
	let t = setTimeout(getCurrentTime, 100); 
	
	return;
}

function checkNum (num) {
	if (num < 10) {
		return "0" + num;
	}
	else {
		return num.toString();
	}
}