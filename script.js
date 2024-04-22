// Función para agregar una tarea
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.textContent = taskText;
        li.addEventListener('click', toggleTask); // Usar addEventListener es una práctica más moderna

        // Botón para eliminar la tarea
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask() {
    this.classList.toggle('completed');
    saveTasks();
}

// Función para guardar las tareas en el almacenamiento local del navegador
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(task => ({
        text: task.textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas desde el almacenamiento local del navegador
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar la lista antes de cargar las tareas
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', toggleTask); // Usar addEventListener es una práctica más moderna

        // Botón para eliminar la tarea
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Cargar las tareas al cargar la página
window.onload = function() {
    loadTasks();
    document.getElementById('addTaskButton').addEventListener('click', addTask);
};
