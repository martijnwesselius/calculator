let firstOperand = "";
let secondOperand = "";
let operator = null;

const calculationScreen = document.querySelector("#calculation");
const solutionScreen = document.querySelector("#solution");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButton = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const commaButton = document.querySelector("#comma-button");
const equalsButton = document.querySelector("#equals-button");



function setCurrentCalculation() {
    return;
} 



function evaluate() {

}


function roundResult(number) {
    return
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
    }
}