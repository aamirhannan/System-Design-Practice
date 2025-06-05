class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }

    async create(req, res) {
        try {
            const todo = await this.todoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const todos = await this.todoService.getTodos();
            res.json(todos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const todo = await this.todoService.getTodoById(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Not found' });
            res.json(todo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const todo = await this.todoService.updateTodo(req.params.id, req.body);
            if (!todo) return res.status(404).json({ error: 'Not found' });
            res.json(todo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const todo = await this.todoService.deleteTodo(req.params.id);
            if (!todo) return res.status(404).json({ error: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = TodoController; 