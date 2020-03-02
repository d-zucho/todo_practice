let todos = [];

const filters = {
  completed: "",
  searchText: ""
};

/**  --  Check for existing todo data  --   */

getSavedTodos();

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

  // update 'todos' in localStorage
  saveTodos(todos);

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
