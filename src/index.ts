import { v4 as uuidv4 } from 'uuid';

const ul = document.querySelector("#todo")as HTMLUListElement
const button = document.querySelector('#add-btn') as HTMLButtonElement
const input = document.querySelector("#input") as HTMLInputElement

//  array which stores the object 
let todos:Array<Todo> = []

interface Todo {
    id: string;
    todo: string; 
    completed: boolean;
    createdDate: Date;
    updatedDate?: Date;
} 

//  How do I create objects that are  stored on the array?
type storeObject = (a: string) => void;
let storeObject = (todo: string)=>{
    const item: Todo = {
        id: uuidv4(),
        todo: todo,
        completed: false ,
        createdDate: new Date,
    }
    todos.push(item)
}

button.addEventListener("click",(e)=>{
    if(input.value == "") return 
    storeObject(input.value)    
    
    input.value = ""
    

    todos.forEach((obj)=>{
        console.log('todos array',todos)
        if(obj.todo == undefined){
            alert("empty todo")
        }
        const li = document.createElement("li") as HTMLLIElement
        console.log('item',obj.todo)
        li.textContent = obj.todo

        ul.appendChild(li);
    })

})