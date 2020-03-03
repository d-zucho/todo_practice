let todos = [
  {
    id: uuidv4(),
    text: "Testing1",
    completed: false
  }
];

const filters = {
  searchText: ""
};

const todosJSON = localStorage.getItem("todos");

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}

const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = todos.filter(function(todo) {
    return !todo.completed;
  });

  generateTodoDOM(filteredTodos);
};

renderTodos(todos, filters);

/**  -- Add Todos  --  */
document.querySelector("#todoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  todos.push({
    id: uuidv4(),
    text: e.target.elements.newTodoText.value,
    completed: false
  });

  e.target.elements.newTodoText.value = "";

  document.querySelector("#todos").innerHTML = "";

  saveTodos(todos);

  renderTodos(todos, filters);
});

/**  -- Assign fiterText to user input  --  */
document.querySelector("#filterText").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  console.log(filters.searchText);
  document.querySelector("#todos").innerHTML = "";

  renderTodos(todos, filters);
});
