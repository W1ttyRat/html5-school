let currentInput = "";
let currentOperator = "";
let previousInput = "";


function inputNumber(num) {
    //console.log(num);
    currentInput += num;
    document.getElementById("display").value = `${previousInput} ${currentOperator} ${currentInput}`;

}

function inputOperator(operator) {
    //console.log(operator);
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = "";
    document.getElementById("display").value = `${previousInput} ${currentOperator}`;

}

function calculate() {

    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                document.getElementById("display").value = "Error: Division by zero";
                return;
            }
            result = prev / current;
            break;
        default:
            return;

    }

    currentInput = result.toString();
    currentOperator = "";
    previousInput = "";
    document.getElementById("display").value = currentInput;
}

function clearDisplay() {
    currentInput = "";
    currentOperator = "";
    previousInput = "";
    document.getElementById("display").value = "";
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById("display").value = `${previousInput} ${currentOperator} ${currentInput}`;
}
