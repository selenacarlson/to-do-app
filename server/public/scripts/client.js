$( document ).ready( function(){
    
    getTasks();

    $('.list').on('click', '.deleteButton', function(){
        alert('Are you sure?');
        let taskToDelete = $( this ).data('id');
        deleteTask( taskToDelete );
    });

    $('.list').on('click', '.doneButton', function(){
        let completedTask = $( this ).data('id');
        doneTask(completedTask);
    }); 

    function deleteTask(id){
        $.ajax({
            type: 'DELETE',
            url: `/tasks/delete/${id}`,
            success: function( response ){
                getTasks();
            },
            error: function(){
                console.log('Task not deleted', id);
            }
        }); // end ajax
    } // end deleteTask

    function doneTask(id){
        $.ajax({
            type: 'PUT',
            url: `/tasks/done/${id}`,
            success: function( response ){
                getTasks();
            },
            error: function(){
                console.log('Task not done', id);
            }
        }); // end ajax
        // console.log('doneTask');
        // $( this ).replaceWith('<div>&#10003</div>');
    }
    
    function getTasks(){
        $.ajax({
            type: 'GET',
            url: '/tasks',
            success: function(response){
                displayTasks(response);
            },
            error: function(response){
                console.log('error getting tasks')
            }
            }); // end ajax get
    } // end getTasks

    function displayTasks(chores){
        $('.list').empty();
        for( chore of chores ){
            if (chore.complete = 'N'){
                $('.list').append(`<tr><td>${chore.task}</td>
                        <td>${chore.description}</td>
                        <td>${chore.category}</td>
                        <td><button class="doneButton" data-id=${chore.id}>Done</button></td>
                        <td><button class="deleteButton" data-id=${chore.id}>Delete</button></td>
                        </tr>`)
            }
            else if (chore.complete = 'Y'){
                $('.list').append(`<tr><td>${chore.task}</td>
                        <td>${chore.description}</td>
                        <td>${chore.category}</td>
                        <td>&#10003</td>
                        <td><button class="deleteButton" data-id=${chore.id}>Delete</button></td>
                        </tr>`)
            } // end if
        } // end for loop
    } // end displayTasks

    $( '#addButton' ).on( 'click', function(){
        let newTask = {};
        createTask(newTask);
        addTask(newTask);
    });

    function createTask(newTask){
        newTask.task = $('#taskIn').val();
        newTask.description = $('#descriptionIn').val();
        newTask.category = $('#categoryIn').val();
        newTask.complete = 'N';
        return newTask;
    };

    function addTask(newTask){
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: newTask,
            success: function(){
                clearInputs();
                getTasks();
            },
            error: function(error){
                console.log('Adding unsuccessful', newTask);
                console.log(error);
            }
        })
    } // end addTask

    function clearInputs(){
        $('#taskIn').val('');
        $('#descriptionIn').val('');
        $('#categoryIn').val('');
    } // end clearInputs

}); // end on ready
