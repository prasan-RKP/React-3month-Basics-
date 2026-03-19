import React from 'react'

const EditNote = ({editingNote, setEditingNote}) => {
  return (
    <div>
      <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.80)" }}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-semibold text-lg">Edit Note</h3>
                <p className="text-[11px] text-zinc-600 mt-0.5">{editingNote.date}</p>
              </div>
              <button
                onClick={() => setEditingNote(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                defaultValue={editingNote.title}
                className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm w-full outline-none transition-colors"
              />
              <textarea
                defaultValue={editingNote.content}
                rows={5}
                className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm resize-none leading-relaxed w-full outline-none transition-colors"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setEditingNote(null)}
                  className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 text-sm bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors">
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditNote
