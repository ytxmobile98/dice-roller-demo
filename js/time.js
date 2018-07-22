"use strict";
var time = document.getElementById("time");

function getCurrentTime () {
	
	var today = new Date();
	var hh = checkNum(today.getHours());
	var mm = checkNum(today.getMinutes());
	var ss = checkNum(today.getSeconds());
	
	time.innerHTML = hh + ":" + mm + ":" + ss;
	
	var t = setTimeout(getCurrentTime, 100); 
	
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