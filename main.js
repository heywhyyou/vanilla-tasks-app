// Logic task

const STATUS = {
  TODO: "to do",
  DONE: "done",
};

const PRIORITY = {
  LOW: "low",
  HIGH: "high",
};

const tasks = new Array();

// const checkNameValidity = (name) => {
//   return typeof name === "string" && name !== "";
// };

const chooseList = (event) => {
  return event.target.id === "high-form" ? "#high-tasks" : "#low-tasks";
};

const choosePriority = (event) => {
  return event.target.id === "high-form" ? "#new-task-high" : "#new-task-low";
};

function addToStorage(event, name, status) {
  let priority = choosePriority(event) === "#new-task-high" ? "high" : "low";
  console.log(priority);
  console.log(event);
  tasks.push({ name, status, priority });
}

function addTask(event, status = STATUS.TODO) {
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
  addToStorage(event, inputValue, status);
  console.log(tasks);
}

let highForm = document.querySelector("#high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.querySelector("#low-form");

lowForm.addEventListener("submit", addTask);
