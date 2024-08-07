export default class Project {
    todos = []
    addTodo (todo){
        this.todos.push(todo)
    }
    sortTodo() {
        this.todos.sort((a, b) => a.priority - b.priority)
    }
    getTodos() {
        return this.todos
    }
}