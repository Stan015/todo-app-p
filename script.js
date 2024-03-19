import "./utils/bling";

// todo app function
function todoAppFunc() {
  // state
  let state = { tasks: [] };

  // ui
  let ui = {};

  // elements to be rendered on the DOM
  return makeElem(
    "main",
    { className: "flex justify-center items-center min-h-svh w-full" },
    [
      makeElem(
        "section",
        {
          className:
            "flex flex-col w-2/5 max-lg:w-3/4 max-sm:w-4/5 p-10 gap-10 rounded bg-b-secondary",
        },
        [
          (ui.form = makeElem(
            "form",
            {
              className:
                "to-do-form flex justify-between w-full gap-2 items-center",
            },
            [
              (ui.input = makeElem("input", {
                className:
                  "input-task bg-b-secondary w-4/5 rounded text-white border border-clr-primary p-2 placeholder:text-gray-500 placeholder:text-sm hover:border-clr-primary active:border-clr-primary focus:outline-none",
                placeholder: "Add a new task",
                name: "new-task",
                id: "new-task",
              })),
              makeElem(
                "button",
                {
                  type: "submit",
                  className:
                    "submit-btn bg-clr-primary w-10 h-10 border border-clr-primary rounded text-white text-xl",
                  onclick: add,
                },
                ["+"]
              ),
            ]
          )),
          makeElem("div", { className: "tasks-to-do" }, [
            makeElem("h2", { className: "text-white mb-1 text-lg" }, [
              `Tasks to do - $`,
            ]),
            (ui.uncompletedTasks = makeElem(
              "ul",
              {
                id: "uncompletedTasks",
                className:
                  "flex flex-col max-h-75 min-h-68 overflow-y-scroll hide-scrollbar",
              },
              []
            )),
          ]),
          makeElem("div", { className: "completed-tasks-div" }, [
            makeElem("h2", { className: "text-white mb-4 text-lg" }, [
              `Done - $`,
            ]),
            (ui.completedTasks = makeElem(
              "ul",
              {
                id: "completed-tasks",
                className:
                  "flex flex-col gap-5 max-h-24 min-h-20 overflow-y-scroll hide-scrollbar",
              },
              []
            )),
          ]),
        ]
      ),
    ]
  );

  // create new task func
  function createTodo(todo) {
    let item, text;

    item = makeElem(
      "li",
      {
        id: `${todo.id}`,
        className:
          "todo-item flex w-full mt-5 mb-3 min-h-max p-4 bg-b-primary items-center justify-between rounded text-clr-primary relative",
      },
      [
        (text = makeElem("span", { className: "text-base w-4/5" }, [
          todo.text,
        ])),
        makeElem("span", { className: "todo-action-container flex gap-6" }, [
          makeElem(
            "button",
            {
              className: "check-icon",
              type: "button",
              "aria-labelledby": "mark to-do as completed",
              onclick: checkTaskAsCompleted,
              once: true,
            },
            [
              makeElem("img", {
                src: "assets/icons/check-icon.svg",
                alt: "check icon",
              }),
            ]
          ),
          makeElem(
            "button",
            {
              className: "delete-icon",
              type: "button",
              "aria-labelledby": "delete to-do",
              onclick: deleteTask,
            },
            [
              makeElem("img", {
                src: "assets/icons/delete-icon.svg",
                alt: "delete icon",
              }),
            ]
          ),
        ]),
        makeElem(
          "p",
          {
            className:
              "time-added flex absolute gap-1 text-xs -top-4 px-4 right-0 py-2 bg-b-primary rounded-t shrink-0",
          },
          [
            makeElem(
              "img",
              { src: "assets/icons/date-time-icon.svg", alt: "date-time icon" },
              []
            ),
            getCurrentDateTime(),
          ]
        ),
      ]
    );

    // console.log(state);

    return item;
  }

  // move task to completed div
  function completedTodo(todo) {
    let item, text;

    item = makeElem(
      "li",
      {
        className:
          "todo-item flex w-full min-h-max p-4 bg-b-primary items-center justify-between rounded text-clr-secondary italic",
      },
      [
        (text = makeElem(
          "span",
          { className: "text-base line-through w-9/12 h-max" },
          [todo.text]
        )),
        makeElem(
          "p",
          {
            className:
              "time-added flex gap-1 text-xs -top-4 px-4 right-0 py-2 bg-b-primary rounded-t shrink-0 max-sm:shrink",
          },
          [
            makeElem(
              "img",
              { src: "assets/icons/date-time-icon.svg", alt: "date-time icon" },
              []
            ),
            getCurrentDateTime(),
          ]
        ),
      ]
    );

    // console.log(state);

    return item;
  }

  // function to add new task by crabbing the newly inputed value
  function add(e) {
    e.preventDefault();

    const text = ui?.input.value;

    if (!text) return;

    let todo = {
      text,
      completed: false,
      deleted: false,
      id: Date.now(),
      timeAdded: getCurrentDateTime(),
      timedCompleted: "",
      timeDeleted: "",
    };

    ui.input.value = "";

    state.tasks.push(todo);
    ui?.uncompletedTasks.prepend(createTodo(todo));
  }

  function checkTaskAsCompleted(e) {
    e.preventDefault();
    // const checkBtn = $('.check-icon');
    const checkedTask = this.parentElement.parentElement;
    const checkedTaskId = checkedTask.getAttribute("id");

    for (let task of state.tasks) {
      if (task.id == checkedTaskId) {
        task.completed = "true";
        task.timedCompleted = `${getCurrentDateTime()}`;
        checkedTask.remove();
        ui?.completedTasks.prepend(completedTodo(task));
      }
    }
  }

  function deleteTask(e) {
    e.preventDefault();
    // const deleteBtn = $('.delete-icon');
    const taskToDelete = this.parentElement.parentElement;
    const taskToDeleteId = taskToDelete.getAttribute("id");

    for (let task of state.tasks) {
      if (task.id == taskToDeleteId) {
        task.deleted = "true";
        task.timeDeleted = `${getCurrentDateTime()}`;
        taskToDelete.remove();
      }
    }
    // console.log(state);
  }

  // get date-time in the format: hh/mm dd/mm/yyyy
  function getCurrentDateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }
}

// // render to the DOM
(function render() {
  document.body.prepend(todoAppFunc());
})();
