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

app.append(title, taskList, form);
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

    tasks.forEach(function(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

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

        taskItem.append(taskTitle, taskDate, deleteButton, editButton);
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
