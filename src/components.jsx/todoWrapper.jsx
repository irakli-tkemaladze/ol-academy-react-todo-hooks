import React, { useState } from 'react'
import { TodoForm } from './todoForm'
import { TodoList } from './todoList'
import './todoWrapper.css'


function TodoWrapper() {
    const [todoList, setTodoList] = useState([]);

    return (
        <div className='overlay'>
            <div className='todoWrapper'>


                <TodoForm parentTodoList={todoList} parentSetTodo={setTodoList} />


                <TodoList parentTodoList={todoList} parentSetTodo={setTodoList} />


            </div>
        </div>)


}



export { TodoWrapper }