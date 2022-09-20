var express = require('express');
var router = express.Router();
var createError = require('http-errors')

const todos = [{ id: 1, name: "Demo", completed: false }]

//get all todos
router.get('/', function (req, res, next) {
    res.json(todos);
});

//get todo by id
router.get('/:id', function (req, res, next) {
    const foundById = todos.find(todo => todo.id === Number(req.params.id));
    if (!foundById) {

    }
    res.json(foundById);
});

module.exports = router;
