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
let totalOutput = 0;
canUseDecimal = true;


function setNumber(number){
    if(displayCurrent.textContent == 0){
        displayCurrent.textContent = '';
    }
    if(operatorActive == true){
        displayCurrent.textContent = number;
        currentNumber += number;
        operatorActive = false;
        return;
    }
    if(number == '.'){
        if(canUseDecimal == true){
            displayCurrent.textContent += number;
            currentNumber += number;
            canUseDecimal = false;
            return;
        }
        return;
    }
    displayCurrent.textContent += number;
    currentNumber += number;
}

function setOperator(operation){
    if(currentNumber == ''){
        currentNumber = perviousNumber;
    }
    makeCalculation(currentOperation);
    displayOutput.textContent += displayCurrent.textContent + '' + operation;
    if(currentOperation != null){
        displayCurrent.textContent = totalOutput;
    }
    currentOperation = operation;
    perviousNumber = currentNumber;
    currentNumber = '';
    operatorActive = true;
    canUseDecimal = true;
}

function makeCalculation(operator){
    if(operator == '+'){
        additionOperation(perviousNumber, currentNumber);
    }
    if(operator == '-'){
        subtractionOperation(perviousNumber, currentNumber);
    }
    if(operator == '*'){
        multiplicationOperation(perviousNumber, currentNumber);
    }
    if(operator == '÷'){
        divisionOperation(perviousNumber, currentNumber);
    }
    if(operator == '%'){
        percentageOperation(perviousNumber, currentNumber);
    }
}

function additionOperation(a, b){
    let intA = parseInt(a);
    let intB = parseInt(b);
    if(totalOutput > 0){
        intA = totalOutput;
    }
    totalOutput = intA + intB;
    console.log(totalOutput);
    return intA + intB;
}
function subtractionOperation(a, b){
    let intA = parseInt(a);
    let intB = parseInt(b);
    if(totalOutput > 0){
        intA = totalOutput;
    }
    totalOutput = intA - intB;
    console.log(totalOutput);
    return intA - intB;
}







function clearEntry (){
    currentNumber = '';
    displayCurrent.textContent = '';
    canUseDecimal = true;
}

function allClear (){
    currentNumber = '';
    perviousNumber = '';
    currentOperation = null;
    displayCurrent.textContent = '';
    canUseDecimal = true;
    displayOutput.textContent = '';
    totalOutput = 0;
}

function equalsOperation (){

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

clearEntryButton.addEventListener('click', clearEntry);
allClearButton.addEventListener('click', allClear);
equalsButton.addEventListener('click', equalsOperation);