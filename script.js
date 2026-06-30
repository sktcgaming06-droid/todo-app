// Get the input and list elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from browser storage when page loads
window.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask() {
    // Get what user typed
    const taskText = taskInput.value.trim();
    
    // Check if input is empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new task item
    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    
    // Add to list on screen
    taskList.appendChild(li);
    
    // Clear input box
    taskInput.value = '';
    
    // Save to browser storage
    saveTasks();
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// Function to mark task as done
function toggleComplete(span) {
    span.classList.toggle('completed');
    saveTasks();
}

// Function to save tasks to browser storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('span').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from browser storage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            const li = document.createElement('li');
            const completedClass = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span class="${completedClass}" onclick="toggleComplete(this)">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
}

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});