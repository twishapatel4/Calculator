// === Display Elements ===
const display = document.querySelector(".display");
const partialSum = document.querySelector(".partial-sum");

// === Memory Buttons ===
const memoryButtons = document.querySelectorAll(".memory");

// === Mode Buttons (DEG, F-E) ===
const modeButtons = document.querySelectorAll(".mode");

// === Trigonometric Buttons ===
const trigButtons = document.querySelectorAll(".trig");

// === Function Buttons ===
const functionButtons = document.querySelectorAll(".fn");

// === Bracket Buttons ===
const openBracket = document.querySelector(".bracket.open");
const closeBracket = document.querySelector(".bracket.close");

// === Operator Buttons ===
const add = document.querySelector(".operator.add");
const subtract = document.querySelector(".operator.subtract");
const multiply = document.querySelector(".operator.multiply");
const divide = document.querySelector(".operator.divide");
const percent = document.querySelector(".operator.percent");
const operatorButtons = document.querySelectorAll(".operator");

// === Number Buttons ===
const numberButtons = document.querySelectorAll(".num");

// === Individual Number Buttons (if needed) ===
const zero = document.querySelector(".num.zero");
const one = document.querySelector(".num.one");
const two = document.querySelector(".num.two");
const three = document.querySelector(".num.three");
const four = document.querySelector(".num.four");
const five = document.querySelector(".num.five");
const six = document.querySelector(".num.six");
const seven = document.querySelector(".num.seven");
const eight = document.querySelector(".num.eight");
const nine = document.querySelector(".num.nine");

// === Decimal Button ===
const decimal = document.querySelector(".decimal");

// === Equals Button ===
const equals = document.querySelector(".equals");

// === Plus-Minus Button ===
const plusMinus = document.querySelector(".fn.plusminus");

// === Special Function Buttons (Optional) ===
const logBtn = document.querySelector(".fn.log");
const lnBtn = document.querySelector(".fn.ln");
const expBtn = document.querySelector(".fn.exp");
const factorialBtn = document.querySelector(".fn.factorial");
const sqrtBtn = document.querySelector(".fn.sqrt");
const squareBtn = document.querySelector(".fn.square");
const reciprocalBtn = document.querySelector(".fn.reciprocal");
const powerBtn = document.querySelector(".fn.power");
const tenPowerBtn = document.querySelector(".fn.ten-power");

// === Clear Button ===
const clearBtn = document.querySelector(".fn.clear");
clearBtn.addEventListener("click", function () {
  clear();
});

///variables

let numbers = [];
let op = [];
let result;
let results = [];
let operatorclicked = false;
let expression = "";
let resultShown = false;
//functions

const clear = function () {
  display.textContent = "";
  numbers = [];
  op = [];
  expression = "";
  operatorclicked = false;
};

const basicevaluate = function (a, b, operator) {
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }
  console.log(result);
  results.push(result);
  return result;
};
const trigEvaluate = function (val, num) {
  switch (val) {
    case "tan":
      return Math.tan(val);
    case "sin":
      return Math.sin(val);
    case "cos":
      return Math.cos(val);
    case "sec":
      return Math.sec(val);
    case "cosec":
      return Math.cosec(val);
    case "cot":
      return Math.cot(val);
  }
};

////Event listener

equals.addEventListener("click", function () {
  if (!expression !== "") {
    numbers.push(Number(expression));
  }
  let res = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    res = basicevaluate(res, numbers[i + 1], op[i]);
  }
  display.textContent = result;

  resultShown = true;
});

operatorButtons.forEach((button) => {
  if (resultShown) {
    numbers.push(result);
  }
  button.addEventListener("click", () => {
    operatorclicked = true;
    numbers.push(Number(expression));

    expression = "";
    const value = button.textContent;
    // console.log(value);
    op.push(value);
    display.textContent += value + " ";
  });
});

numberButtons.forEach((button) => {
  if (!expression) {
    display.textContent = "";
  }
  button.addEventListener("click", () => {
    if (resultShown) {
      display.textContent = "";
      expression = "";
      resultShown = false;
    }
    const value = button.textContent;
    expression += value;
    display.textContent += value + "";
  });
});

trigButtons.forEach((button) => {
  if (!expression) {
    display.textContent = "";
  }
  button.addEventListener("click", () => {
    if (resultShown) {
      display.textContent = "";
      expression = "";
      resultShown = false;
    }
    const value = button.textContent;
    console.log(value);

    let x = trigEvaluate(value, number);
    results.push(x);
    display.textContent = x;

    resultShown = true;
  });
});
