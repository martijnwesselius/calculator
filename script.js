let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let evaluated = false;

const calculationScreen = document.querySelector("#calculation");
const solutionScreen = document.querySelector("#solution");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const commaButton = document.querySelector("#comma-button");
const equalsButton = document.querySelector("#equals-button");

numberButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.textContent)));
operatorButtons.forEach(button => button.addEventListener("click", () => setOperation(button.textContent)));

clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteNumber);
commaButton.addEventListener("click", addComma);
equalsButton.addEventListener("click", evaluate);


function appendNumber(number) {
    if (calculationScreen.textContent === "0") {
        calculationScreen.textContent = number;
    } else {
        calculationScreen.textContent += number;
    }
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    if (evaluated) calculationScreen.textContent = solutionScreen.textContent;
    firstOperand = calculationScreen.textContent;
    currentOperation = operator;
    calculationScreen.textContent = `${firstOperand} ${currentOperation} `;
}


function clearScreen() {
    calculationScreen.textContent = "0"
    solutionScreen.textContent = "";
    firstOperand = "";
    secondOperand = ""; 
    currentOperation = null;
    evaluated = false;
}

function deleteNumber() {
    return;
}

function addComma() {
    return;
}

function setCurrentCalculation() {
    return;
} 

function evaluate() {
    if (currentOperation === null) return;
    
    secondOperand = calculationScreen.textContent.substring(
        calculationScreen.textContent.indexOf(currentOperation) + 2
    );

    if (currentOperation === "÷" && secondOperand === "0") {
        calculationScreen.textContent = 0;
        solutionScreen.textContent = "MATH ERROR";
        firstOperand = "";
        secondOperand = "";
        currentOperation = null;
        return;
    }

    console.log(firstOperand);
    console.log(currentOperation);
    console.log(secondOperand);

    solutionScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    firstOperand = solutionScreen.textContent;
    secondOperand = "";
    currentOperation = null;
    evaluated = true;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function convertOperator() {
    // convert input from keyboard
    return;
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? null : a / b;
}

function operate(operator, a, b) {
    operator = String(operator);
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b); 
        // change to multiply symbol
        case "*": 
            return multiply(a, b);
        // change to divide symbol
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}