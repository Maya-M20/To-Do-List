const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = 'css/styles.css';
document.head.append(stylesheet);

const app = document.createElement('main');
app.className = 'app';

const title = document.createElement('h1');
title.textContent = 'My To-Do List';

const form = document.createElement('form');
const input1 = document.createElement('input');
input1.type = 'text';
input1.name = 'taskname';
input1.placeholder = 'Task name';

const input2 = document.createElement('input');
input2.type = 'date';
input2.name = 'date';

const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Create task';

form.appendChild(input1);
form.appendChild(input2);
form.appendChild(button);

const taskList = document.createElement('ul');
taskList.className = 'task-list';

app.append(title, taskList, form);
document.body.append(app);