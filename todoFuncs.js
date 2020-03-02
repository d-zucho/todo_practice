/**  --  Get Saved Todos / Check if Available  --  */
const getSavedTodos = function() {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    todos = JSON.parse(todosJSON);
  }
};

/**  --  Save Todos  --   */
const saveTodos = function(todos) {
  // save new data changes to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
};

/**  --  Delete todo  --  */
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// /**  --  Render Todo DOM  --   */
// const renderTodos = function(todos, filters) {
//   const filteredTodos = todos.filter(function(todo) {
//     todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
//   });

//   const incompleteTodos = filteredTodos.filter(function(todo) {
//     return !todo.completed;
//   });

//   generateSummaryDOM(incompleteTodos);

//   generateTodoDom(filteredTodos);
// };
/** --  Post individual Todos */
const generateTodoDom = function(filteredTodos) {
  filteredTodos.forEach(todo => {
    const todoDiv = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");

    // set input attribute checkbox
    checkbox.setAttribute("type", "checkbox");
    todoDiv.appendChild(checkbox);

    // assign text
    todoText.textContent = todo.text;
    todoDiv.appendChild(todoText);

    // create delete event handler
    deleteButton.textContent = " x ";
    todoDiv.appendChild(deleteButton);
    document.querySelector("#todos").appendChild(todoDiv);

    deleteButton.addEventListener("click", function() {
      removeTodo(todo.id);
      saveTodos(todos);
      renderTodos(todos, filters);
    });
  });
};

/**  --  Generate Summary DOM  -- */
const generateSummaryDOM = function(incompleteTodos) {
  document.querySelector("#summary").innerHTML = "";

  const summary = document.createElement("h3");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#summary").appendChild(summary);
};

/**  --  Render Todo DOM  --   */
const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  generateSummaryDOM(incompleteTodos);

  generateTodoDom(filteredTodos);
};
