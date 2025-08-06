// === Display Elements ===
const display = document.querySelector(".display");
const partialSum = document.querySelector(".partial-sum");

// Memory Buttons
const memoryButtons = document.querySelectorAll(".memory");

// Mode Buttons (DEG, F-E)
const modeButtons = document.querySelectorAll(".mode");
const msBtn = document.querySelector(".ms");
const mpBtn = document.querySelector(".mp");
const mmBtn = document.querySelector(".mm");
const mcBtn = document.querySelector(".mc");
const mrBtn = document.querySelector(".mr");

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
const degreeBtn = document.querySelector(".fn.deg");
const dmsBtn = document.querySelector(".fn.dms");
const pieBtn = document.querySelector(".fn.pie");

const backBtn = document.querySelector(".back");
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
let isPowerOp = false;
let powerBase = null;
let degree = false;
let memory = 0;
//functions

const clear = function () {
  display.textContent = "";
  numbers = [];
  op = [];
  results = [];
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
    case "%":
      result = a % b;
      break;
  }
  console.log(result);
  results.push(result);
  console.log(results);
  return result;
};

openBracket.addEventListener("click", function () {
  expression += "(";
  display.textContent = expression;
});

closeBracket.addEventListener("click", function () {
  expression += ")";
  display.textContent = expression;
});

pieBtn.addEventListener("click", function () {
  expression += 2.73;
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

degreeBtn.addEventListener("click", function () {
  //degrees = radians × (180 / π)
  if (expression === "") {
    display.textContent = "Cannot perform Operations";
    return;
  }
  degree = true;
});

dmsBtn.addEventListener("click", function () {});

equals.addEventListener("click", function () {
  if (expression !== "") {
    numbers.push(Number(expression));
  }
  if (pendingUnaryOperation) {
    spFunctions(pendingUnaryOperation);
    pendingUnaryOperation = null;
    resultShown = true;
    return;
  }
  if (isPowerOp) {
    evaluatePower(powerBase);
    return;
  }
  if (degree) {
    let degrees = Number(expression);
    num = degrees * (Math.PI / 180);
    result = num;
    expression = num.toString();
    display.textContent = expression;
    degree = false;
    return;
  }
  let res = numbers[0];
  for (let i = 0; i < op.length; i++) {
    res = basicevaluate(res, numbers[i + 1], op[i]);
  }
  display.textContent = res;
  expression = res.toString();
  result = res;
  resultShown = true;
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
    expression = "";
    const value = button.textContent;
    op.push(value);
    display.textContent += value + " ";
  });
});
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (isPowerOp) {
      display.textContent = `pow(${powerBase}, ${expression}`;
    }
    if (resultShown) {
      clear();
      resultShown = false;
    }
    expression += value;
    display.textContent += value + "";
  });
});

const spFunctions = function (func) {
  const num = Number(expression);
  let result;
  if (expression === "") {
    display.textContent = `${func}(`;
    pendingUnaryOperation = func;
    return;
  }
  switch (func) {
    case "log":
      console.log("log");
      result = Math.log10(num);
      break;
    case "ln":
      result = Math.log(num);
      break;
    case "sqrt":
      result = Math.sqrt(num);
      break;
    case "abs":
      result = Math.abs(num);
      break;
    case "ceil":
      result = Math.ceil(num);
      break;
    case "floor":
      result = Math.floor(num);
      break;
    case "exp":
      result = Math.exp(num);
      break;
    case "square":
      result = num * num;
      break;
    case "reciprocal":
      result = 1 / num;
      break;
    case "factorial":
      result = 1;
      for (let i = 2; i <= num; i++) result = result * i;
      break;
    case "tan":
      result = Math.tan(num);
      break;
    case "sin":
      result = Math.sin(num);
      break;
    case "cos":
      result = Math.cos(num);
      break;
    case "sec":
      result = 1 / Math.cos(num);
      break;
    case "cosec":
      result = 1 / Math.sin(num);
      break;
    case "cot":
      result = 1 / Math.tan(num);
      break;
  }
  display.textContent = result;
  expression = result.toString();
  results.push(result);
  resultShown = true;
  pendingUnaryOperation = null;
};

ceilBtn.addEventListener("click", () => spFunctions("ceil"));
floorBtn.addEventListener("click", () => spFunctions("floor"));
randBtn.addEventListener("click", function () {
  result = Math.floor(Math.random() * 100);
  display.textContent = result;
});
squareBtn.addEventListener("click", () => spFunctions("square"));
reciprocalBtn.addEventListener("click", () => spFunctions("reciprocal"));
sqrtBtn.addEventListener("click", () => spFunctions("sqrt"));
absBtn.addEventListener("click", () => spFunctions("abs"));
factorialBtn.addEventListener("click", () => spFunctions("factorial"));
logBtn.addEventListener("click", () => spFunctions("log"));
lnBtn.addEventListener("click", () => spFunctions("ln"));
expBtn.addEventListener("click", () => spFunctions("exp"));
powerBtn.addEventListener("click", function () {
  if (expression !== "") {
    powerBase = Number(expression);
    expression = "";
    isPowerOp = true;
    display.textContent = `pow(${powerBase}, `;
  } else {
    display.textContent = "Enter Base first";
  }
});
const evaluatePower = function (a) {
  console.log(a);
  const exponent = Number(expression);
  console.log(exponent);
  const res = Math.pow(a, exponent);
  console.log(res);
  expression = res.toString();
  console.log(expression);
  display.textContent = expression;
  result = res;
  resultShown = true;
  isPowerOp = false;
  powerBase = null;
  return;
};
tenPowerBtn.addEventListener("click", function () {
  isPowerOp = true;
  if (expression === "") {
    display.textContent = `10 pow(`;
    powerBase = 10;
  } else {
    display.textContent = "Base will always be 10";
  }
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
    spFunctions(value);
  });
});

//Working with memory
msBtn.addEventListener("click", function () {
  memory = results[results.length - 1];
  display.textContent = memory;

  console.log("saved");
  console.log("memory:", memory);
});

mcBtn.addEventListener("click", function () {
  memory = 0;
  display.textContent = memory;
  console.log("memory:", memory);
});

mrBtn.addEventListener("click", function () {
  display.textContent = memory;
  console.log("read");
  console.log("memory:", memory);
});

mpBtn.addEventListener("click", function () {
  memory += results[results.length - 1];
  display.textContent = memory;
  console.log("memory:", memory);
});

mmBtn.addEventListener("click", function () {
  memory -= results[results.length - 1];
  display.textContent = memory;
  console.log("memory:", memory);
});

backBtn.addEventListener("click", function () {
  expression = expression.slice(0, -1);
  display.textContent = expression;
});

// ADD BODMAS
// INSERT COMMA IN NUMBERS THEN OPERATION ERROR
// 2ND
// F-E
// DEGREE
// HISTORY
// ADDING ERROS DISPLAYED
