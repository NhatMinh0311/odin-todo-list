import Project from "./projects"
import Todos from "./todos"
import { renderSideBar, displayTodos } from "./DOMController"
import { format } from 'date-fns'

function initLocalStorage() {
    if (getProjects() === null) {
        localStorage.setItem("projects", JSON.stringify({"Today": new Project()}))
        localStorage.setItem("activeProject", "Today")
    }
}

function getProjects() {
    return JSON.parse(localStorage.getItem("projects"))
}

function getActiveProject() {
    return localStorage.getItem("activeProject")
}

function addMethods(localStorageData){
    let userProjects = {}
    for (const [projectName, project] of Object.entries(localStorageData)) {
        userProjects[projectName] = new Project()
        project.todos.forEach(element => {
            userProjects[projectName].addTodo(new Todos(element.title, element.description, element.dueDate, element.priority))
        });
    }
    return userProjects
}

function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects))
}

function processProjectInput() {
    const newProjectName = document.querySelector("#project").value
    if (checkProjectName(newProjectName)) {
        insertProject(newProjectName)
        localStorage.setItem("activeProject", newProjectName)
        displayTodos()
    }
    else {
        alert("New project is invalid")
    }
}
function insertProject(newProjectName) {
    let projects = getProjects();
    projects[newProjectName] = new Project()
    saveProjects(projects)
    renderSideBar()
}

function checkProjectName(newProjectName) {
    if (newProjectName === "") return false
    let projects = getProjects()
    return !(newProjectName in projects)
}


function insertTodo() {
    if (getActiveProject() === "undefined") {
        alert("No project to add todo")
        return
    }
    const title = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const dueDate = format(document.querySelector("#duedate").value, "HH:mm dd/MM/yyyy")
    const priority = document.querySelector("#priority").value

    const newTodo = new Todos(title, description, dueDate, priority)

    const userProjects = addMethods(getProjects())
    userProjects[localStorage.getItem("activeProject")].addTodo(newTodo)

    saveProjects(userProjects)
    displayTodos()
}

function changeActiveProject(newActiveProject) {
    localStorage.setItem("activeProject", newActiveProject)
}

function getFirstProjectName() {
    return Object.keys(getProjects())[0]
}
function removeProject(projectName) {
    let userProjects  = getProjects()
    delete userProjects[projectName]
    saveProjects(userProjects)
    if (projectName === getActiveProject()) {
        changeActiveProject(getFirstProjectName())
    }
}

function removeTodo(index) {
    let userProjects = getProjects()
    userProjects[getActiveProject()].todos.splice(index, 1)
    saveProjects(userProjects)
}

export {
    initLocalStorage,
    getProjects,
    getActiveProject,
    processProjectInput,
    insertTodo,
    changeActiveProject,
    removeProject,
    removeTodo
}