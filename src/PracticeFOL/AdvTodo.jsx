import { useEffect, useMemo, useState } from "react";
import { toast } from 'sonner';

const AdvTodo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editDetail, setEditDetail] = useState({ id: null, todoVal: "" });
    const [editValue, setEditValue] = useState("");
    const [query, setQuery] = useState("");
    const [filterVal, setFilterVal] = useState("");

    // --- Handlers (stubs — implement your own logic) ---

    const debounce = (fn, delay) => {
        let timeId = '';
        return (...args) => {
            clearTimeout(timeId);
            timeId = setTimeout(() => fn(...args), delay);
        }
    }

    const handleChangeInput = (e) => {
        let val = e.target.value;
        setInputValue(val);
        debouncedApi(val);
    }
    const debouncedApi = useMemo(() => debounce((val) => setQuery(val), 600), [])


    // ------- All the opearations will be starts from here -------

    const handleAdd = (e) => {
        e.preventDefault();
        if (!query) {
            toast.error("todo can't be Empty")
            return;
        }

        let newTodos = [...todos, { uid: Date.now().toString(36).slice(-4), text: query, marked: false, category: "all", createdAt: Date.now(), expiresAt: null }]

        setTodos(newTodos);
        setInputValue("");
        setQuery("");

    };

    const handleClearAll = () => {
        setTodos([]);
        setQuery("");
    };

    const handleDelete = (id) => {
        // TODO: implement delete logic
        if (!id) {
            toast.error("Todo not found ☹️");
            return;
        }

        let newTods = todos.filter((to) => to.uid !== id);
        setTodos(newTods);

    };

    // On Edit-submit
    const handleOnEdit = (e) => {
        e.preventDefault();

        let newTods = todos.map((tod) => tod.uid === editDetail.id ? { ...tod, text: editValue } : tod);
        setEditValue("");
        setTodos(newTods);
        setShowEditModal(false);
    }

    // on MarkedTdodo

    const handleOnMark = (id) => {
        if (!id) return;
        let prev = todos.map((todo) => todo?.uid === id ? { ...todo, marked: !todo.marked } : todo);

        setTodos(prev);
    }

    // FilterOnCategory 

    const filterTodos = useMemo(() => {
       if(!filterVal || filterVal === "all") return todos;

       return todos.filter((tod)=> tod.category === filterVal);
     }, [todos, filterVal])
    




const handleEditOpen = (todo) => {
    if (!todo) { return; }
    setEditDetail({ id: todo?.uid, todoVal: todo.text })
    setShowEditModal(true);
};

const handleEditCancel = () => {
    setShowEditModal(false);
    setEditDetail({ todoVal: "", id: "" });
    setEditValue("");
};


// useEffcet -> 2 for initial fetch of todo.
useEffect(() => {
    let todoItems = JSON.parse(localStorage.getItem("MY_TODO") || []);
    setTodos(todoItems);
}, []);

// useEffect - 1 -> whenver tods value chnage the localStorage will save the todo.
useEffect(() => {
    localStorage.setItem("MY_TODO", JSON.stringify(todos));
}, [todos]);

// console.log(`Edit todoVal ${editDetail.id} & ${editDetail.todoVal}`);


return (
    <div className="min-h-screen bg-black flex items-start justify-center pt-20 px-4 font-mono">
        <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">todos</h1>
                <p className="text-stone-500 text-sm mt-1">{todos.length} remaining</p>
            </div>

            {/* Input Row */}
            <form onSubmit={(e) => handleAdd(e)}>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChangeInput}
                        placeholder="What needs to be done?"
                        className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-600 outline-none focus:border-stone-500 transition-colors"
                    />
                    <button
                        type="submit"
                        onClick={handleAdd}
                        className="px-4 py-2.5 bg-white text-black text-sm rounded-lg hover:bg-stone-200 active:scale-95 transition-all"
                    >
                        Add
                    </button>

                    <select
                        value={filterVal || "all"}
                        onChange={(e)=> setFilterVal(e.target.value)}
                        className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-violet-500"
                    >
                        <option value="all">All</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="study">Study</option>
                        <option value="shopping">Shopping</option>
                    </select>
                </div>
            </form>

            {/* Todo List */}
            <ul className="space-y-2 mb-6">
                {filterTodos.length === 0 && (
                    <li className="text-center text-stone-600 text-sm py-8">{todos.length === 0 ? "# No todos yet.": `No todos on  ${filterVal} category`}</li>
                )}
                {filterTodos.map((todo) => (
                    <li
                        key={todo.uid}
                        className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 group"
                    >
                        <span className={`text-sm ${todo.marked ? "line-through" : ""} text-stone-300 truncate flex-1 mr-3`}>{todo.text}</span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                            <select
                                value={todo.category || 'all'}
                                onChange={(e) => setTodos(prev =>
                                    prev.map(t =>
                                        t.uid === todo.uid ? { ...todo, category: e.target.value } : t
                                    )
                                )}
                                className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-violet-500"
                            >
                                <option value="all">All</option>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="study">Study</option>
                                <option value="shopping">Shopping</option>
                            </select>

                            <button
                                onClick={() => handleOnMark(todo?.uid)}
                                className="text-xs text-yellow-600 hover:text-white transition-colors px-2 py-1 rounded hover:bg-red-500 "
                            >
                                {todo?.marked ? "unmark" : "Mark"}
                            </button>
                            <button
                                onClick={() => handleEditOpen(todo)}
                                className="text-xs text-stone-500 hover:text-stone-200 transition-colors px-2 py-1 rounded hover:bg-stone-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(todo.uid)}
                                className="text-xs text-red-800 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-950"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Clear All */}
            {todos.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={handleClearAll}
                        className="text-xs text-stone-300 hover:text-red-400 transition-colors underline underline-offset-2"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
            <form onSubmit={(e) => handleOnEdit(e)}>
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-gray-900 rounded-xl border border-stone-100 shadow-xl w-full max-w-sm p-6">
                        <h2 className="text-base font-semibold text-stone-800 mb-1">Edit todo</h2>
                        <p className="text-xs text-stone-400 mb-4">Make changes and save.</p>

                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors resize-none"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleEditCancel}
                                className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm bg-stone-800 text-white rounded-lg hover:bg-stone-700 active:scale-95 transition-all"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )}
    </div>
);
}



export default AdvTodo;