$( document ).ready( function(){
    
    getTasks();
    
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
        $('.list').append(`<tr><td>${chore.task}</td>
                <td>${chore.description}</td>
                <td>${chore.category}</td>
                <td><button class="complete" data-id=${chore.id}>Done</button></td>
                <td><button class="delete" data-id=${chore.id}>Delete</button></td>
                </tr>`)
        }
    } // end displayTasks

    $( '#addButton' ).on( 'click', function(){
        let task = $('#taskIn').val();
        let description = $('#descriptionIn').val();
        let category = $('#categoryIn').val();

        let newTask = {
            task: task,
            description: description,
            category: category
        }
        console.log(newTask);
        addTask(newTask);
    });

    function createTask(){
        let task = $('#taskIn').val();
        let description = $('#descriptionIn').val();
        let category = $('#categoryIn').val();

        let newTask = {
            task: task,
            description: description,
            category: category
        }
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
