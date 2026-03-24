import React, { useContext } from 'react'
import { NoteListCONTXT } from '../store/NoteList-store';
import NoteSkeleton from './NoteSkeleton';

const SeeNote = ({ activeTab, SAMPLE_NOTES, markedCount, TAG_COLORS, filters, filter, hoveredNoteId, setHoveredNoteId, setEditingNote, setNoteUid }) => {

    const { notes, loading, deleteNote, markNote } = useContext(NoteListCONTXT);

    const handleInfo = (noteUid) => {
       setEditingNote(true);
       setNoteUid(noteUid); 
    }

    if (loading) {
        return <NoteSkeleton />;
    }

    return (
        <div>
            <div>
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-white text-2xl font-semibold">Your Notes</h2>
                        <p className="text-zinc-600 text-sm mt-1">
                            {notes?.length} notes.
                        </p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {Object.entries(TAG_COLORS).map(([tag, cls]) => {
                            const count = SAMPLE_NOTES.filter((n) => n.tag === tag).length;
                            if (!count) return null;
                            return (
                                <span key={tag} className={`text-[10px] px-2.5 py-1 rounded-full border ${cls}`}>
                                    {count} {tag}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search by title or content..."
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-700 transition-colors outline-none mb-5"
                />

                <div className="flex gap-2 mb-7 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all ${filter === f
                                ? "bg-zinc-100 text-zinc-900 border-zinc-100 font-medium"
                                : "bg-zinc-950 text-zinc-600 border-zinc-800 hover:border-zinc-600 hover:text-zinc-400"
                                }`}
                        >
                            {f}
                            {f === "All" && (
                                <span className={`ml-1.5 text-[9px] ${filter === f ? "text-zinc-500" : "text-zinc-700"}`}>
                                    {SAMPLE_NOTES.length}
                                </span>
                            )}
                            {f === "Marked" && (
                                <span className={`ml-1.5 text-[9px] ${filter === f ? "text-zinc-500" : "text-zinc-700"}`}>
                                    {markedCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {notes.map((note) => {
                        const tagCls = TAG_COLORS[note.tag] || "bg-zinc-900 text-zinc-400 border-zinc-800";
                        const isHovered = hoveredNoteId === note.uid; // ✅ use note.uid consistently

                        return (
                            <div
                                key={note.uid}
                                onMouseEnter={() => setHoveredNoteId(note.uid)} // ✅ uid here too
                                onMouseLeave={() => setHoveredNoteId(null)}
                                className={`relative rounded-xl p-5 flex flex-col gap-3 border transition-all duration-150 ${note.marked ? "bg-zinc-950 border-amber-900/40" : "bg-zinc-950 border-zinc-800"
                                    } ${isHovered ? "border-zinc-600" : ""}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${tagCls}`}>
                                        {note.tag}
                                    </span>
                                    <span className="text-[11px] text-zinc-600">{note.date}</span>
                                </div>

                                <div>
                                    <h3 className="text-[15px] font-medium text-zinc-100 mb-1 leading-snug">{note.title}</h3>
                                    <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2">{note.content}</p>
                                </div>

                                {note.marked && (
                                    <span className="text-[11px] text-amber-500">★ marked</span>
                                )}

                                <div className="h-5" />

                                {/* ✅ Only these three buttons, shown on hover */}
                                {isHovered && (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                                        <button onClick={()=> markNote(note?.uid, !note?.marked)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-amber-400 hover:bg-amber-900/20 transition-colors">
                                            {note.marked ? "unmark" : "mark"}
                                        </button>
                                        <button 
                                        onClick={()=>handleInfo(note?.uid)}
                                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors">
                                            edit
                                        </button>
                                        <button
                                            onClick={() => deleteNote(note?.uid)}
                                            className="text-[11px] px-2.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 transition-colors">
                                            delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-[11px] text-zinc-800 mt-8">hover a note to reveal actions</p>
            </div>
        </div>
    )
}

export default SeeNote
