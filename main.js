const chooseList = (event) => {
  return event.target.id === "high-form" ? "#high-tasks" : "#low-tasks";
};

const choosePriority = (event) => {
  return event.target.id === "high-form" ? "#new-task-high" : "#new-task-low";
};

function addTask(e) {
  e.preventDefault();
  let inputValue = document.querySelector(choosePriority(e)).value;
  let newTask = document.createElement("li");
  let newInput = document.createElement("input");
  let newLabel = document.createElement("label");
  let newButton = document.createElement("button");

  newLabel.textContent = inputValue;
  newInput.setAttribute("type", "checkbox");
  newButton.classList.add("lnr");
  newButton.classList.add("lnr-cross");

  newTask.appendChild(newInput);
  newTask.appendChild(newLabel);
  newTask.appendChild(newButton);

  const taskList = document.querySelector(chooseList(e));

  taskList.appendChild(newTask);
}

let highForm = document.getElementById("high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.getElementById("low-form");

lowForm.addEventListener("submit", addTask);
