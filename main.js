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
    if (task.status === "done") {
      newInput.checked = "true";
    }
    newButton.classList.add("lnr");
    newButton.classList.add("lnr-cross");

    newTask.appendChild(newInput);
    newTask.appendChild(newLabel);
    newTask.appendChild(newButton);

    const taskList = chooseListRender(task.priority);

    taskList.appendChild(newTask);
    newInput.addEventListener("click", changeStatus);
    newButton.addEventListener("click", removeTask);
  });
  console.log("Render just happened.");
}

function addToStorage(event, name, status) {
  let priority = choosePriority(event) === "#new-task-high" ? "high" : "low";
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

function changeStatus(event) {
  let index = tasks.findIndex(function (item) {
    return item.name === event.target.nextElementSibling.textContent;
  });

  if (index !== -1 && tasks[index].status === "to do") {
    tasks[index].status = "done";
  } else {
    tasks[index].status = "to do";
  }
  render(event);
}

let highForm = document.querySelector("#high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.querySelector("#low-form");

lowForm.addEventListener("submit", addTask);
