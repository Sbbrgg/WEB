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

//function setBackgroundColor(e)
//{
//	document.body.style.backgroundColor = e.target.value;
//	//document.body.style.backgroundColor = document.getElementById("background-color").value;
//}
//function setForegroundColor()
//{
//	document.body.style.color = document.getElementById("foreground-color").value;
//}
function setColor(event) {
	//if (event.target.id === 'background-color') {
	//	document.body.style.backgroundColor = event.target.value;
	//}
	//else
	//	document.body.style.color = event.target.value;		
	document.body.style[(event.target.id === 'background-color' ? 'background-color' : 'color')] = event.target.value
}
document.addEventListener("mousemove", traceMouse);
function traceMouse(e) {
	document.getElementById("mouse").innerHTML = `X= ${e.clientX}, Y = ${e.clientY}`;
}

document.getElementById("switch-background").addEventListener("click", switchBackground)
function switchBackground(e) {

	let skin = document.body.className;

	let switchButton = document.getElementById("switch-background");
	switchButton.src = skin === "dark" ? 'moon.png': 'sun.png';
	document.body.className = skin === "dark" ? 'light': 'dark';
	//document.getElementById("debug-background").innerHTML = switchButton.src;
	document.getElementById("debug-background").innerHTML = document.body.className;
}