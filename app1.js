const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clrtasks);

  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    li.className = 'collection-item';
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);
    taskList.appendChild(li);
    
  })

}

function addTask(e) {
  if (taskInput.value == '') {
    alert('Please, insert a task first.')
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML= "<i class='fa fa-remove'></i>";
    li.appendChild(link);
    console.log(li);
    taskList.appendChild(li);
    storeTaskInLS(taskInput.value);
    taskInput.value = '';
    
    e.preventDefault();
  }

  e.preventDefault();
}

function storeTaskInLS(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
  e.target.parentElement.parentElement.remove();
  deleteFromLS(e.target.parentElement.parentElement);
  console.log(e.target.parentElement);
    e.preventDefault();
  }
}

function deleteFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clrtasks(e) {
  // if(e.target.classList.contains('clear-tasks')){
  //   taskList.innerHTML = '';
  //   e.preventDefault();
  //   console.log(e.target);
  // }
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clrLS();
}

function clrLS() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase(); 
  
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

