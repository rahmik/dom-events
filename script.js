const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const equalsButton = document.querySelector('.equals');

let currentInput = '';
let firstNumber = null;
let secondNumber = null;
let operator = null;

function updateDisplay(value) {
  display.innerText = value;
}

numberButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    currentInput += event.target.innerText;
    updateDisplay(currentInput);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const clickedOperator = event.target.innerText;
    if (clickedOperator === 'C') {
      currentInput = '';
      firstNumber = null;
      secondNumber = null;
      operator = null;
      updateDisplay('0');
    } else if (['+', '-', '*', '/'].includes(clickedOperator)) {
      if (currentInput !== '') {
        firstNumber = parseFloat(currentInput);
        currentInput = '';
        operator = clickedOperator;
        updateDisplay(operator);
      }
    }
  });
});

equalsButton.addEventListener('click', () => {
  if (currentInput !== '' && operator) {
    secondNumber = parseFloat(currentInput);
    let result = 0;
    switch (operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === 0) {
          updateDisplay('Error');
          return;
        }
        result = firstNumber / secondNumber;
        break;
    }
    updateDisplay(result);
    currentInput = result.toString();
    firstNumber = null;
    secondNumber = null;
    operator = null;
  }
});
