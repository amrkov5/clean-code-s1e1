//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".new-task__input"); //Add a new task.
const addButton = document.querySelector(".section__add-btn"); //first button
const incompleteTaskHolder = document.querySelector(".task-list-todo"); //ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".task-list-completed"); //completed-tasks


//New task list item
const createNewTaskElement = function(taskString){
  const listItem = document.createElement("li");
  //input (checkbox)
  const checkBox = document.createElement("input"); //checkbox
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button
  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image
  label.innerText = taskString;
  listItem.className = 'list-el task-list__list-el';
  label.className = 'list-el__label';
  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.className = 'list-el__checkbox';
  editInput.type = "text";
  editInput.className = "list-el__input list-el__input_hidden";
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "list-el__save-btn";
  deleteButton.className="list-el__del-btn list-el__del-btn_rotated";
  deleteButtonImg.setAttribute('alt', 'X');
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.classList = 'list-el__del-img';
  deleteButton.appendChild(deleteButtonImg);
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    var listItem=this.parentNode;
    var editInput=listItem.querySelector('.list-el__input');
    var label=listItem.querySelector(".list-el__label");
    var editBtn=listItem.querySelector(".list-el__save-btn");
    var containsClass=editInput.classList.contains("list-el__input_hidden");
    //If class of the parent is .editmode
    if(!containsClass){
        //switch to .editmode
        //label becomes the inputs value.
        label.classList.toggle('list-el__label_hidden');
        editInput.classList.toggle('list-el__input_hidden');
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        label.classList.toggle('list-el__label_hidden');
        editInput.classList.toggle('list-el__input_hidden');
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    const taskLabel = listItem.querySelector('.list-el__label');
    completedTasksHolder.appendChild(listItem);
    taskLabel.classList.add('list-el_lined-through');
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    const taskLabel = listItem.querySelector('.list-el__label');
    incompleteTaskHolder.appendChild(listItem);
    taskLabel.classList.remove('list-el_lined-through');
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".list-el__checkbox");
    var editButton=taskListItem.querySelector(".list-el__save-btn");
    var deleteButton=taskListItem.querySelector(".list-el__del-btn");
    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.