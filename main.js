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
// tasks.push({ kek: "lol" });

// const checkNameValidity = (name) => {
//   return typeof name === "string" && name !== "";
// };

const chooseList = (event) => {
  return event.target.id === "high-form" ? "#high-tasks" : "#low-tasks";
};

const chooseListRender = (priority) => {
  return priority === "high"
    ? document.querySelector("#high-tasks")
    : document.querySelector("#low-tasks");
};

const choosePriority = (event) => {
  return event.target.id === "high-form" ? "#new-task-high" : "#new-task-low";
};

function render(event) {
  let allTasks = document.querySelectorAll("li");
  allTasks.forEach(function (task) {
    task.remove();
  });

  tasks.forEach(function (task) {
    let newName = task.name;
    let newTask = document.createElement("li");
    let newInput = document.createElement("input");
    let newLabel = document.createElement("label");
    let newButton = document.createElement("button");

    newLabel.textContent = newName;
    newInput.setAttribute("type", "checkbox");
    newButton.classList.add("lnr");
    newButton.classList.add("lnr-cross");
    // newButton.setAttribute("type", "button");

    newTask.appendChild(newInput);
    newTask.appendChild(newLabel);
    newTask.appendChild(newButton);

    const taskList = chooseListRender(task.priority);
    console.log(taskList);

    taskList.appendChild(newTask);
    newButton.addEventListener("click", removeTask);
  });
}

function addToStorage(event, name, status) {
  let priority = choosePriority(event) === "#new-task-high" ? "high" : "low";
  console.log(priority);
  console.log(event);
  tasks.push({ name, status, priority });
}

function addTask(event, status = STATUS.TODO) {
  event.preventDefault();
  let inputValue = document.querySelector(choosePriority(event)).value;
  event.target.reset();
  addToStorage(event, inputValue, status);
  render(event);
}

function deleteFromStorage(name) {
  let index = tasks.findIndex(function (item) {
    return item.name === name;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function removeTask(event) {
  deleteFromStorage(event.target.previousElementSibling.textContent);

  event.target.removeEventListener("click", removeTask);

  render(event);
}

// function changeStatus(event) {
//   let status;
// }

let highForm = document.querySelector("#high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.querySelector("#low-form");

lowForm.addEventListener("submit", addTask);

// let buttonsAfterRender = document.querySelectorAll('button[type="button"]');
// buttonsAfterRender.forEach(function (button) {
//   button.addEventListener("click", removeTask);
// });
