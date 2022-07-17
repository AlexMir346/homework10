const calc = {
  displayValue: '0',
  value1: null,
  value2: false,
  operator: null,
};

function inputnumbers(numbers) {
  const { displayValue, value2 } = calc;

  if (value2 === true) {
    calc.displayValue = numbers;
    calc.value2 = false;
  } else {
    calc.displayValue = displayValue === '0' ? numbers : displayValue + numbers;
  }

  console.log(calc);
}

function inputDecimal(dot) {
  if (calc.value2 === true) {
    calc.displayValue = '0.';
    calc.value2 = false;
    return;
  }
  if (!calc.displayValue.includes(dot)) {
    calc.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { value1, displayValue, operator } = calc;
  const inputValue = parseFloat(displayValue);

  if (operator && calc.value2) {
    calc.operator = nextOperator;
    console.log(calc);
    return;
  }

  if (value1 == null && !isNaN(inputValue)) {
    calc.value1 = inputValue;
  } else if (operator) {
    const result = calculate(value1, inputValue, operator);

    calc.displayValue = `${parseFloat(result.toFixed(7))}`;
    calc.value1 = result;
  }

  calc.value2 = true;
  calc.operator = nextOperator;
  console.log(calc);
}

function calculate(value1, value2, operator) {
  if (operator === '+') {
    return value1 + value2;
  } else if (operator === '-') {
    return value1 - value2;
  } else if (operator === '*') {
    return value1 * value2;
  } else if (operator === '/') {
    return value1 / value2;
  }

  return value2;
}

function resetcalc() {
  calc.displayValue = '0';
  calc.value1 = null;
  calc.value2 = false;
  calc.operator = null;
  console.log(calc);
}

let memory = 0;

function handleMPlus() {
  memory = calc.displayValue;
  console.log(memory);
}

function handleMMinus() {
  memory = -calc.displayValue;
  console.log(memory);
}

function handleMrc() {
  calc.displayValue = memory;
}

function updateDisplay() {
  const display = document.querySelector('.display > input');
  display.value = calc.displayValue;
}

updateDisplay();

const btn = document.querySelector('.keys');
btn.addEventListener('click', (e) => {
  const { target } = e;
  const { value } = target;

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'C':
      resetcalc();
      break;
    case 'm+':
      handleMPlus();
      break;
    case 'm-':
      handleMMinus();
      break;
    case 'mrc':
      handleMrc();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputnumbers(value);
      }
  }

  updateDisplay();
});
