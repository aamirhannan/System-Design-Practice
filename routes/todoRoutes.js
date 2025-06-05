const express = require('express');
const router = express.Router();

module.exports = (todoController) => {
    router.post('/', todoController.create.bind(todoController));
    router.get('/', todoController.getAll.bind(todoController));
    router.get('/:id', todoController.getById.bind(todoController));
    router.put('/:id', todoController.update.bind(todoController));
    router.delete('/:id', todoController.delete.bind(todoController));
    return router;
}; 