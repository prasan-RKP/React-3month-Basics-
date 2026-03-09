import React from 'react'

const EditModal = ({setEdit, onEditTodo, setEditText, editText}) => {
    return (
        <div>
            <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
                onClick={(e) => e.target === e.currentTarget && setEdit(false)}
            >
                <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-7 w-full max-w-md shadow-2xl">
                    <p className="text-zinc-100 text-lg font-semibold mb-5 tracking-tight">✏️ Edit Todo</p>
                    <form onSubmit={(e) => onEditTodo(e)} className="flex flex-col gap-3">
                        <input
                            value={editText}
                            type="text"
                            autoFocus
                            onChange={(e) => setEditText(e.target.value)}
                            placeholder="Update your todo..."
                            className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition"
                        />
                        <div className="flex gap-2 mt-1">
                            <button
                                type="submit"
                                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEdit(false)}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium py-2.5 rounded-xl border border-zinc-700 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditModal
