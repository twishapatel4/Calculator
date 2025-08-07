//  Display Elements
const display = document.querySelector(".display");

const mfeBtn = document.querySelector(".mfe");
const historyBtn = document.querySelector(".history");
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

const historyDiv = document.querySelector(".historyDiv");
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
let histArr = [];
let history = [];
let mfe = false;
//true: e; false:f
//functions

const clear = function () {
  display.textContent = "";
  expression = "";
  numbers = [];
  op = [];
  result = 0;

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
      if (b === 0) {
        expression = "Division by zero";
        return expression;
      }
      result = a / b;
      break;
    case "%":
      result = a % b;
      break;
  }
  console.log(result);
  // results.push(result);
  console.log(results);
  return result;
};

const evaluatePrecedence = function () {
  let num = [...numbers];
  let operators = [...op];
  for (let i = 0; i < operators.length; ) {
    if (operators[i] === "/" || operators[i] === "*" || operators[i] === "%") {
      let res = basicevaluate(num[i], num[i + 1], operators[i]);
      num.splice(i, 2, res);
      operators.splice(i, 1);
    } else {
      i++;
    }
  }
  let resultPrec = num[0];
  for (let i = 0; i < operators.length; i++) {
    resultPrec = basicevaluate(resultPrec, num[i + 1], operators[i]);
  }
  return resultPrec;
};

mfeBtn.addEventListener("click", () => {
  mfe = !mfe;

  mfe ? console.log("e") : console.log("f");
  // console.log("");
  if (resultShown && result !== null) {
    display.textContent = formatNumber(result);
  } else {
    console.log("result null");
  }
});
function formatNumber(num) {
  if (num === undefined || num === 0 || isNaN(num)) return;
  if (mfe) {
    return num.toExponential(6);
  } else {
    return num.toFixed(4);
  }
}
openBracket.addEventListener("click", function () {
  expression += "(";
  display.textContent = expression;
});

closeBracket.addEventListener("click", function () {
  expression += ")";
  display.textContent = expression;
});

pieBtn.addEventListener("click", function () {
  expression += Math.PI;
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

dmsBtn.addEventListener("click", function () {
  if (expression === "") {
    display.textContent = "Provide Input";
    return;
  }
  let sanitized = expression.replace(/,/g, "");
  let num = Number(sanitized);
  dmsConversion(num);
});

const dmsConversion = function (num) {
  const digit = num - Math.floor(num);
  const degree = num.toFixed();
  const min = digit * 60;
  const minute = min.toFixed();
  const sec = min - Math.floor(min);
  const second = (sec * 60).toFixed(2);
  display.textContent = `${degree}∘ ${minute}′ ${second}′′`;
};

equals.addEventListener("click", function () {
  if (expression !== "") {
    let sanitized = expression.replace(/,/g, "");
    numbers.push(Number(sanitized));
  }
  if (expression === "" || resultShown) return;
  if (pendingUnaryOperation) {
    spFunctions(pendingUnaryOperation);
    pendingUnaryOperation = null;
    resultShown = true;
    console.log(results);
    return;
  }
  if (isPowerOp) {
    evaluatePower(powerBase);
    console.log(results);
    return;
  }
  if (degree) {
    let sanitized = expression.replace(/,/g, "");
    let degrees = Number(sanitized);
    num = degrees * (Math.PI / 180);
    result = num;
    expression = num.toString();
    display.textContent = expression;
    degree = false;
    console.log(results);
    return;
  }
  let res = evaluatePrecedence();
  display.textContent = formatNumber(res);
  expression = res.toString();

  let j = 0;
  console.log(results);
  let k = 0;
  for (let i = 0; i < numbers.length + op.length; i++) {
    if (i % 2 == 0) {
      histArr.push(numbers[j]);
      j++;
    } else {
      histArr.push(op[k]);
      k++;
    }
  }
  //console.log(histArr);
  let hist = histArr.join(" ");
  //console.log(hist);
  history.push(hist);

  results.push(res);
  resultShown = true;
  numbers = [];
  op = [];
  console.log(results);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultShown) {
      numbers = [result];
      resultShown = false;
      op = [];
    } else {
      let sanitized = expression.replace(/,/g, "");
      numbers.push(Number(sanitized));
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
    // if (pendingUnaryOperation) {
    //   spFunctions(pendingUnaryOperation);
    //   pendingUnaryOperation = null;
    //   resultShown = true;
    //   console.log(results);
    //   return;
    // }
    if (resultShown) {
      clear();
      resultShown = false;
    }
    expression += value;
    display.textContent += value + "";
  });
});

const spFunctions = function (func) {
  let sanitized = expression.replace(/,/g, "");
  const num = Number(sanitized);
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
      // There is a bug here
      if (num < 0) {
        display.textContent = "Error: Negative input";
        return;
      }
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
      if (num < 0) {
        display.textContent = "Error: Negative input";
        expression = "";
        return;
      }
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
  display.textContent = formatNumber(result);
  expression = result.toString();
  const hist = `${func} (${num})`;
  history.push(hist);
  results.push(result);
  console.log(results);
  resultShown = true;
  pendingUnaryOperation = null;
};

ceilBtn.addEventListener("click", () => spFunctions("ceil"));
floorBtn.addEventListener("click", () => spFunctions("floor"));
randBtn.addEventListener("click", function () {
  result = Math.floor(Math.random() * 100);
  display.textContent = formatNumber(result);
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
    let sanitized = expression.replace(/,/g, "");
    powerBase = Number(sanitized);
    expression = "";
    isPowerOp = true;
    display.textContent = `pow(${powerBase}, `;
  } else {
    display.textContent = "Enter Base first";
  }
});
const evaluatePower = function (a) {
  console.log(a);
  let sanitized = expression.replace(/,/g, "");
  const exponent = Number(sanitized);
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
  console.log(results);

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
  expression += memory.toString();
  console.log("read");
  console.log("memory:", memory);
});

mpBtn.addEventListener("click", function () {
  if (results.length === 0) return;
  memory += results[results.length - 1];
  display.textContent = formatNumber(memory);
  console.log("memory:", memory);
});

mmBtn.addEventListener("click", function () {
  if (results.length === 0) return;
  memory -= results[results.length - 1];
  display.textContent = formatNumber(memory);
  console.log("memory:", memory);
});

backBtn.addEventListener("click", function () {
  expression = expression.slice(0, -1);
  display.textContent = expression;
});

console.log(results);
historyBtn.addEventListener("click", function () {
  // console.log(history);
  historyDiv.textContent = `${history
    .map((hist, index) => `${hist} = ${results[index]}`)
    .join("; ")}`;
});
