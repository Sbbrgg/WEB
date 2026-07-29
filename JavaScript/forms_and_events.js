// JavaScript source code
function Factorial() {
	let numberElement = document.getElementById("number");
	let number = numberElement.value;
	let resultElement = document.getElementById("factorial-result");
	let f = BigInt(1);
	for (let i = 1n; i <= number; i++) {
		f *= i;
	}
	//resultElement.value = `${number}! = ${f}`;
	resultElement.innerHTML = `${number}! = ${f}`;
}

function setImage() {
	let filename = document.getElementById("image-file");
	let reader = new FileReader();
	reader.onload = function (e) {
		document.getElementById("image").src = e.target.result;
	}
	reader.readAsDataURL(filename.files[0]);
}
function setBackgroundColor(event) {
	document.body.style.backgroundColor = event.target.value;
	console.log(event.target.id);
	//document.body.style.backgroundColor = document.getElementById("background-color").value;
	/*let color = document.getElementById("background-color").value;
	document.body.style.backgroundColor = color;
	alert("setBackgroundColor");*/
}
function setForegroundColor() {
	document.body.style.color = document.getElementById("foreground-color").value;
}

let colors = document.getElementById("foreground-color");
colors.addEventListener("input", setColor);
function setColor(event) {

	document.body.style[(event.target.id === 'background-color' ? 'backgroundColor' : 'color')] = event.target.value;
	//event.target.id === 'background-color' ? document.body.style.backgroundColor : document.body.style.color = event.target.value;
	/*
	if (event.target.id === 'background-color')
		document.body.style.backgroundColor = event.target.value;
	else
		document.body.style.color = event.target.value;
	*/
	console.log(event.target.id);
	//alert("setColor");
}
document.addEventListener("mousemove", traceMouse);
function traceMouse(e) {
	document.getElementById("mouse").innerHTML =
		`X = ${e.clientX}, Y = ${e.clientY}`;
}

document.getElementById("switch-background").addEventListener("click", switchBackground);
function switchBackground(e) {
	document.body.style.backgroundColor = '';
	document.body.style.color = '';
	document.body.className = document.body.className === "dark" ? "light" : "dark";
	/*
	let skin = document.body.className;
	let switchButton = document.getElementById("switch-background");
	switchButton.src = skin === "dark" ? "moon.png" : "sun.png";
	document.body.className = skin === "dark" ? "light" : "dark";
	//document.getElementById("debug-background").innerHTML = switchButton.src;
	document.getElementById("debug-background").innerHTML = document.body.className;
	*/
}
document.getElementById("switch-background-delay").addEventListener("change", setDelay);
function setDelay(e) {
	let delay = e.target.value;
	//alert(`Delay" ${delay}`);
	document.getElementById('switch-background').style.transition =
		document.body.style.transition =
		`color ${delay}s, background-color ${delay}s, background-image ${delay}s`;
	console.table(document.body.style);
	console.table(document.getElementById('#switch-background').style);
}
/*
const skinButton = document.getElementById('switch-background');
skinButton.addEventListener('click', () =>
{
	if (skinButton)
	{
		document.body.style.backgroundColor = '';
		document.body.style.color = '';
	}
	document.body.className = document.body.className === "dark" ? "light" : "dark";
});
*/

/* ////////////////////////////////////////////////////////////////////// */
function addLeadingZero(number) {
	return number < 10 ? "0" + `${number}` : `${number}`;
}
function tickTimer() {
	let date = new Date();
	document.getElementById("raw-date").innerHTML = date.toString();

	document.getElementById("hours").innerHTML = addLeadingZero(date.getHours());
	document.getElementById("minutes").innerHTML = addLeadingZero(date.getMinutes());
	document.getElementById("seconds").innerHTML = addLeadingZero(date.getSeconds());

	document.getElementById("years").innerHTML = addLeadingZero(date.getFullYear());
	document.getElementById("months").innerHTML = addLeadingZero(date.getMonth() + 1);
	document.getElementById("days").innerHTML = addLeadingZero(date.getDate());

	document.getElementById("day-of-week").innerHTML = date.toLocaleDateString("en", { weekday: 'long' });

	document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? 'visible' : 'hidden';
	document.getElementById("day-of-week").style.visibility = document.getElementById("show-weekday").checked ? 'visible' : 'hidden';

	setTimeout(tickTimer, 100);
}
tickTimer();

document.getElementById('btn-start').addEventListener("click", startCountdownTimer);
function startCountdownTimer() {
	let targetDate = document.getElementById("target-date");
	let targetTime = document.getElementById("target-time");
	let btnStart = document.getElementById("btn-start");
	if (btnStart.value === "Start") {
		btnStart.value = "Stop";
		targetDate.disabled = targetTime.disabled = true;
	}
	else {
		btnStart.value = "Start";
		targetDate.disabled = targetTime.disabled = false;
	}
	tickCountdown();
}

function tickCountdown() {
	let now = new Date();

	let targetDateControl = document.getElementById("target-date");
	let targetTimeControl = document.getElementById("target-time");

	let targetDateValue = targetDateControl.valueAsDate;
	let targetTimeValue = targetTimeControl.valueAsDate;

	document.getElementById("timezone").innerHTML = now.getTimezoneOffset() / 60;
	//выравниваем часовой пояс
	targetDateValue.setHours(targetDateValue.getHours() + targetDateValue.getTimezoneOffset()/60)
	targetTimeValue.setHours(targetTimeValue.getHours() + targetTimeValue.getTimezoneOffset()/60)

	targetTimeValue.setFullYear(targetDateValue.getFullYear());
	targetTimeValue.setMonth(targetDateValue.getMonth());
	targetTimeValue.setDate(targetDateValue.getDate());

	let duration = targetTimeValue - now;
	document.getElementById("duration").innerHTML = duration;

	document.getElementById("target-date-value").innerHTML = targetDateValue;
	document.getElementById("target-time-value").innerHTML = targetTimeValue;

	setTimeout(tickCountdown, 100);
}