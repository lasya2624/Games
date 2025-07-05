import React,{useState} from 'react';

function Todo(){
    const[task,settask]=useState(["Eat food","Take shower","Go for walk"]);
    const[newtask,setnewtask]=useState("");
    const handleinputchange=(event)=>{
        setnewtask(event.target.value);
    }
    const AddTask=()=>{
        settask(s=>[...s,newtask]);
        setnewtask(" ");
    }
    const DeleteTask=(index)=>{
        settask(s=>s.filter((_,i)=>i!== index));
    }
    const MoveUp=(index)=>{
        if(index>0){
            const updatetask =[...task];
           [updatetask[index] , updatetask[index-1]]= [updatetask[index-1] , updatetask[index]]
           settask(updatetask);
        }
    }
    const MoveDown=(index)=>{
        if(index<task.length-1){
            const updatetask =[...task];
           [updatetask[index] , updatetask[index+1]]= [updatetask[index+1] , updatetask[index]]
           settask(updatetask);
        }

    }
    
    return(<div className='main-div'>
        <h2>To Do List</h2>
        <div>
            <input placeholder='Enter your Task...' value={newtask}onChange={handleinputchange}></input>
            <button className='add-btn' onClick={AddTask}>Add</button>
        </div>

        <ol>
            {task.map((task,index)=>(
                <li key={index}>
                    <span>{task}</span>
                    <button className='dlt-btn' onClick={()=>DeleteTask(index)}> Delete</button>
                    <button className='up-btn' onClick={()=>MoveUp(index)}>⬆️</button>
                    <button className='down-btn' onClick={()=>MoveDown(index)}>⬇️</button>
                </li>
            ))}
        </ol>
    </div>);
}
export default Todo;