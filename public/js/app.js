/*jshint esversion: 6*/

const TodoApp = {
  rootElement: "#app",
  todos: [],
  start: function(){
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
  //  this.addButton = this.root.querySelector('.add-button');
    this.createForm = this.root.querySelector('.create-form');
    this.taskInput = this.root.querySelector('.task-input');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents: function(){
  this.createForm.addEventListener('submit', (event) => this.addToDo(event));
  },

  addToDo: function(event){
    event.preventDefault();
    //first: grab the task input value
    const taskValue = this.taskInput.value;
    // first-part-2: validate that taskValue is actually "something"
    if (!taskValue){

      return;
    }

    // second: build a todo obj with that value
    const todo = {
      task: taskValue,
      isComplete: false
    };
    //third: add that todo to the  todos array
    this.todos.push(todo);
    //fourth: rerender
    this.render();
    //fifth: clear the input
    this.taskInput.value = '';

  },

  cacheDeleteButtons: function(){
    this.deleteButtons = this.root.querySelectorAll('.delete');

  },
  bindDeleteEvents: function(){
    this.deleteButtons.forEach((button, index)=> {
      button.addEventListener('click', () => this.deleteTodo(index));
    });
  },
  deleteTodo: function(index){
    this.todos.splice(index, 1);
    this.render();
  },

  cacheCheckBoxes: function(){
    this.checkBoxButtons = this.root.querySelectorAll('.checkbox');
  },
  bindCheckBoxesEvent: function(){
    this.checkBoxButtons.forEach((input, index) => {
      input.addEventListener('click', () => this.markComplete(index));
    });
  },

  markComplete: function(index){
    if (!this.todos[index].isComplete){
      this.todos[index].isComplete = true;
    }
    else {
      this.todos[index].isComplete = false;
    }
    this.render();
  },

  cacheUpdateButtons: function(){
    this.updateButtons = this.root.querySelectorAll('.update-todo');
  },

  bindUpdateEvent: function(){
    this.updateButtons.forEach((input, index) =>{
      console.log(index);
      input.addEventListener('click', ()=> this.updateToDo(index));
    });
  },

  updateToDo: function(index){

    this.todos[index].task = this.taskInput.value;
    this.render();
    this.taskInput.value = '';

  },


  liFunction: function(todo){
      //return `
      //<li>
      //<input type="checkbox" class="checkbox checkbox-button" ${todo.isComplete?"checked":""}/>
      //<span ${todo.isComplete?"class='complete'":""}>${todo.task}</span>
      //<button class='delete delete-button'>X</button>
      //<button class="update-todo update-button">Update</button></li>`;

      const li = document.createElement('li');
      li.className = "todo";

      const input = document.createElement('input');
      input.type = "checkbox";
      input.className = "checkbox checkbox-button";
      if (todo.isComplete){
        input.checked = true;
      }
      else{
        input.checked = false;
      }
      li.appendChild(input);


      const span = document.createElement('span');
      span.appendChild(document.createTextNode(todo.task));
      if (todo.isComplete){
        span.className = "complete";
      }
      li.appendChild(span);


      const deleteButton = document.createElement('button');
      deleteButton.className = "delete delete-button";
      deleteButton.appendChild(document.createTextNode('X'));
      li.appendChild(deleteButton);


      const updateButton =document.createElement('button');
      updateButton.className = "update-todo update-button";
      updateButton.appendChild(document.createTextNode('Update'));
      li.appendChild(updateButton);

      return li;

  },
  render: function(){
    this.todoList.innerHTML = '';
    this.todos.map(todo => this.todoList.appendChild(this.liFunction(todo)));

    //this.todoList.appendChild(lis);// be carefull can lead to security issues
    this.cacheCheckBoxes();
    this.cacheDeleteButtons();
    this.cacheUpdateButtons();
    this.bindDeleteEvents();
    this.bindCheckBoxesEvent();
    this.bindUpdateEvent();
  //const lis = this.todos.map(function (todo, index){});
  },

};

TodoApp.start();
