// Étape 1 - Selection des variables données par le DOM
let submitButtonDOM = document.querySelector("#addHabitButton");
let tbodyDOM = document.querySelector("#tableHabit");
let formDOM = document.querySelector("#form");
let newHabitDOM = document.querySelector("#habit");
let dayCell = document.querySelectorAll(".dayCell");

console.log("test", submitButtonDOM, "fdsfq", tbodyDOM);

// Étape 2 - Créer la fonction de création de ligne
function createRow() {
  console.log("Je suis la fonction createRow et je démare ma tambouille !!!");
  let row = document.createElement("tr");
  /* row.id = `tr${i}` ; */
  let rowTitle = document.createElement("th");
  let value = newHabitDOM.value;

  rowTitle.textContent = value;
  console.log("La valeur de value est:", value);

  row.appendChild(rowTitle);
  tbodyDOM.appendChild(row);

  for (let i = 0; i < 7; i++) {
    let cell = document.createElement("td");
    cell.className = "dayCell";
    row.appendChild(cell);
  }

  newHabitDOM.value = "";
}

function applyRandomColor(event) {
  let selectedCell = event.target;
  console.log(selectedCell);

  if (selectedCell.classList.contains("dayCell")) {
    if (selectedCell.style.backgroundColor === "") {
      console.log("Je vais appliquer la couleur à la case !");
      selectedCell.style.backgroundColor = "green";
    } else {
      selectedCell.style.backgroundColor = "";
      console.log("Je vais enlever la couleur de la case !");
    }
  }
}

// Étape 3 - Créer une fonction pour sauvegarder les rows dans le local storage

// Étape 4 - Voir pour créer la gestion de la couleur (valeur défaut : aléatoire, picker possible)

//DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", function () {
  //Au clic de l'ajout de la nouvelle routine
  formDOM.addEventListener("submit", function (event) {
    event.preventDefault();
    createRow();
  });

  tbodyDOM.addEventListener("click", applyRandomColor);
});
