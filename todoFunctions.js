/**  -- Generate Individual Todos  --  */
const generateTodoDOM = function(filteredTodos) {
  filteredTodos.forEach(todo => {
    const todoEl = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("span");
    const removeButton = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    todoEl.appendChild(checkbox);

    todoText.textContent = todo.text;
    todoEl.appendChild(todoText);

    removeButton.textContent = " x ";
    todoEl.appendChild(removeButton);

    document.querySelector("#todos").appendChild(todoEl);
  });
};

/**  --  Save Todos  --  */
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};
