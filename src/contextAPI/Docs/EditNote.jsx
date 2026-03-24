import React, { useContext, useState } from 'react'
import { NoteListCONTXT } from '../store/NoteList-store'
import { Loader2 } from 'lucide-react';

const EditNote = ({ editingNote, setEditingNote, noteUid }) => {

  const { editNote, loading } = useContext(NoteListCONTXT);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');


  const onUpdateNote = (e) => {
    e.preventDefault();

    try {
      let uid = noteUid;
      let note = { title: newTitle, content: newContent };
      editNote(uid, note);
      setEditingNote(false);
    } catch (error) {
      console.log("Erro in 'EditNote.jsx'", error);
    }

  }

  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.80)" }}
      >
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-green-600 font-semibold text-lg ">Edit Note 📓</h3>
              <p className="text-[11px] text-zinc-600 mt-0.5">{editingNote.date}</p>
            </div>
            <button
              onClick={() => setEditingNote(null)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={onUpdateNote}>
            <div className="flex flex-col gap-4">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm w-full outline-none transition-colors"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={5}
                className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm resize-none leading-relaxed w-full outline-none transition-colors"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors">
                  {loading ? (<><Loader2 className='h-5 w-5 animate-spin' /></>) : (<>
                    Update Note
                  </>)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditNote
