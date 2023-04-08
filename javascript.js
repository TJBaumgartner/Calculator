const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearEntryButton = document.querySelector('[data-clear-entry]');
const allClearButton = document.querySelector('[data-all-clear]');
const displayOutput = document.getElementById('displayOutput');
const displayCurrent = document.getElementById('displayCurrent');
let perviousNumber = '';
let currentNumber = '';
let currentOperation = null;
let operatorActive = false;



function setNumber(number){
    if(displayCurrent.textContent == 0){
        displayCurrent.textContent = '';
    }
    if(operatorActive == true){
        displayCurrent.textContent = number;
        operatorActive = false;
        return;
    }
    displayCurrent.textContent += number;
    currentNumber += number;
}

function setOperator(operation){
    displayOutput.textContent += displayCurrent.textContent + '' + operation;
    currentOperation = operation;
    perviousNumber = currentNumber;
    currentNumber = '';
    operatorActive = true;
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setNumber(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setOperator(button.textContent);
    });
});