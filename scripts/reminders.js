 //Model section
 let todos;
 const savedTodos = JSON.parse(localStorage.getItem('todos'));
 if(Array.isArray(savedTodos)){
   todos = savedTodos;
 }
 else
   todos = [];
   
 
// Create a todo
function createTodo(title, dueDate){
 const id = ' ' + new Date().getTime();

 todos.push({
   title: title,
   dueDate: dueDate,
   id: id
 });
 saveTodos();
}
// Delete a todo
function removeTodo(idToDelete){
 todos = todos.filter(function (todo){
   if ( idToDelete === todo.id){
     return false;
   }
   else{
     return true;
   }
 });
 saveTodos();

}

 function saveTodos(){
   localStorage.setItem('todos', JSON.stringify(todos));
 }


//Controller section
function addTodo(){  
 const textbox = document.getElementById('todo-title-input');
 const title = textbox.value;

 const datePicker = document.getElementById('date-picker');
 const dueDate = datePicker.value; 

 createTodo(title, dueDate);
 render();
}

function deleteTodo(event){
 const deleteButton = event.target;
 const idToDelete = deleteButton.id;
 
 removeTodo(idToDelete); 
 render();
}

//Veiw section
function render(){
 //reset our list
 document.getElementById('todos-list').innerHTML="";
 todos.forEach(function (todo){  

   const todoList = document.getElementById('todos-list');

   const element = document.createElement('div');
   element.classList.add('todo');

   const title = document.createElement('div');
   title.innerText = todo.title;
   title.classList.add('todo-title');

   const dueDate = document.createElement('div');
   dueDate.innerText = todo.dueDate;
   dueDate.classList.add('todo-dueDate');

   element.appendChild(title);
   element.appendChild(dueDate);
   todoList.appendChild(element);

   const deleteButton = document.createElement('button');
   deleteButton.innerText = "Delete";
   deleteButton.onclick = deleteTodo;
   deleteButton.id = todo.id;
   deleteButton.classList.add('button-delete');
   element.appendChild(deleteButton);
 })
}

render();