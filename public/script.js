document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function fetchTodos() {
        fetch('/api/todos')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => {
                    const li = createTodoElement(todo);
                    todoList.appendChild(li);
                });
            });
    }

    function createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => updateTodo(todo.id, checkbox.checked));

        const span = document.createElement('span');
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    function addTodo(text) {
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
            .then(response => response.json())
            .then(() => {
                todoInput.value = '';
                fetchTodos();
            });
    }

    function updateTodo(id, completed) {
        fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        })
            .then(() => fetchTodos());
    }

    function deleteTodo(id) {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchTodos());
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    fetchTodos();
});