import React, { useContext, useEffect, useRef, useState } from 'react'
import { NoteListCONTXT } from '../store/NoteList-store';
import { Loader2, Plus } from 'lucide-react';


const CreateNote = ({ TAG_COLORS, tags, selectedTag, setSelectedTag }) => {

    const { addNote } = useContext(NoteListCONTXT);

    const [loading, setLoading] = useState(false);

    // 1. Store the data for real time inpu value
    const [myTitle, setMyTitle] = useState('');
    const [myContent, setMyContent] = useState('');


    // 2. To store debounced Values + to store both values timeout's
    const debouncedValues = useRef({ title: "", content: "" });
    const timers = useRef({});

    // 3. debounce function to store all teh debounced Value

    const debounce = (key, value, delay = 1000) => {
        clearTimeout(timers.current[key]);
        timers.current[key] = setTimeout(() => {
            debouncedValues.current[key] = value; // update the value after delay
        }, delay);
    }

    // 4.const onChnage Method to store all values instantChnags + debounced val
    const handleChange = (key, value) => {
        if (key === "title") setMyTitle(value);
        if (key === "content") setMyContent(value);
        debounce(key, value);

    }
    // 6. handleClear the input fileds
    const handleClear = () => {
        setMyTitle('')
        setMyContent('')
        debouncedValues.current = { title: '', content: '' }
        setSelectedTag(null)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        let myTitle = debouncedValues.current.title;
        let myContent = debouncedValues.current.content;
        let mytag = selectedTag;
        let uid = Date.now().toString(36).slice(-4).toUpperCase();
        let note = { uid, title: myTitle, content: myContent, tag: mytag, marked: false };

        addNote(note);
        handleClear();
        setLoading(false);

    }

    useEffect(() => {
        return () => {
            Object.values(timers.current).forEach(clearTimeout);
        }
    }, []);


    console.log("Loading status ->", loading);



    return (
        <div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-zinc-500 uppercase tracking-widest">Title</label>
                        <input
                            type="text"
                            value={myTitle}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="What's this note about?"
                            className="bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-700 transition-colors w-full outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-zinc-500 uppercase tracking-widest">Content</label>
                        <textarea
                            value={myContent}
                            onChange={(e) => handleChange('content', e.target.value)}
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
                                        type="button"
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
                        <button type="button" onClick={handleClear} className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Clear fields</button>
                        <div className="flex gap-2">
                            <button type="button" className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-red-600 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2.5 text-sm bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors">
                                {loading ? (<Loader2 className='h-5 w-5 animate-spin' />

                                ) : (<>Save Note</>)}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateNote
