import React from 'react'

const CreateNote = ({tags, selectedTag, TAG_COLORS}) => {
    return (
        <div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-zinc-500 uppercase tracking-widest">Title</label>
                    <input
                        type="text"
                        placeholder="What's this note about?"
                        className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-700 transition-colors w-full outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-zinc-500 uppercase tracking-widest">Content</label>
                    <textarea
                        placeholder="Start writing..."
                        rows={7}
                        className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-700 resize-none leading-relaxed transition-colors w-full outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-zinc-500 uppercase tracking-widest">Category</label>
                    <div className="flex gap-2 flex-wrap">
                        {tags.map((tag) => {
                            const active = selectedTag === tag;
                            const tagCls = TAG_COLORS[tag] || "";
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all ${active ? tagCls : "bg-zinc-900 text-zinc-600 border-zinc-800 hover:border-zinc-700 hover:text-zinc-400"
                                        }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-zinc-800/60" />

                <div className="flex items-center justify-between">
                    <button className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Clear fields</button>
                    <div className="flex gap-2">
                        <button className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-red-600 rounded-xl transition-colors">
                            Cancel
                        </button>
                        <button className="px-6 py-2.5 text-sm bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors">
                            Save Note
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateNote
