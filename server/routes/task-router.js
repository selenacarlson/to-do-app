const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool');

router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM tasks';
    pool.query(sqlText)
        .then(function(result){
            console.log('Got result:', result)
            response.send(result.rows);
        })
        .catch(function(error){
            console.log('Error on get', error);
            response.sendStatus(500);
        })
}) // end get

router.post('/', function(request, response){
    const newTask = request.body;
    console.log(newTask);
    const sqlText = `INSERT INTO tasks 
        (task, description, category) 
        VALUES ($1, $2, $3)`;
    pool.query(sqlText, [newTask.task, newTask.description, newTask.category])
        .then(function(result){
            response.sendStatus(201);
        })
        .catch(function(error){
            response.sendStatus(500)
            console.log(newTask);
        })
}) // end post

module.exports = router;