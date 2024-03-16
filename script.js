import "./utils/bling";

// todo app function
function todoAppFunc() {
  // state
  let state = { id: 0, uncompletedTasks: [], completedTasked: [] };
  console.log(state);
  // ui
  let ui = {};
  console.log(ui);

  // elements to be rendered on the DOM
  return makeElem("main", {className: "flex justify-center items-center min-h-svh w-full"  }, [
    makeElem("section", {className: "flex flex-col h-96 w-2/5 p-10 gap-10 rounded bg-b-secondary" }, [
      (ui.form = makeElem("form", { className: "to-do-form flex justify-between w-full"  }, [
        (ui.input = makeElem("input", {
          className: "input-task",
          placeholder: "Add a new task",
          name: "new-task",
          id: "new-task",
        })),
        makeElem(
          "button",
          { type: "submit", className: "submit-btn", onclick: add },
          ["+"]
        ),
      ])),
      makeElem("div", { className: "tasks-to-do" }, [
        makeElem('h2', {className: "text-white mb-1"}, [`Tasks to do - $`]),
        (ui.uncompletedTasks = makeElem("ul", { id: "uncompletedTasks", className: "flex flex-col gap-2" }, [])),
      ]),
      makeElem("div", {className: 'completed-tasks-div'}, [
        makeElem('h2', {className: "text-white mb-1"}, [`Done - $`]),
        (ui.completedTasks = makeElem("ul", { id: "completed-tasks", className: "flex flex-col gap-2" }, [])),
      ]),
    ]),
  ]);

  // create new task func
  function createTodo(todo) {
    let item, text;

    item = makeElem("li", { className: "todo-item flex w-full h-12 px-4 bg-b-primary items-center justify-between rounded text-clr-primary" }, [
      (text = makeElem("span", {}, [todo.text])),
      makeElem("span", { className: "todo-action-container flex gap-6" }, [
        makeElem("img", {
          src: "assets/icons/check-icon.svg",
          alt: "check icon",
        }),
        makeElem("img", {
          src: "assets/icons/delete-icon.svg",
          alt: "delete icon",
        }),
      ]),
    ]);

    return item;
  }

  // function to add new task by crabbing the newly inputed value
  function add(e) {
    e.preventDefault();

    const text = ui?.input.value;

    if (!text) return;

    let todo = { text, completed: false, id: Date.now() };
    console.log(todo);

    ui.input.value = "";

    if (todo.completed === "true") {
      state.completedTasked.push(todo);
    } else {
      state.uncompletedTasks.push(todo);
    }
    console.log(state.uncompletedTasks);

    ui?.uncompletedTasks.prepend(createTodo(todo));
    ui?.completedTasks.prepend(createTodo(todo));
  }
}

// render to the DOM
(function render() {
  document.body.prepend(todoAppFunc());
})();
