let submitButtonDOM = document.querySelector("#addHabitButton");
let tbodyDOM = document.querySelector("#tableHabit");
let formDOM = document.querySelector("#form");
let newHabitDOM = document.querySelector("#habit");

function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);

  return `rgb(${r}, ${g}, ${b})`;
}

function saveRows() {
  const rowsData = [];

  tbodyDOM.querySelectorAll("tr").forEach((row) => {
    const rowData = {
      title: row.querySelector("th").textContent,
      borderColor: row.querySelector("th").style.borderColor,
      cells: [],
    };

    row.querySelectorAll("td").forEach((cell) => {
      rowData.cells.push(cell.style.backgroundColor);
    });

    rowsData.push(rowData);
  });

  window.localStorage.setItem("habitRows", JSON.stringify(rowsData));
}

function loadRows() {
  const rowsData = JSON.parse(window.localStorage.getItem("habitRows"));

  if (rowsData) {
    rowsData.forEach((rowData) => {
      row(rowData);
    });
  }
}

function row(rowData = null) {
  let row = document.createElement("tr");

  let rowId = `tr${tbodyDOM.children.length + 1}`;
  row.id = rowId;

  let tdDelete = document.createElement("td");
  tdDelete.textContent = "🚽";
  tdDelete.className = "delete-btn";

  let rowTitle = document.createElement("th");
  let value = rowData ? rowData.title : newHabitDOM.value;
  rowTitle.textContent = value;

  rowTitle.style.borderColor = rowData ? rowData.borderColor : getRandomColor();
  row.style.borderColor = rowTitle.style.borderColor;

  row.appendChild(rowTitle);

  for (let i = 0; i < 7; i++) {
    let cell = document.createElement("td");
    cell.className = "dayCell";
    cell.style.backgroundColor = rowData ? rowData.cells[i] : "";

    row.appendChild(cell);
  }

  tbodyDOM.appendChild(row);
  row.appendChild(tdDelete);
}

function createRow() {
  row();
  saveRows();

  newHabitDOM.value = "";
}

function applyRandomColor(event) {
  let selectedCell = event.target;
  let row = selectedCell.parentNode;

  if (event.target.classList.contains("dayCell")) {
    let currentColor = event.target.style.backgroundColor;
    if (currentColor === "") {
      event.target.style.backgroundColor = row.style.borderColor;
    } else {
      event.target.style.backgroundColor = "";
    }

    saveRows();
  }
}

function deleteRow(event) {
  if (event.target.classList.contains("delete-btn")) {
    let row = event.target.closest("tr");
    row.remove();

    saveRows();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadRows();
  tbodyDOM.addEventListener("click", deleteRow);

  formDOM.addEventListener("submit", function (event) {
    event.preventDefault();
    createRow();
  });

  tbodyDOM.addEventListener("click", applyRandomColor);
});
