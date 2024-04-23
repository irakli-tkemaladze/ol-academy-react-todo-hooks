import React, { useState } from 'react'
import './todoList.css'

function TodoList({ parentSetTodo, parentTodoList }) {
    const [editTaskValue, setEditTaskValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleOnDelete = (id) => {
        const newTodo = parentTodoList.filter(item => item.id !== id)
        parentSetTodo(newTodo)
    }
    const handleOnDone = (index) => {
        const newTodo = [...parentTodoList]
        newTodo[index].isDone = !newTodo[index].isDone
        parentSetTodo(newTodo)
    }
    const handleOnUp = (idx) => {
        if (idx !== 0) {
            const newTodo = [...parentTodoList]
            const tmp = newTodo[idx];
            newTodo[idx] = newTodo[idx - 1]
            newTodo[idx - 1] = tmp
            parentSetTodo(newTodo)
        }

    }

    const handleOnDown = (idx) => {
        if (idx !== parentTodoList.length - 1) {
            const newTodo = [...parentTodoList]
            const tmp = newTodo[idx];
            newTodo[idx] = newTodo[idx + 1]
            newTodo[idx + 1] = tmp
            parentSetTodo(newTodo)
        }
    }

    const handleOnDeleteDone = () => {
        const newTodo = parentTodoList.filter((item) => !item.isDone)
        parentSetTodo(newTodo)
    }

    const chekcboxOnChange = (index) => {
        const newTodo = [...parentTodoList]
        newTodo[index].isChecked = !newTodo[index].isChecked
        parentSetTodo(newTodo)
    }

    const handleOnDeleteMarked = () => {
        const newTodo = parentTodoList.filter((item) => !item.isChecked)
        parentSetTodo(newTodo)
    }

    const handleOnChange = (e) => { setEditTaskValue(e.target.value) }

    const handleOnEdit = (idx) => {
        const newTodo = parentTodoList.map((item, index) => {
            if (index === idx) {
                return { ...item, editMode: true }
            } else {
                return { ...item, editMode: false }
            }
        })
        setErrorMsg('')
        setEditTaskValue(newTodo[idx].name)
        parentSetTodo(newTodo)

    }


    const handleOnEditedItemSave = (idx) => {
        const isExisted = parentTodoList.find(item => item.name === editTaskValue.trim())
        const newTodo = [...parentTodoList]
        if(newTodo[idx].name === editTaskValue){
            handleOnEditItemCancel()
        }else if (editTaskValue.trim() === '') {
            setErrorMsg('გთხოვთ შეავსოთ ცარიელი ველი...')
        } else if (isExisted) {
            setErrorMsg('ასეთი დავალება უკვე არსებობს...')
        } else {
           
            newTodo[idx].name = editTaskValue
            newTodo[idx].editMode = false
            parentSetTodo(newTodo)
        }

    }

    const handleOnEditItemCancel = () => {
        const newTodo = parentTodoList.map(item => ({ ...item, editMode: false }))
        parentSetTodo(newTodo)
    }

    return (
        <div className='todoListWrapper'>
            {parentTodoList.map((item, idx) => item.editMode ?
                <div className='editModeItem' key={item.id}>
                    <div>
                    <input type="text" placeholder='enter edited task here...' value={editTaskValue} onChange={handleOnChange} />
                    <button className='saveBtn' type='button' onClick={() => handleOnEditedItemSave(idx)} >save</button>
                    <button className='cancelEditModeBtn' type='button' onClick={handleOnEditItemCancel} >cancel</button>
                    </div>
                    <p style={{ color: 'red' }} >{errorMsg}</p>   
                </div>

                : <div className='listItem' key={item.id}>
                    <div className='listName'>
                        <input type="checkbox" checked={item.isChecked} onChange={() => chekcboxOnChange(idx)} />
                        <p style={{ color: item.isDone ? 'green' : 'red', textDecoration: item.isDone ? "line-through": '' }}>{item.name}</p>
                    </div>
                    <div className='listItemBtns'>
                        <button className='editBtn' type='button' onClick={() => handleOnEdit(idx)} >edit</button>
                        <button className='deleteBtn' type='button' onClick={() => handleOnDelete(item.id)} >delete</button>
                        <button className='doneBtn' type='button' onClick={() => handleOnDone(idx)}>{item.isDone ? 'not done' : 'done'}</button>
                        <button className='upBtn' type='button' onClick={() => handleOnUp(idx)}>Up</button>
                        <button className='downBtn' type='button' onClick={() => handleOnDown(idx)}>Down</button>
                    </div>
                </div>)
            }

            {
                parentTodoList.length ?
                    <div className='commonBtns'>
                        <button type='button' onClick={handleOnDeleteDone}>delete Done</button>
                        <button type='button' onClick={() => parentSetTodo([])}>Delete All</button>
                        <button type='button' onClick={handleOnDeleteMarked}>Delete Marked</button>
                    </div> : null
            }
        </div >
    )
}

export { TodoList }