let todos = [
  // {
  //   id: uuidv4(),
  //   text: "testing",
  //   completed: false
  // }
];

const filters = {
  searchText: ""
};

/**  --  Check for existing todo data  --   */

const todosJSON = localStorage.getItem("todos");

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}

const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector("#summary").innerHTML = "";

  const summary = document.createElement("h3");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#summary").appendChild(summary);

  filteredTodos.forEach(todo => {
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

/**  --  Add a new Todo  --   */
document.querySelector("#todoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (e.target.elements.newTodoText.value.length !== 0) {
    todos.push({
      id: uuidv4(),
      text: e.target.elements.newTodoText.value,
      completed: false
    });
  }

  // save new data changes to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  e.target.elements.newTodoText.value = "";
  document.querySelector("#todos").innerHTML = "";
  renderTodos(todos, filters);
});

/**  --  Assign input to filtertext to filters */
document.querySelector("#filterText").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  document.querySelector("#todos").innerHTML = "";
  renderTodos(todos, filters);
});
