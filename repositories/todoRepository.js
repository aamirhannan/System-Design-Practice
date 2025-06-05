class TodoRepository {
    constructor(db, type) {
        this.type = type;
        if (type === 'POSTGRES') {
            this.Todo = require('../models/todo.model').getSQLModel(db.databaseConnectionInstance);
        } else {
            this.Todo = require('../models/todo.model').MongoTodo;
        }
    }

    async create(todo) {
        return this.Todo.create(todo);
    }

    async findAll() {
        return this.type === 'POSTGRES' ? this.Todo.findAll() : this.Todo.find();
    }

    async findById(id) {
        return this.type === 'POSTGRES' ? this.Todo.findByPk(id) : this.Todo.findById(id);
    }

    async update(id, data) {
        if (this.type === 'POSTGRES') {
            const todo = await this.Todo.findByPk(id);
            if (!todo) return null;
            return todo.update(data);
        } else {
            return this.Todo.findByIdAndUpdate(id, data, { new: true });
        }
    }

    async delete(id) {
        if (this.type === 'POSTGRES') {
            const todo = await this.Todo.findByPk(id);
            if (!todo) return null;
            await todo.destroy();
            return todo;
        } else {
            return this.Todo.findByIdAndDelete(id);
        }
    }
}

module.exports = TodoRepository; 