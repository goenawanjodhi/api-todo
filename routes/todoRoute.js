const express = require('express');
const { getAllTodo, createTodo, getTodo, updateTodo, deleteTodo, searchTodo } = require('../controllers/todoController');

const router = express.Router();

router.route('/').get(getAllTodo).post(createTodo);
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);
router.route('/search/:title').get(searchTodo);

module.exports = router;