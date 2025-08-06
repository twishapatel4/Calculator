// === Display Elements ===
const display = document.querySelector(".display");
const partialSum = document.querySelector(".partial-sum");

// Memory Buttons
const memoryButtons = document.querySelectorAll(".memory");

// Mode Buttons (DEG, F-E)
const modeButtons = document.querySelectorAll(".mode");

const trigButtons = document.querySelectorAll(".trig");
const openBracket = document.querySelector(".bracket.open");
const closeBracket = document.querySelector(".bracket.close");

const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".num");
const decimal = document.querySelector(".decimal");
const equals = document.querySelector(".equals");
const comma = document.querySelector(".fn.comma");

// Special Function Buttons
const logBtn = document.querySelector(".fn.log");
const lnBtn = document.querySelector(".fn.ln");
const expBtn = document.querySelector(".fn.exp");
const factorialBtn = document.querySelector(".fn.factorial");
const sqrtBtn = document.querySelector(".fn.sqrt");
const absBtn = document.querySelector(".fn.abs");
const squareBtn = document.querySelector(".fn.square");
const reciprocalBtn = document.querySelector(".fn.reciprocal");
const powerBtn = document.querySelector(".fn.power");
const tenPowerBtn = document.querySelector(".fn.ten-power");
const floorBtn = document.querySelector(".fn.floor");
const randBtn = document.querySelector(".fn.rand");
const ceilBtn = document.querySelector(".fn.ceil");
const degreeBtn = document.querySelector(".fn.degree");
const dmsBtn = document.querySelector(".fn.dms");

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
let pendingUnaryOperation = null;
//functions

const clear = function () {
  display.textContent = "";
  numbers = [];
  op = [];
  results = [];
  expression = "";
  operatorclicked = false;
};

const colllectOutput = function (num) {
  result = num;
  expression = num.toString();
  display.textContent = expression;
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
    case "%":
      result = a % b;
      break;
  }
  console.log(result);
  results.push(result);
  console.log(results);
  return result;
};

const trigEvaluate = function (val, num) {
  switch (val) {
    case "tan":
      return Math.tan(num);
    case "sin":
      return Math.sin(num);
    case "cos":
      return Math.cos(num);
    case "sec":
      return 1 / Math.cos(num);
    case "cosec":
      return 1 / Math.sin(num);
    case "cot":
      return 1 / Math.tan(num);
  }
};

//// Event listener
openBracket.addEventListener("click", function () {
  expression += "(";
  display.textContent = expression;
});

closeBracket.addEventListener("click", function () {
  expression += ")";
  display.textContent = expression;
});

comma.addEventListener("click", function () {
  expression += ",";
  display.textContent = expression;
});

decimal.addEventListener("click", function () {
  if (resultShown) {
    display.textContent = "";
    expression = "";
    resultShown = false;
  }

  if (!expression.includes(".")) {
    expression += ".";
    display.textContent += ".";
  }
  // console.log(".");
});

equals.addEventListener("click", function () {
  if (expression !== "") {
    numbers.push(Number(expression));
  }
  let res = numbers[0];
  for (let i = 0; i < op.length; i++) {
    res = basicevaluate(res, numbers[i + 1], op[i]);
  }
  display.textContent = res;
  result = res;
  resultShown = true;
  expression = res.toString();
  numbers = [];
  op = [];
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultShown) {
      numbers = [result];
      resultShown = false;
      op = [];
    } else {
      numbers.push(Number(expression));
    }
    // operatorclicked = true;
    // numbers.push(Number(expression));

    expression = "";
    const value = button.textContent;
    // console.log(value);
    op.push(value);
    display.textContent += value + " ";
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultShown) {
      clear();
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
    let num = Number(expression);
    let x = trigEvaluate(value, num);
    results.push(x);
    display.textContent = x;

    resultShown = true;
  });
});

ceilBtn.addEventListener("click", function () {
  let num = expression;
  num = Math.ceil(num);
  colllectOutput(num);
});

floorBtn.addEventListener("click", function () {
  let num = expression;
  num = Math.floor(num);
  colllectOutput(num);
});

randBtn.addEventListener("click", function () {
  const out = Math.ceil(Math.random() * 10);
  colllectOutput(out);
});

squareBtn.addEventListener("click", function () {
  if (resultShown) {
    clear();
    resultShown = false;
  }
  const numStr = expression;
  const num = Number(numStr);
  const squared = num * num;
  // console.log(squared);
  colllectOutput(squared);
});

reciprocalBtn.addEventListener("click", function () {
  let num = Number(expression);
  num = 1 / num;
  colllectOutput(num);
});

sqrtBtn.addEventListener("click", function () {
  if (resultShown) {
    clear();
    resultShown = false;
  }
  const num = Number(expression);
  const sqrt = Math.sqrt(num);
  colllectOutput(sqrt);
});

absBtn.addEventListener("click", function () {
  // console.log("Absolute:");
  let num = Number(expression);
  num = Math.abs(num);
  // console.log("Absolute:", num);
  colllectOutput(num);
});

factorialBtn.addEventListener("click", function () {
  let num = Number(expression);
  let fact = 1;
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
    alert("Factorial is only defined for non-negative integers.");
    return;
  }
  for (let i = 2; i <= num; i++) {
    fact = fact * i;
  }

  // console.log("factorial:", result);
  colllectOutput(fact);
});

logBtn.addEventListener("click", function () {
  if (expression === "") {
    display.textContent = "log(";
    pendingUnaryOperation = "log";
    return;
  }
  let num = Number(expression);
  num = Math.log10(num);
  colllectOutput(num);
});

lnBtn.addEventListener("click", function () {
  let num = Number(expression);
  num = Math.log(num);
  colllectOutput(num);
});

expBtn.addEventListener("click", function () {
  let num = Number(expression);
  console.log(num);
  num = Math.exp(num);
  colllectOutput(num);
});

powerBtn.addEventListener("click", function () {});
