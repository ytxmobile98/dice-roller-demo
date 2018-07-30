"use strict";
const date = document.getElementById("date");
const time = document.getElementById("time");

function getCurrentTime () {
	
	let today = new Date();
	let YYYY = today.getFullYear();
	let MM = checkNum(today.getMonth() + 1);
	let DD = checkNum(today.getDate());
	let hh = checkNum(today.getHours());
	let mm = checkNum(today.getMinutes());
	let ss = checkNum(today.getSeconds());
	
	date.innerHTML = YYYY + "-" + MM + "-" + DD;
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