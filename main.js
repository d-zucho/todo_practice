let todos = [
  {
    text: "testing",
    completed: false
  }
];

let filters = {
  searchText: ""
};

localStorage.getItem("todos");

const renderTodos = function(todos, filters) {
  let incompleteTodos = todos.filter(function(todo) {
    return !todo.completed;
  });

  todos.forEach(todo => {
    const todoDiv = document.createElement("div");

    // create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    // create span for text
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = " x ";

    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(todoText);
    todoDiv.appendChild(deleteButton);

    document.querySelector("#todos").appendChild(todoDiv);
  });
};

renderTodos(todos, filters);

// Add a new Todo
document.querySelector("#todoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (e.target.elements.newTodoText.value.length !== 0) {
    todos.push({
      id: uuidv4(),
      text: e.target.elements.newTodoText.value,
      completed: false
    });
  }

  e.target.elements.newTodoText.value = "";
  document.querySelector("#todos").innerHTML = "";
  renderTodos(todos, filters);
});
