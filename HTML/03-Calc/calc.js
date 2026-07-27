let display = '0';
let firstNumber = null;
let operator = null;
let waitForNumber = false;
let memory = 0;

const displayElement = document.getElementById('display');

function updateDisplay() {
    displayElement.value = display;
}

function clearAll() {
    display = '0';
    firstNumber = null;
    operator = null;
    waitForNumber = false;
    updateDisplay();
}

function clearCurrent() {
    display = '0';
    updateDisplay();
}

function backspace() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
    }
    updateDisplay();
}

function changeSign() {
    if (display !== '0') {
        if (display.startsWith('-')) {
            display = display.slice(1);
        } else {
            display = '-' + display;
        }
        updateDisplay();
    }
}

function inputDigit(digit) {
    if (waitForNumber) {
        display = '0';
        waitForNumber = false;
    }

    if (digit === '.' && display.includes('.')) {
        return;
    }

    if (display === '0' && digit !== '.') {
        display = digit;
    } else {
        display += digit;
    }
    updateDisplay();
}

function calculate(num1, op, num2) {
    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/':
            if (num2 === 0) return 'Ошибка';
            return num1 / num2;
        default: return num2;
    }
}

function inputOperator(op) {
    const current = parseFloat(display);

    if (operator && !waitForNumber) {
        const result = calculate(firstNumber, operator, current);
        if (result === 'Ошибка') {
            display = 'Ошибка';
            updateDisplay();
            return;
        }
        display = String(result);
        updateDisplay();
    }

    firstNumber = parseFloat(display);
    operator = op;
    waitForNumber = true;
}

function inputEquals() {
    if (!operator) {
        return;
    }

    const current = parseFloat(display);
    const result = calculate(firstNumber, operator, current);

    if (result === 'Ошибка') {
        display = 'Ошибка';
    } else {
        display = String(result);
    }

    firstNumber = null;
    operator = null;
    waitForNumber = true;
    updateDisplay();
}

function squareRoot() {
    const num = parseFloat(display);
    if (num < 0) {
        display = 'Ошибка';
    } else {
        display = String(Math.sqrt(num));
    }
    waitForNumber = true;
    updateDisplay();
}

function inverse() {
    const num = parseFloat(display);
    if (num === 0) {
        display = 'Ошибка';
    } else {
        display = String(1 / num);
    }
    waitForNumber = true;
    updateDisplay();
}

function percent() {
    const num = parseFloat(display);
    display = String(num / 100);
    waitForNumber = true;
    updateDisplay();
}

function memoryClear() {
}

function memoryRecall() {
}

function memoryStore() {
}

function memoryAdd() {
}

document.addEventListener('keydown', function (e) {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        inputDigit(key);
        e.preventDefault();
    } else if (key === '.') {
        inputDigit('.');
        e.preventDefault();
    } else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
        e.preventDefault();
    } else if (key === 'Enter' || key === '=') {
        inputEquals();
        e.preventDefault();
    } else if (key === 'Backspace') {
        backspace();
        e.preventDefault();
    } else if (key === 'Escape') {
        clearAll();
        e.preventDefault();
    } else if (key === '%') {
        percent();
        e.preventDefault();
    }
});

clearAll();