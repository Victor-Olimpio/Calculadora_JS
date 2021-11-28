
// JAVASCRIPT - CALCULADORA!

let newOperator;
let previousNumber;
let newNumber = true;

const numberKeys = document.querySelectorAll('[id *= key]');
const displayScreen = document.querySelector('#display-screen');
const operatorKeys = document.querySelectorAll('[id *= operator]');

const operationPending = () => newOperator !== undefined;

const updateDisplay = (eventText) => {
    if (newNumber) {
        newNumber = false;
        displayScreen.textContent = eventText;
    } else {
        displayScreen.textContent += eventText;
    }
}

const calculateNumber = () => {
    if (operationPending()) {
        newNumber = true;
        const currentNumber = parseFloat(displayScreen.textContent);
        const operationResult = eval(`${previousNumber} ${newOperator} ${currentNumber}`);
        updateDisplay(operationResult);
    }
}

const insertNumber = (eventNumber) => updateDisplay(eventNumber.target.textContent);
numberKeys.forEach(number => number.addEventListener('click', insertNumber));

const selectOperator = (eventOperator) => {
    if (!newNumber) {
        newNumber = true;
        calculateNumber();
        previousNumber = parseFloat(displayScreen.textContent);
        newOperator = eventOperator.target.textContent;
    }
}
operatorKeys.forEach (operator => operator.addEventListener('click', selectOperator));

const clearDisplay = () => displayScreen.textContent = '';

const activateEqual = () => {
    calculateNumber();
    newOperator = undefined;
}
document.getElementById('button-equals').addEventListener('click', activateEqual);

const clearCalculation = () => {
    clearDisplay();
    newNumber = true;
    newOperator = undefined;
    previousNumber = undefined;
}
document.getElementById('button-clearDi').addEventListener('click', clearDisplay);
document.getElementById('button-clearCa').addEventListener('click', clearCalculation);

const removeLastNumber = () => displayScreen.textContent = displayScreen.textContent.slice(0, -1);
document.getElementById('button-backSpa').addEventListener('click', removeLastNumber);

const existValue = () => displayScreen.textContent.length > 0;
const existDecimal = () => displayScreen.textContent.indexOf('.') !== -1;

const insertDecimalNumber = () => {
    if (!existDecimal()) {
        if (existValue()) {
            updateDisplay('.');
        } else {
            updateDisplay('0.');
        }
    }
}
document.getElementById('button-pointer').addEventListener('click', insertDecimalNumber);

const keyboardMap = {
    '0' : 'key-0',
    '1' : 'key-1',
    '2' : 'key-2',
    '3' : 'key-3',
    '4' : 'key-4',
    '5' : 'key-5',
    '6' : 'key-6',
    '7' : 'key-7',
    '8' : 'key-8',
    '9' : 'key-9',

    '+' : 'operator-somar',
    '-' : 'operator-subtr',
    '*' : 'operator-multi',
    '/' : 'operator-divid',

    '=' : 'button-equals',
    '.' : 'button-pointer',
    'C' : 'button-clearDi',
    'c' : 'button-clearDi',
    'Enter'      : 'button-equals',
    'Escape'     : 'button-clearCa',
    'Backspace'  : 'button-backSpa',

};

const mapKeyboard = (eventKey) => {
    const keyPress = eventKey.key;

    const keyAllowed = () => Object.keys(keyboardMap).indexOf(keyPress) !== -1;
    if (keyAllowed()) {
        document.getElementById(keyboardMap[keyPress]).click()
    }
};
document.addEventListener('keydown', mapKeyboard);