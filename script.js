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
const signButton = document.querySelector("#sign-button");
const pointButton = document.querySelector("#point-button");
const equalsButton = document.querySelector("#equals-button");

numberButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.textContent)));
operatorButtons.forEach(button => button.addEventListener("click", () => setOperation(button.textContent)));

clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteNumber);
signButton.addEventListener("click", changeSign);
pointButton.addEventListener("click", appendPoint);
equalsButton.addEventListener("click", evaluate);

window.addEventListener("keydown", handleKeyboardInput)



function appendNumber(number) {
    if (evaluated) clearScreen();
    if (calculationScreen.textContent === "0") {
        calculationScreen.textContent = number;
    } else {
        calculationScreen.textContent += number;
    }   
    // read operand each time number is appended
    if (currentOperation === null) {
        firstOperand = calculationScreen.textContent;
    } else {
        secondOperand = calculationScreen.textContent.substring(
            calculationScreen.textContent.indexOf(currentOperation) + 2
        );
    }
}

function appendPoint() {
    if ((firstOperand.toString().includes(".") && currentOperation === null) 
        || (secondOperand.toString().includes("."))) return;
    calculationScreen.textContent += ".";
}

function setOperation(operator) {
    if (currentOperation !== null && secondOperand !== "") evaluate(); 
    if (evaluated) calculationScreen.textContent = solutionScreen.textContent;
    currentOperation = operator;
    calculationScreen.textContent = `${firstOperand} ${currentOperation} `;
    evaluated = false;
}

function deleteNumber() {
    if (evaluated) return;
    calculationScreen.textContent = calculationScreen.textContent.toString().slice(0, -1);
    if (!calculationScreen.textContent.toString().includes(currentOperation)) currentOperation = null;
    if (currentOperation === null) {
        firstOperand = calculationScreen.textContent;
    } else {    
        secondOperand = calculationScreen.textContent.substring(
            calculationScreen.textContent.indexOf(currentOperation) + 2
        );
    }
}

function changeSign() {
    if (evaluated) return;
    if (currentOperation === null && secondOperand === "") {
        firstOperand *= -1;
        calculationScreen.textContent = firstOperand;
    } else if (secondOperand === "") {
        firstOperand *= -1;
        calculationScreen.textContent = `${firstOperand} ${currentOperation} `;
    } else {
        secondOperand *= -1;
        calculationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
    }

}

function clearScreen() {
    calculationScreen.textContent = "0"
    solutionScreen.textContent = "";
    firstOperand = "";
    secondOperand = ""; 
    currentOperation = null;
    evaluated = false;
}

function evaluate() {
    if (currentOperation === null) return;
    if (currentOperation === "÷" && secondOperand === "0") {
        calculationScreen.textContent = 0;
        solutionScreen.textContent = "MATH ERROR";
        firstOperand = "";
        secondOperand = "";
        currentOperation = null;
        return;
    }
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

function handleKeyboardInput(e) {
    if (e.key>= 0 && e.key<= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clearScreen();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") 
        setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "+") return "+";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "*") return "×";
    if (keyboardOperator === "/") return "÷";
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
        case "×": 
            return multiply(a, b);
        // change to divide symbol
        case "÷":
            return divide(a, b);
        default:
            return null;
    }
}