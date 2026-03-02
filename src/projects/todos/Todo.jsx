import React, { useState } from 'react'

const Todo = () => {

    let [todoVal, setTodoVal] = useState('');
    let [edit, setEdit] = useState(false);
    let [todos, setTodos] = useState([]);
    let [myTodoId, setMyTodoId] = useState('');

    let [editText, setEditText] = useState('');


    const onTodoSubmit = (e) => {
        e.preventDefault();

        let updatedTodos = todos;
        updatedTodos = [...todos, { uid: Date.now().toString(36).slice(-4), text: todoVal, marked: false }];
        setTodos(updatedTodos);
        setTodoVal("");

    }


    const onDeleteTodo = (todoId) => {
        let updatedTodos = todos;
        updatedTodos = updatedTodos.filter((todo) => todo?.uid !== todoId);
        setTodos(updatedTodos);

    }

    const openEditModal = (uid) => {
         setMyTodoId(uid);
         setEdit(true);
    }

    const deleteAll = () => {
        setTodos([]);
    }


    const onEditTodo = (e) => {
        e.preventDefault();
        if (myTodoId) {
            let updatedTodos = todos;

            updatedTodos = updatedTodos.map((todo) => todo?.uid === myTodoId ? { ...todo, text: editText } : todo);
            setTodos(updatedTodos);
            setEditText("");
            setEdit(false);
        }

        else {
            alert("Todo not Found...☹️")
        }

    }

    console.log("myTodos", todos);
    console.log("TodoIds", myTodoId);


    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            {edit ? (
                <>
                    <form onSubmit={(e) => onEditTodo(e)}>
                        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-3 w-full max-w-md">


                            <input
                                value={editText}
                                type="text"
                                onChange={(e) => setEditText(e.target.value)}
                                placeholder="Edit todo..."
                                className="flex-1 p-2 border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                Save
                            </button>

                            <button onClick={() => setEdit(false)} className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-gray-500 transition">
                                Close
                            </button>

                        </div>
                    </form>
                </>) :
                (<>
                    <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg">

                        <h1 className="text-2xl font-bold text-center mb-6">
                            Todo App
                        </h1>

                        {/* Input Section */}
                        <form onSubmit={(e) => onTodoSubmit(e)}>
                            <div className="flex gap-3 mb-4">
                                <input
                                    onChange={(e) => setTodoVal(e.target.value)}
                                    value={todoVal}
                                    type="text"
                                    placeholder="Type todo..."
                                    className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition">
                                    Add
                                </button>

                                {/* Delete Button */}
                                <button
                                type="button"
                                onClick={deleteAll} 
                                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition">
                                    Delete All
                                </button>

                            </div>
                        </form>

                        {/* Todos will land here  */}

                        <div className='flex flex-col gap-4 pl-3 mt-7'>

                            <div className='flex flex-col gap-4'> {/* Changed to flex-col so items stack nicely */}
                                {todos.length === 0 ? (
                                    <p className='text-xl text-cyan-800 mx-auto'>No Todos Added Yet ...</p>
                                ) : (
                                    todos.map((todo, idx) => (
                                        <div key={idx} className='flex items-center gap-4 border-b pb-2'>
                                            <span className='text-2xl flex-1'>{todo.text}</span>

                                            <button
                                                onClick={() => openEditModal(todo?.uid)}
                                                className='text-white bg-blue-600 px-7 py-2 rounded-md'>
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => onDeleteTodo(todo?.uid)}
                                                className='text-white bg-red-600 px-7 py-2 rounded-md'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>

                    </div>
                </>)}

        </div>
    )
}

export default Todo;
