import { v4 as uuidv4 } from 'uuid';

const ul = document.querySelector("#todo")as HTMLUListElement
const addTaskBtn = document.querySelector('#add-btn') as HTMLButtonElement
const input = document.querySelector("#input") as HTMLInputElement

// array which stores the object 
let todos:Array<Todo> = []
let id: string;

interface Todo {
    id: string;
    todo: string; 
    completed: boolean;
    createdDate: Date;
    updatedDate?: Date;
} 

// creating objects that are stored on the array
type storeObject = (a: string) => void;
const storeObject = (todo: string)=>{
    const item: Todo = {
        id: uuidv4(),
        todo: todo,
        completed: false ,
        createdDate: new Date,
    }
    todos.push(item)
}

const renderTodos = ()=> {
    todos.forEach((obj)=>{      
        const div = document.createElement("div");
        div.classList.add("item")
        
        const li = document.createElement("li");
        li.classList.add("todo")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = `${obj.id}`
        if(obj.completed) checkbox.checked = true

        const label = document.createElement("label") 
        label.textContent = obj.todo
        label.htmlFor = `${obj.id}`

        const btns = document.createElement("div");
        
        const editBtn = document.createElement("button") as HTMLButtonElement
        editBtn.textContent = "Edit "
        editBtn.classList.add("editBtn")
        
        const deleteBtn = document.createElement("button") as HTMLButtonElement
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("deleteBtn")

        btns.appendChild(editBtn)
        btns.appendChild(deleteBtn)

        li.appendChild(checkbox)
        li.appendChild(label)

        div.appendChild(li);
        div.appendChild(btns);

        ul.appendChild(div);
    })
}

const updateTodo = (id:string)=>{
    //  Updating todo after finding todo using id 
    todos.map((item)=>{
        if(item.id == id) item.todo = input.value;
        return 
    })
}

addTaskBtn.addEventListener("click",(e)=>{
    if(input.value == "") return 
    
    (e.target as HTMLElement).textContent == "Update" ?
        updateTodo(id) :
        storeObject(input.value);
    
    input.value = ""
    // dom should be cleared and painted according to new data in array 
    ul.innerHTML = ""
    addTaskBtn.textContent = "Add Task" 

    renderTodos()
});

document.addEventListener("click", (e)=>{
    // getting the clicked todo's id  
    if((e.target as Element).classList.contains("editBtn")){
        // Editing todo 
        id = ((e.target as HTMLElement).parentNode.parentNode.childNodes[0].childNodes[0] as HTMLElement).id
        let todo:string = ((e.target as HTMLElement).parentNode.parentNode.childNodes[0].childNodes[1] as HTMLElement).innerText

        // populate input with the value 
        input.value = todo;
        addTaskBtn.textContent = "Update"
    }else if((e.target as HTMLElement).classList.contains("deleteBtn")){
        // deleting todo 
        id = ((e.target as HTMLElement).parentNode.parentNode.childNodes[0].childNodes[0] as HTMLElement).id

        let values = todos.filter((item)=>{
            if(item.id !== id) return item
        })
        todos = []
        todos = [...values]
        ul.innerHTML = ''
        renderTodos()
    }else if (((e.target as HTMLElement).parentNode as HTMLElement).classList.contains("todo")){
        id = ((e.target as HTMLElement).parentNode.parentNode.childNodes[0].childNodes[0] as HTMLElement).id;
        let values;
        if(((e.target as HTMLElement).parentNode.childNodes[0] as HTMLInputElement).checked) {
            values = todos.map((item)=>{
                if(item.id == id) {
                    item.completed = true
                    return item 
                }
                return item 
            })
        }else{
            values = todos.map((item)=>{
                if(item.id == id) {
                    item.completed = false
                    return item 
                }
                return item 
            })
        }
        todos = []
        todos = [...values]
        ul.innerHTML = ""
        renderTodos()
    }
})

