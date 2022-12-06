const sudokuBoard = document.querySelector("#sudoku");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution");
const squares = 81;
let submit = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 1);
  inputElement.setAttribute("max", 9);
  if (
    // % = modulus
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add("odd-section");
  }
  sudokuBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submit.push(input.value);
    } else {
      submit.push(".");
    }
  });
  console.log(submit);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
    solutionDisplay.innerHTML = "I've solved the puzzle, my dude";
  } else {
    solutionDisplay.innerHTML = "This puzzle is invalid, my dude";
  }
};

const solve = () => {
  joinValues();
  const data = { numbers: submit.join("") };
  console.log("data", data);

  fetch("http://localhost:8000/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populateValues(data.solvable, data.solution);
      submit = [];
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

solveButton.addEventListener("click", solve);
