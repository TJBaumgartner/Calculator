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
let canUseDecimal = true;
let equalsUsed = false;

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
    if(operatorActive == true){
        displayOutput.textContent = displayCurrent.textContent + '' + operation;
        currentOperation = operation;
        return;
    }
    if(currentNumber == ''){
        currentNumber = perviousNumber;
    }
    makeCalculation(currentOperation);
    
    displayOutput.textContent += displayCurrent.textContent + '' + operation;
    if(currentOperation != null){
        displayCurrent.textContent = totalOutput;
    }
    if(equalsUsed == true){
        displayOutput.textContent = totalOutput + operation;
        equalsUsed = false;
    }
    currentOperation = operation;
    perviousNumber = currentNumber;
    currentNumber = '';
    operatorActive = true;
    canUseDecimal = true;
    if(totalOutput > 99999999999){
        scientificConverter(totalOutput);
    }
}

function makeCalculation(operator){
    perviousNumber = parseInt(perviousNumber);
    currentNumber = parseInt(currentNumber);
    if(totalOutput > 0){
        perviousNumber = totalOutput;
    }
    if(operator == '+'){
        additionOperation(perviousNumber, currentNumber);
    }
    if(operator == '-'){
        subtractionOperation(perviousNumber, currentNumber);
    }
    if(operator == '*'){
        multiplicationOperation([perviousNumber, currentNumber]);
    }
    if(operator == '÷'){
        divisionOperation(perviousNumber, currentNumber);
    }
    if(operator == '%'){
        percentageOperation(perviousNumber, currentNumber);
    }
}

function additionOperation(a, b){
    totalOutput = a + b;
    return a + b;
}
function subtractionOperation(a, b){
    if(totalOutput == 0){
        currentNumber = currentNumber*-1;
        displayOutput.textContent = currentNumber;
    }
    totalOutput = a - b;
    return a - b;
}
function multiplicationOperation(array){
    let answer = array.reduce((total, current) => total * current, 1);
    totalOutput = answer;
    return answer;
}
function divisionOperation(a, b){
    totalOutput = a/b;
    return a/b;
}
function percentageOperation(a, b){
    b = b*0.01;
    c = b * a;
    totalOutput = c;
    return c;
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
    operatorActive = false;
    equalsUsed = false;
}

function equalsOperation (){
    if(currentOperation != null){
        makeCalculation(currentOperation);
        displayOutput.textContent += displayCurrent.textContent + '' + '=';  
        displayCurrent.textContent = totalOutput;
        currentOperation = null;
        canUseDecimal = true;
        equalsUsed = true;
        if(totalOutput > 99999999999 || totalOutput < -99999999999){
            scientificConverter(totalOutput);
        } 
    }
    
}

function scientificConverter (number){
    let numberToString = number.toString();
    let exponent = number.toString().length - 11;
    let newNumber = numberToString.slice(0,1) + '.' + numberToString.slice(1,3) + 'E' + exponent;
    displayCurrent.textContent = newNumber;
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