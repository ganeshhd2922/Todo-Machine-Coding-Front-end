let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("newTask");
  const title = input.value.trim();
  if (title === "") return;
  tasks.push({ title, completed: false, created: Date.now() });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function sortTasks(list) {
  const sortBy = document.getElementById("sortBy").value;
  if (sortBy === "created") {
    return list.sort((a, b) => a.created - b.created);
  } else if (sortBy === "alpha") {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "status") {
    return list.sort((a, b) => a.completed - b.completed);
  }
  return list;
}

function renderTasks() {
  let filtered = [...tasks];
  if (currentFilter === "completed") {
    filtered = filtered.filter(task => task.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(task => !task.completed);
  }

  const sorted = sortTasks(filtered);
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  sorted.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-item";

    const title = document.createElement("span");
    title.textContent = task.title;
    if (task.completed) title.classList.add("completed");
    title.onclick = () => toggleTask(index);

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => deleteTask(index);

    div.appendChild(title);
    div.appendChild(del);

    list.appendChild(div);
  });
}

renderTasks();
