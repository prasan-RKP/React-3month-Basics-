import React, { useEffect, useMemo, useState } from 'react'
import EditModal from './modals/EditModal';


const MyTodo = () => {

    let [todoVal, setTodoVal] = useState('');
    let [edit, setEdit] = useState(false);
    let [todos, setTodos] = useState([]);
    let [myTodoId, setMyTodoId] = useState('');
    let [editText, setEditText] = useState('');
    let [loading, setLoading] = useState(false);
    let [category, setCategory] = useState('all'); // Default category
    //let [myTimeStamp, setMyTimeStamp] = useState("timestamp");

    //let [crossLine, setCrossLine] = useState("");

    //console.log("selected category: ", category);

    const onTodoSubmit = e => {
        e.preventDefault();
        if (!todoVal.trim()) return alert("Please Add a Todo");
        setTodos(t => [
            ...t,
            { uid: Date.now().toString(36).slice(-4), text: todoVal, marked: false, category: 'all', createdAt: Date.now(), expiresAt: null  }
        ]);
        setTodoVal('');
    };

    const onEditTodo = e => {
        e.preventDefault();
        if (!myTodoId) return alert('Todo not found');
        setTodos(t =>
            t.map(todo =>
                todo.uid === myTodoId ? { ...todo, text: editText } : todo
            )
        );
        setEditText('');
        setEdit(false);
    };


    const onTaskComplete = (uid) => {
        //setCrossLine(!crossLine);
        if (!uid) return alert("Todo not Found");
        setTodos(t =>
            t.map(todo => {
                if (todo.uid === uid) {
                    //setCrossLine(uid)
                    return { ...todo, marked: !todo.marked }
                }
                else {
                    return todo;
                }
            }
            )
        );
    }

    const onDeleteTodo = (todoId) => {
        let updatedTodos = todos.filter((todo) => todo?.uid !== todoId);
        setTodos(updatedTodos);
    }

    const openEditModal = (uid) => {
        const todo = todos.find(t => t.uid === uid);
        setEditText(todo?.text || '');
        setMyTodoId(uid);
        setEdit(true);
    }

    const deleteAll = () => {
        setTodos([]);
        setTodoVal("");
    }
    
     const onChangeTimeStamp = (timeVal, todoId) => {

        if (timeVal === "timestamp") return;

        setTodos(prev =>
            prev.map(todo =>
                todo.uid === todoId
                    ? {
                        ...todo,
                        timestamp: timeVal,
                        expiresAt: Date.now() + Number(timeVal) * 60000
                    }
                    : todo
            )
        );

    };


    // Filter todos based on selected category
    const filteredTodos = useMemo(() => {
        if (category === 'all') return todos;
        return todos.filter(to => to.category === category);

    }, [category, todos]);

    //handle Change the TimeStamp
   

    // for auto-Delete it after timeStamps Ends
    useEffect(()=> {
        const interval = setInterval(()=> {
            const now = Date.now();
            setTodos(prev => 
                prev.filter(todo => !todo.expiresAt || now < todo.expiresAt)
            )
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('TODOS') || []);
        setTodos(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem('TODOS', JSON.stringify(todos));
    }, [todos]);




    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">

            {/* ── Edit Modal ── */}
            {edit && (
                <EditModal setEdit={setEdit} onEditTodo={onEditTodo} setEditText={setEditText} editText={editText} />
            )}

            {/* ── Main Card ── */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl w-full max-w-xl p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
                            My <span className="text-violet-400">Todos</span>
                        </h1>
                        <p className="text-zinc-500 text-xs mt-0.5">
                            {todos.length === 0
                                ? 'Nothing here yet'
                                : `${todos.length} task${todos.length !== 1 ? 's' : ''} in your list`}
                        </p>
                    </div>
                    {todos.length > 0 && (
                        <span className="bg-violet-500/10 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/20">
                            {todos.length}
                        </span>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={(e) => onTodoSubmit(e)} className="mb-6">
                    <div className="flex gap-2">
                        <input
                            onChange={(e) => setTodoVal(e.target.value)}
                            value={todoVal}
                            type="text"
                            placeholder="What needs to be done?"
                            className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition"
                        />
                        <button
                            type="submit"
                            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all whitespace-nowrap"
                        >
                            + Add
                        </button>
                        <button
                            type="button"
                            onClick={deleteAll}
                            className="bg-zinc-800 hover:bg-red-500/10 border border-zinc-700 hover:border-red-500/40 text-zinc-400 hover:text-red-400 text-sm font-medium px-4 py-3 rounded-xl transition-all whitespace-nowrap"
                        >
                            Clear
                        </button>


                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-xl px-3 py-3 text-sm outline-none focus:border-violet-500 transition min-w-[120px]"
                        >
                            <option value="all">All</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="study">Study</option>
                            <option value="shopping">Shopping</option>
                        </select>

                    </div>
                </form>

                {/* Divider */}
                <div className="border-t border-zinc-800 mb-5" />

                {/* Todo List */}
                {filteredTodos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl">
                            ✦
                        </div>
                        <p className="text-zinc-500 text-sm">
                            {todos.length === 0 ? "Add your first todo above" : `No todos on  ${category} category`}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredTodos.map((todo, idx) => (
                            <div
                                key={todo.uid}
                                className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 rounded-2xl px-4 py-3.5 transition-all"
                            >
                                {/* Index */}
                                <span className="text-zinc-600 text-xs font-mono font-bold min-w-5">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>

                                {/* Todo text */}
                                <span className={`flex-1 text-zinc-200 text-sm leading-relaxed break-words ${todo.marked ? 'line-through text-zinc-500' : ''}`}>
                                    {todo.text}
                                </span>

                                {/* Actions */}
                                <div className="flex gap-1.5 shrink-0">

                                    {/* Select category */}
                                    <select
                                        value={todo.timestamp || 'timestamp'}
                                        onChange={(e) => onChangeTimeStamp(e.target.value, todo?.uid)}
                                        className="bg-zinc-700/50 border border-zinc-600 text-zinc-200 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-violet-500"
                                    >
                                        <option value="timestamp">TimeStamp</option>
                                        <option value="2">2</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>


                                    <select
                                        value={todo.category || 'all'}
                                        onChange={(e) => {
                                            setTodos(prev =>
                                                prev.map(t =>
                                                    t.uid === todo.uid
                                                        ? { ...t, category: e.target.value }
                                                        : t
                                                )
                                            );
                                        }}
                                        className="bg-zinc-700/50 border border-zinc-600 text-zinc-200 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-violet-500"
                                    >
                                        <option value="all">All</option>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                        <option value="study">Study</option>
                                        <option value="shopping">Shopping</option>
                                    </select>

                                    <button
                                        onClick={() => openEditModal(todo.uid)}
                                        className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteTodo(todo.uid)}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => onTaskComplete(todo?.uid)}
                                        className={`bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${todo.marked ? 'line-through' : ''}`}
                                    >

                                        {todo.marked ? 'Unmark' : 'Mark'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTodo;