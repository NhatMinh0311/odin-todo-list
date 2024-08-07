import {getProjects, getActiveProject, changeActiveProject, removeProject, removeTodo}from "./data"

const sideBarContent = document.querySelector("#sidebar-content")
const projectContent = document.querySelector("#project-content")
function renderSideBar() {
    // Display projects 
    displayProjectsName(getProjects())
}

function displayProjectsName(projects) {
    sideBarContent.innerHTML = ""
    for (const [key, value] of Object.entries(projects)) {
        const item = document.createElement("div")
        item.classList.add("items-sidebar")

        const projectName = document.createElement("div")
        projectName.textContent = key
        projectName.addEventListener("click", () => {
            changeActiveProject(key)
            displayTodos()
        })

        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 24px"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
        `
        deleteBtn.onclick = () => {
            removeProject(key)
            renderSideBar()
            displayTodos()
        }
        item.append(projectName, deleteBtn)
        sideBarContent.appendChild(item)
    }
}

function displayTodos() {
    projectContent.innerHTML = ""
    let activeProjectName = getActiveProject()
    if (activeProjectName === "undefined") return
    let activeProject = getProjects()[activeProjectName]
    let index = 0

    displayCurrentProjectName()
    
    activeProject.todos.forEach(element => {
        const todo = document.createElement("div")
        todo.classList.add("todos")
        todo.setAttribute("id", `${index}`)
        switch (element.priority) {
            case "none":
                todo.classList.add("none-prior")
                break
            case "low":
                todo.classList.add("low-prior")
                break
            case "medium":
                todo.classList.add("medium-prior")
                break
            case "high":
                todo.classList.add("high-prior")
                break
        }

        const markCompleteBtn = document.createElement("button")
        markCompleteBtn.onclick = () => {
            addCheckSign(markCompleteBtn)
            blurToHide(todo, 1)
            removeTodo(todo.getAttribute("id"))
            setTimeout(displayTodos, 2000)
        }
        const titlePara = document.createElement("p")
        titlePara.textContent = element.title

        const dueDateDiv = document.createElement("p")
        dueDateDiv.textContent = element.dueDate

        const detailBtn = document.createElement("button")
        detailBtn.classList.add("detail-btn")
        detailBtn.textContent = "Details"
        detailBtn.onclick = () => {
            displayTodoDetails(element)
        }
        todo.append( markCompleteBtn, titlePara, dueDateDiv, detailBtn)
        projectContent.appendChild(todo)

        index++
    });
}

function displayTodoDetails(todo) {
    const detailsCard = document.querySelector("#todo-details")
    detailsCard.innerHTML = ""

    const closeBtn = document.createElement("button")
    closeBtn.textContent = "X"
    closeBtn.onclick = () => detailsCard.close()
    closeBtn.classList.add("cancel-btn")

    const titlePara = document.createElement("p")
    titlePara.textContent = todo.title

    const descriptionPara = document.createElement("p")
    descriptionPara.textContent = todo.description

    const dueDateDiv = document.createElement("p")
    dueDateDiv.textContent = todo.dueDate

    const priorityPara = document.createElement("p")
    priorityPara.textContent = todo.priority

    detailsCard.append(closeBtn, titlePara, descriptionPara, dueDateDiv, priorityPara)
    detailsCard.showModal()
}

function displayCurrentProjectName() {
    const contentHeader = document.querySelector("#content-header")
    contentHeader.innerHTML = ""
    const projectHeader = document.createElement("h1")
    projectHeader.innerText = getActiveProject()
    contentHeader.appendChild(projectHeader)
}
function addCheckSign(button) {
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg>
    `
}

function blurToHide(item, secs){
    const MILLISECONDSPERSECOND = 1000
    item.style.opacity = 1
    for (let i = 1; i <= 10; i++) {
        setTimeout(() => reduceOpacity(item), secs * MILLISECONDSPERSECOND / 10 * i)
    }
}

function reduceOpacity(item) {
    item.style.opacity -= 0.1
}

export {
    renderSideBar,
    displayTodos
}