const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM tasks ORDER BY complete ASC, due ASC';
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
    const sqlText = `INSERT INTO tasks 
        (task, description, category, due, complete) 
        VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlText, [newTask.task, newTask.description, newTask.category, newTask.due, newTask.complete])
        .then(function(result){
            response.sendStatus(201);
        })
        .catch(function(error){
            response.sendStatus(500)
            console.log(newTask);
        })
}) // end post

router.delete('/delete/:id', function(request, response){
    const id = request.params.id;
    const sqlText = `DELETE FROM tasks WHERE id=$1`;
    pool.query(sqlText, [id])
        .then(function(result){
            response.sendStatus(200);
        })
        .catch(function(error){
            response.sendStatus(500);
            console.log('Error deleting at', id);
        })
}) // end delete

router.put('/done/:id', function(request, response){
    const id = request.params.id;
    const sqlText = `UPDATE tasks SET complete='Y' WHERE id=$1`;
    pool.query(sqlText, [id])
        .then(function(result){
            response.sendStatus(200);
        })
        .catch(function(error){
            response.sendStatus(500);
            console.log('Error completing task at', id);
        })
}) // end delete


module.exports = router;