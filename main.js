const chooseList = (event) => {
  return event.target.id === "high-form" ? "#high-tasks" : "#low-tasks";
};

const choosePriority = (event) => {
  return event.target.id === "high-form" ? "#new-task-high" : "#new-task-low";
};

function addTask(event) {
  event.preventDefault();
  let inputValue = document.querySelector(choosePriority(event)).value;
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

  const taskList = document.querySelector(chooseList(event));

  taskList.appendChild(newTask);
  event.target.reset();
}

let highForm = document.querySelector("#high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.querySelector("#low-form");

lowForm.addEventListener("submit", addTask);
