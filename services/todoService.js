class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    createTodo(data) {
        return this.todoRepository.create(data);
    }

    getTodos() {
        return this.todoRepository.findAll();
    }

    getTodoById(id) {
        return this.todoRepository.findById(id);
    }

    updateTodo(id, data) {
        return this.todoRepository.update(id, data);
    }

    deleteTodo(id) {
        return this.todoRepository.delete(id);
    }
}

module.exports = TodoService; 