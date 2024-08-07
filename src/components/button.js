import { processProjectInput, insertTodo } from "./data"

const projectDialog = document.querySelector("#project-dialog")
const todoDialog = document.querySelector("#todo-dialog")
const projectForm = document.querySelector("#project-form")
const todoForm = document.querySelector("#todo-form")
export default function initButtons() {
    const newProject = document.querySelector("#new-project")
    newProject.addEventListener("click", () => {
        projectDialog.showModal()
        const todoForm = document.querySelector("#todo-form")
    })

    const submitProjectForm = document.querySelector("#project-form > button")
    submitProjectForm.addEventListener("click", (event) => {
        event.preventDefault()
        processProjectInput()
        closeDialog(projectDialog)
        resetForm(projectForm)
    })

    const cancelProjectForm = document.querySelector("#project-dialog> button")
    cancelProjectForm.addEventListener("click", () => {
        closeDialog(projectDialog)
        resetForm(projectForm)
    })

    const newTodo = document.querySelector("#new-todo") 
    newTodo.addEventListener("click", () => {
        todoDialog.showModal()
    })

    const submitTodoForm = document.querySelector("#todo-form > button")
    submitTodoForm.addEventListener("click", (event) => {
        event.preventDefault()
        insertTodo()
        closeDialog(todoDialog)
        resetForm(todoForm)
    })

    const cancelTodoForm = document.querySelector("#todo-dialog > button")
    cancelTodoForm.addEventListener("click", () => {
        closeDialog(todoDialog)
        resetForm(todoForm)
    })
}

function closeDialog(dialog) {
    dialog.close()
} 

function resetForm(form) {
    form.reset()
}


