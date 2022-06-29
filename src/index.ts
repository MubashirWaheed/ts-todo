import { v4 as uuidv4 } from 'uuid';

const addTaskBtn = document.querySelector('#add-btn') as HTMLButtonElement
const input = document.querySelector("#input") as HTMLInputElement
const ul =  document.querySelector("#todoList") as  HTMLUListElement


// array which stores the object 
let todos:Array<Todo> = []
let updatingObject: Todo;

interface Todo {
    id: string;
    todo: string; 
    completed: boolean;
    createdDate: Date;
    updatedDate?: Date;
} 

// creating objects that are stored in the array
const storeObject = (todo: string)=>{
    todos.push({
        id: uuidv4(),
        todo: todo,
        completed: false ,
        createdDate: new Date(),
    })
}

const renderTodos = ()=> {
    // iterating over every object in array 
    todos.forEach((obj)=>{      
        const div = document.createElement("div");
        div.classList.add("item")
        
        const li = document.createElement("li");
        li.classList.add("todo")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        if(obj.completed === true) checkbox.checked = true

        const label = document.createElement("label") 
        label.textContent = obj.todo
        label.htmlFor = `${obj.id}`

        checkbox.addEventListener("click",()=>{
            todos = todos.map(item=>{
                if(item.id == obj.id ){
                    return {...obj,completed:!obj.completed}
                }
                return item
            }) 
            ul.innerText =""
            renderTodos()
        })

        const btns = document.createElement("div");
        
        const editBtn = document.createElement("button") as HTMLButtonElement
        editBtn.textContent = "Edit "
        editBtn.classList.add("editBtn")

        editBtn.addEventListener("click",()=> updateTodo(obj))
        
        const deleteBtn = document.createElement("button") as HTMLButtonElement
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("deleteBtn")
        
        deleteBtn.addEventListener("click",(e)=>{
            // removing todo form array 
            deleteTodo(obj)
        })

        btns.appendChild(editBtn)
        btns.appendChild(deleteBtn)
        
        li.appendChild(checkbox)
        li.appendChild(label)
        
        div.appendChild(li);
        div.appendChild(btns);
        
        ul.appendChild(div);
    })
    
}

const deleteTodo = (obj: Todo)=>{
    //  removed from array
    todos = todos.filter((item)=>{
        if(item.id !== obj.id){
            return item
        }
    })
    ul.innerText =""
    renderTodos()
}

const updateArray = (updatingObject:Todo)=>{
    let newTodo:string  = input.value
    todos = todos.map(item=>{
        if(item.id === updatingObject.id){
            return {...updatingObject,todo: newTodo}
        }
        return item
    })
}

const updateTodo = (obj:Todo)=>{
    input.value = obj.todo;
    addTaskBtn.textContent = "Update"
    updatingObject = obj
}

addTaskBtn.addEventListener("click",(e)=>{
    
    if(input.value === "" || !(e.target instanceof HTMLElement) ) return 

    if(((e.target)as HTMLButtonElement).innerText == "Add Task"){
        // push the todo in the array 
        storeObject(input.value)
        input.value = ""
        ul.innerText = ""
        renderTodos()
    }else{
        updateArray(updatingObject)
        ul.innerText = ""
        input.value = ""
        addTaskBtn.innerText = "Add Task"
        renderTodos()
    }
});