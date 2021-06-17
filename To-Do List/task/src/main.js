document.getElementById("add-task-button")
    .addEventListener("click", function () {
        let taskList = document.getElementById("task-list");
        let newTaskName = document.getElementById("input-task").value;

        let li = document.createElement("li");
        li.innerHTML = getLiInnerHtml(newTaskName, false);
        taskList.appendChild(li);

        let tasks = loadTasks();
        let task = {
            name: newTaskName,
            checked: false
        }
        tasks.push(task);
        storeTasks(tasks);
    }
);

function getLiInnerHtml(taskName, checked) {
    let text = "";
    if (checked === true) {
        text += '   <input type="checkbox" onclick="changeText(this, \'' + taskName.trim() + '\');" checked=' + checked + '>';
    } else {
        text += '   <input type="checkbox" onclick="changeText(this, \'' + taskName.trim() + '\');">';
    }
    return text +
    '   <span class="task">' + taskName  + '</span>' +
    '   <button class="delete-btn" onClick="removeTask(this, \'' + taskName.trim() + '\')">+</button>';
}

function removeTask(deleteBtn, taskName) {
    let tasks = loadTasks();
    tasks = tasks.filter(function (value, index, arr) {
        return value.name !== taskName;
    });
    storeTasks(tasks);
    deleteBtn.parentNode.remove();
}

function changeText(checkBoxObj, taskName) {
    let tasks = loadTasks();
    for (const task of tasks) {
        if (task.name === taskName) {
            task.checked = checkBoxObj.checked;
        }
    }
    storeTasks(tasks);
    if (checkBoxObj.checked) {
        checkBoxObj.parentNode.getElementsByTagName("span")[0].classList.add("line-through-task");
    } else {
        checkBoxObj.parentNode.getElementsByTagName("span")[0].classList.remove("line-through-task");
    }
}

function storeTasks(taskList) {
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function initializeTasks() {
    let tasks = loadTasks();
    let taskListUl = document.getElementById("task-list");

    for (let i = 0; i < tasks.length; i++) {
        let name = tasks[i].name;
        let li = document.createElement("li");
        li.innerHTML = getLiInnerHtml(name, tasks[i].checked);
        taskListUl.appendChild(li);
    }
}