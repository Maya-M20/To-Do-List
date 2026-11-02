const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = 'css/styles.css';
document.head.append(stylesheet);

const app = document.createElement('main');
app.className = 'app';

const title = document.createElement('h1');
title.textContent = 'My To-Do List';

const form = document.createElement('form');
form.className = 'task-form';
const label1 = document.createElement('label');
label1.textContent = 'Task name';

const input1 = document.createElement('input');
input1.type = 'text';
input1.name = 'taskname';
input1.placeholder = 'Task name';

const input2 = document.createElement('input');
input2.type = 'date';
input2.name = 'date';   
const label2 = document.createElement('label');
label2.textContent = 'Due date';

const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Create task';

form.appendChild(label1);
form.appendChild(input1);
form.appendChild(label2);
form.appendChild(input2);
form.appendChild(button);

const taskList = document.createElement('ul');
taskList.className = 'task-list';

let currentFilter = 'all';

const allTaskButton = document.createElement('button');
allTaskButton.textContent = 'All tasks';
allTaskButton.type = 'button';

const completedTasksButton = document.createElement('button');
completedTasksButton.textContent = 'Completed tasks';
completedTasksButton.type = 'button';

const uncompletedTasksButton = document.createElement('button');
uncompletedTasksButton.textContent = 'Uncompleted tasks';
uncompletedTasksButton.type = 'button';

allTaskButton.addEventListener('click', function() {
    currentFilter = 'all';
    renderTasks();
});

completedTasksButton.addEventListener('click', function() {
    currentFilter = 'completed';
    renderTasks();
});

uncompletedTasksButton.addEventListener('click', function() {
    currentFilter = 'uncompleted';
    renderTasks();
});


app.append(title, taskList, form, allTaskButton, completedTasksButton, uncompletedTasksButton);
document.body.append(app);

let tasks = [];
function addTask(title, date){
    const task = {
        id: Date.now(),
        title: title,
        date: date,
        completed: false
    };

    tasks.push(task);
};

function renderTasks() {
    taskList.replaceChildren();

    tasks.sort(function(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    let filteredTasks = tasks;

    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    if (currentFilter === 'uncompleted') {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }

    filteredTasks.forEach(function(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        if (task.completed) {
            taskItem.style.border = '2px solid #48cf73';
            taskItem.style.opacity = '0.7'; 
        } else {
            taskItem.style.border = '2px solid #ccc'; 
            taskItem.style.opacity = '1';
        }

        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;

        const taskDate = document.createElement('time');
        taskDate.textContent = task.date;
        taskDate.dateTime = task.date;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';

        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
            renderTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.type = 'button';

        editButton.addEventListener('click', function() {
            const modalBackground = document.createElement('div');
            modalBackground.classList.add('modalBackground');

            const editForm = document.createElement('form');
            editForm.classList.add('editForm');

            const modalTitle = document.createElement('h2');
            modalTitle.classList.add('modalTitle');
            modalTitle.textContent = 'Редактирование данных'; 

            const taskName = document.createElement('h4');
            taskName.classList.add('taskName');
            taskName.textContent = task.title;

            const inputNewName = document.createElement('input');
            inputNewName.type = 'text';
            inputNewName.name = 'newTaskName';
            inputNewName.placeholder = 'New task name';
            const labelNewName = document.createElement('label');
            inputNewName.value = task.title;

            labelNewName.textContent = 'Task new name';

            const inputNewDate = document.createElement('input');
            inputNewDate.type = 'date';
            inputNewDate.name = 'newDate';   
            const labelNewDate = document.createElement('label');
            inputNewDate.value = task.date;

            labelNewDate.textContent = 'Due date';

            const saveChangesButton = document.createElement('button');
            saveChangesButton.textContent = 'Save';
            saveChangesButton.type = 'button';

            saveChangesButton.addEventListener('click', function() {
                let newTitle = inputNewName.value.trim();
                let newDate = inputNewDate.value;

                if (! newTitle) {
                    newTitle = task.title
                }

                if (! newDate) {
                    newDate = task.date
                }

                editTask(task.id, newTitle, newDate);

                modalBackground.remove();
                renderTasks();
            });

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Cancel';
            closeButton.type = 'button';

            closeButton.addEventListener('click', function() {
                modalBackground.remove();
            });

            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
            });

            editForm.append(
            modalTitle,
            taskName,
            labelNewName,
            inputNewName,
            labelNewDate,
            inputNewDate,
            saveChangesButton,
            closeButton
            );

            modalBackground.appendChild(editForm);
            document.body.appendChild(modalBackground);
        });

        const taskStatusButton = document.createElement('button');
        taskStatusButton.type = 'button';

        if (task.completed) {
            taskStatusButton.textContent = 'Undone';
            taskStatusButton.addEventListener('click', function() {
                undoTask(task.id);
                renderTasks();     
            });
        } 
        else {
            taskStatusButton.textContent = 'Done';
            taskStatusButton.addEventListener('click', function() {
                doTask(task.id);   

                renderTasks();     
            });
        }
        taskItem.append(taskTitle, taskDate, deleteButton, editButton, taskStatusButton);
        taskList.append(taskItem);
    });
};

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = input1.value.trim();
    const date = input2.value;

    if (title === '' || date === '') {
        return;
    }

    addTask(title, date);
    renderTasks();

    form.reset();
});


function deleteTask(taskId){
    const index = tasks.findIndex(function(task) {
        return task.id === taskId;
    });
    tasks.splice(index, 1)
}

function editTask(taskId, newName, newDate) {
    const index = tasks.findIndex(function(task) {
        return task.id === taskId;
    });

    const task = tasks[index];
    
    task.title = newName
    task.date = newDate;
}

function doTask(taskId) {
    const index = tasks.findIndex(function(task) {
        return task.id === taskId;
    });

    const task = tasks[index];
    task.completed = true;
}

function undoTask(taskId) {
        const index = tasks.findIndex(function(task) {
        return task.id === taskId;
    });

    const task = tasks[index];
    task.completed = false;
}
