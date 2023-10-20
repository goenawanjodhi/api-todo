const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel');


const getAllTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.find({});
    res.status(200).json(todo);
});

const createTodo = asyncHandler(async (req, res) => {
    const { title, body, checked } = req.body;
    if (!title || !body) {
        res.status(400);
        throw new Error("Please fill in the column title and column body!");
    }

    const todo = await Todo.create({
        title, body, checked
    });

    if (todo) {
        res.status(201).json({
            _id: todo.id,
            title: todo.title,
            body: todo.body,
            checked: todo.checked
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
});

const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById({ _id: req.params.id });
    if (!todo) {
        res.status(404);
        throw new Error("Data not found!");
    }
    res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById({ _id: req.params.id });
    if (!todo) {
        res.status(404);
        throw new Error('Data not found!');
    }

    const updateTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updateTodo)
});

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error('Data not found!');
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json(todo);
});

const searchTodo = asyncHandler(async (req, res) => {
    const searchKeyword = req.params.title;
    const regexPattern = new RegExp(searchKeyword, 'i');

    try {
        const todos = await Todo.find({ title: regexPattern });

        if (todos.length > 0) {
            res.status(200).json(todos);
        } else {
            res.json({ message: "Tidak ada tugas yang cocok dengan kata kunci yang diberikan." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan dalam mencari tugas." });
    }
});

module.exports = { getAllTodo, createTodo, getTodo, updateTodo, deleteTodo, searchTodo };