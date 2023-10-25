const inputValue = document.querySelector('#input-collect');
const submitBtn = document.querySelector('#submit-btn');
const tasks = document.querySelector('.tasks')

window.addEventListener('load', loadTasks);

submitBtn.addEventListener('click', ()=>{
    if(inputempty()){
        createTask();
        saveTasksToLocalStorage();
    }

    inputValue.value = "";
})

deleteBtn.addEventListener('click', () => {
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
    localStorage.removeItem('tasks');
});

function inputempty(){
    if(inputValue.value.trim() === ""){
        alert("Enter the task");
        return false;
    }
    return true;
}


function createTask(){
    // container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    tasks.appendChild(taskContainer);

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'completed-task';
    taskContainer.appendChild(checkbox);

    // para
    const para = document.createElement("p");
    para.classList.add("task-do");
    taskContainer.appendChild(para);
    para.innerHTML = `${inputValue.value}`;

    // edit
    const edit = document.createElement("i");
    edit.classList.add("bx", "bxs-edit")
    taskContainer.appendChild(edit);   

    // delete
    const deletebtn = document.createElement("ion-icon");
    deletebtn.name="trash-outline";
    taskContainer.appendChild(deletebtn);

    deletebtn.addEventListener('click', ()=>{
        taskContainer.remove();
        saveTasksToLocalStorage();
    });

    edit.addEventListener('click', ()=>{
        inputValue.value = para.textContent;
        const editicon = document.querySelectorAll("i");
        editicon.forEach((edit)=>{
            submitBtn.addEventListener('click', ()=>{
                edit.classList.remove('hide')
            })
            edit.classList.toggle('hide')
        })
        taskContainer.remove();
        saveTasksToLocalStorage();
    });

    checkbox.addEventListener("change", ()=>{
        para.classList.toggle("strike");
        saveTasksToLocalStorage();
    })
}

function saveTasksToLocalStorage() {
    const allTasks = Array.from(document.querySelectorAll('.task-do')).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (const taskText of savedTasks) {
        inputValue.value = taskText;
        createTask();   
    }

    if (savedTasks.length > 0) {
        inputValue.value = "";
    }
}

