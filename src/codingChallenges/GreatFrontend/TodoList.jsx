import React, { useState } from 'react'
import { toast } from 'sonner';

const TodoList = () => {

    /*
   ----- Tasks to do ---

   1. Add new tasks on clicking the "Submit" button. The <input> field should be cleared upon successful addition.

   2. Remove tasks from the Todo List upon clicking the "Delete" button.

    */

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {

        if (!input) {
            toast.error("Todo can't be empty");
        }
        let val = { uid: Date.now().toString(36).slice(-4), text: input.trim() };
        setTodos([val, ...todos]);
        setInput('');
    }

    const deleteTodo = (todoId) => {

        if (!todoId) {
            toast.error("selected Todo is not found");
            return;
        }

        setTodos(t => (
            t.filter((to) => to.uid !== todoId)
        ))
    }


    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='border-2' type="text" placeholder="Add your task" />
                <div>
                    <button onClick={addTodo} className='bg-red-100'>Submit</button>
                </div>
            </div>
            <ul>
                {todos && todos?.length === 0 && (
                    <p className='text-center'>No Posts yet....</p>
                )}

                {todos.map((todo) => (
                    <li className='flex gap-3'>
                        <span>{todo?.text}</span>
                        <button
                            onClick={() => deleteTodo(todo?.uid)}
                            className='bg-red-300'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList
