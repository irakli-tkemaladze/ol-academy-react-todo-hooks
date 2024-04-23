import React, { useState } from 'react'
import './todoForm.css'

function TodoForm({ parentSetTodo, parentTodoList }) {
    const [todoForm, setTodoForm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleOnChange = (e) => { setTodoForm(e.target.value) }
    const handleAddTask = () => {
        const isExisted = parentTodoList.find(item => item.name === todoForm.trim())


        if (todoForm.trim() !== '' && !isExisted) {
            let uniqueId = 1
            parentTodoList.forEach(item => {
                if (item.id >= uniqueId) {
                    uniqueId = item.id + 1
                }
            });
            const newTodo = {
                name: todoForm,
                isChecked: false,
                isDone: false,
                editMode: false,
                id: uniqueId
            }
            parentSetTodo([newTodo, ...parentTodoList])
            setTodoForm('')
            setErrorMsg('')
        }

        if (todoForm.trim() === '') {
            setErrorMsg('გთხოვთ შეავსოთ ცარიელი ველი...')
        } else if (isExisted) {
            setErrorMsg('ასეთი დავალება უკვე არსებობს...')
        }

    }

    return (
        <div className='todoFormWrapper' >
            <form onSubmit={(event) => {event.preventDefault();handleAddTask()}}>
                <div>
                    <input type="text" placeholder='enter you task here...' value={todoForm} onChange={handleOnChange} />
                    <button type='button' onClick={handleAddTask}>Add Task</button>
                </div>
                {errorMsg ?
                    <span style={{ color: 'red' }}>{errorMsg}</span> :
                    null
                }
            </form>
        </div>
    )
}
export { TodoForm }