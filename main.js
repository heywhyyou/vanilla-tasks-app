import data from "./tasks.json" assert { type: "json" };

const STATUS = {
  TODO: "to do",
  DONE: "done",
};

const PRIORITY = {
  LOW: "low",
  HIGH: "high",
};

const tasks = new Array();

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

const render = (event) => {
  let allTasks = document.querySelectorAll("li");
  allTasks.forEach((task) => {
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
};

function Task(event, name, status) {
  this.name = name;
  this.status = status;
  this.priority = choosePriority(event) === "#new-task-high" ? "high" : "low";
  tasks.push(this);
}

const checkName = (array, searchString) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === searchString) {
      return true;
    }
  }
  return false;
};

const checkLengthValidity = (inputValue) => {
  return inputValue.length < 3 || inputValue.length > 50;
};

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const addTask = (event, status = STATUS.TODO) => {
  event.preventDefault();

  try {
    let inputValue = document.querySelector(choosePriority(event)).value;

    if (checkLengthValidity(inputValue)) {
      throw new ValidationError("имя задачи должно быть от 3 до 50 символов.");
    }

    if (checkName(tasks, inputValue)) {
      throw new ValidationError(
        "такое имя задачи уже существует, выберите другое."
      );
    }

    event.target.reset();
    new Task(event, inputValue, status);
    render(event);
  } catch (error) {
    alert(error);
  }
};

const deleteFromStorage = (name) => {
  let index = tasks.findIndex(function (item) {
    return item.name === name;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
  }
};

const removeTask = (event) => {
  deleteFromStorage(event.target.previousElementSibling.textContent);

  event.target.removeEventListener("click", removeTask);

  render(event);
};

const changeStatus = (event) => {
  let index = tasks.findIndex(function (item) {
    return item.name === event.target.nextElementSibling.textContent;
  });

  if (index !== -1 && tasks[index].status === "to do") {
    tasks[index].status = "done";
  } else {
    tasks[index].status = "to do";
  }
  render(event);
};

let highForm = document.querySelector("#high-form");

highForm.addEventListener("submit", addTask);

let lowForm = document.querySelector("#low-form");

lowForm.addEventListener("submit", addTask);

data.tasks.forEach((task) => {
  tasks.push(task);
});

render();
