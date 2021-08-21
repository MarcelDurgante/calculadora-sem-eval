// -------- VARIABLES ----------

let toggleBtn = document.getElementById("checkbox");
let mainContainer = document.getElementById("mainContainer");
let miniScreen = document.getElementById("miniScreen");
let screen = document.getElementById("screen");
let keyboardGrid = document.getElementById("keyboardGrid");
let key = document.querySelectorAll(".key");
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let equal = document.getElementById("equal");
let label = document.getElementById("label");
let clear = document.getElementById("clear");
let decimal = document.getElementById("decimal");
let operationLog = document.getElementById("opLog");
let historyBtn = document.getElementById("historyBtn");
let plusMinus = document.getElementById("plusMinus");
let valor1;
let valor2;

let keys = Array.from(key);
let operators = Array.from(operator);
let numbers = Array.from(number);

// -------- EVENT LISTENER CHANGING CLASSES --------

toggleBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("main-container--light");
  miniScreen.classList.toggle("mini-screen--light");
  screen.classList.toggle("screen--light");
  keyboardGrid.classList.toggle("keyboard-grid--light");
  keys.forEach((element) => {
    element.classList.toggle("key--light");
  });
  operators.forEach((element) => {
    element.classList.toggle("operator--light");
  });
  numbers.forEach((element) => {
    element.classList.toggle("number--light");
  });
  equal.classList.toggle("equal--light");
  label.classList.toggle("label--light");
});

// -------- PRINTING NUMBERS --------

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (screen.textContent === "0") {
      screen.innerHTML = number.value;
    } else {
      screen.textContent += number.value;
    }
    valor1 = parseFloat(screen.textContent);
  });
});

// -------- PRINTING OPERATORS --------

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    // -------- CLEAR BUTTON --------

    if (operator.innerHTML == "C") {
      screen.innerHTML = 0;
      miniScreen.innerHTML = 0;

      // -------- SHOW ONLY ONE OPERATOR --------
    } else if (
      screen.innerHTML.slice(-1) == "+" ||
      screen.innerHTML.slice(-1) == "-" ||
      screen.innerHTML.slice(-1) == "*" ||
      screen.innerHTML.slice(-1) == "/" ||
      screen.innerHTML.slice(-1) == "%" ||
      screen.innerHTML.slice(-1) == "+-"
    ) {
    } else {
      screen.innerHTML += e.target.value; // it also works with e.target.value, it will return an array of the buttons too
    }
  });
});

// -------- MEM0RIA --------

// -------- FUNCTIONS FOR CALCULAT0R --------

function add(valor1, valor2) {
  let res = valor1 + valor2;
  screen.textContent = res;
  console.log(res);
}
function rest(valor1, valor2) {
  let res = valor1 - valor2;
  screen.textContent = res;
  console.log(res);
}

function multiply(valor1, valor2) {
  let res = valor1 * valor2;
  screen.textContent = res;
  console.log(res);
}

// -------- PRINT MINI-SCREEN AFTER EQUAL --------

equal.addEventListener("click", () => {
  miniScreen.textContent = screen.textContent;

  // -------- TO DO THE OPERATION --------

  if (screen.textContent.includes("+")) {
    valor2 = parseFloat(screen.textContent.split("+").pop());

    add(valor1, valor2);
  } else if (screen.textContent.includes("-")) {
    valor2 = parseFloat(screen.textContent.split("-").pop());

    rest(valor1, valor2);
  } else if (screen.textContent.includes("*")) {
    valor2 = parseFloat(screen.textContent.split("*").pop());

    multiply(valor1, valor2);
  } else if (screen.textContent.includes("/")) {
    valor2 = parseFloat(screen.textContent.split("/").pop());

    division(valor1, valor2);
  }

  // -------- REGISTER OPERATION TO OPERATION LOG --------

  operationLog.innerHTML +=
    miniScreen.textContent + " = " + screen.textContent + "<br>";
});

// -------- FOR F***NG DECIMALS --------

decimal.addEventListener("click", () => {
  if (!screen.textContent.includes(".")) {
    screen.textContent += decimal.value;
  }
});

// -------- TO OPENS OPERATIONS LOG -------

historyBtn.addEventListener("click", () => {
  operationLog.classList.toggle("--is-visible");
});

// -------- PLUS MINUS BUTTON -------

plusMinus.addEventListener("click", () => {
  screen.textContent = screen.textContent * -1;
});
