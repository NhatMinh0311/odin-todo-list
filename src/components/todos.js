export default class Todos {
    complete = false
    constructor(title, description, dueDate, priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
    toggleComplete(){
        this.complete = !this.complete
    }
    updatePriority(newPriority){
        this.priority = newPriority;
    }
}