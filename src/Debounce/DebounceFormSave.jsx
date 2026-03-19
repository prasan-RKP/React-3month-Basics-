import { useState, useRef, } from "react";


// ✅ Debounce func
function debounce(fn, delay) {
    let timer;                         

    return function (...args) {        
        clearTimeout(timer);             
        timer = setTimeout(() => {       
            fn(...args);                   
        }, delay);
    };
}


// ✅ Saving Dynamically to Server
async function saveToServer(formData) {
    const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: formData.name,
            body: formData.message,
            userId: 1,
        }),
    });

    if (!response.ok) throw new Error("Save failed");
    return await response.json();
}


// ✅ debounce Form save 
const DebounceFormSave = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    // Possible values: "idle" | "waiting" | "saving" | "saved" | "error"
    const [status, setStatus] = useState("idle");

    // useRef stores the debounced function WITHOUT re-creating it on every render.
    // Why ref? If we wrote debounce(...) directly in the component body,
    // React would create a brand-new function on every keystroke → breaks debounce.
    const debouncedSave = useRef(
        debounce(async (latestForm) => {
            setStatus("saving");
            try {
                await saveToServer(latestForm);
                setStatus("saved");
            } catch {
                setStatus("error");
            }
        }, 1000)   // 1000ms = 1 second of no typing → save fires
    ).current;


    // ─────────────────────────────────────────
    //  Called on EVERY keystroke
    // ─────────────────────────────────────────
    function handleChange(e) {
        const { name, value } = e.target;

        // 1. Update the form state immediately (keeps the input responsive)
        const updatedForm = { ...form, [name]: value };
        setForm(updatedForm);

        // 2. Show "waiting" in the status bar
        setStatus("waiting");

        // 3. Call the debounced save — timer resets every keystroke
        //    Only actually runs saveToServer() after 1s of no typing
        debouncedSave(updatedForm);
    }


    // ─────────────────────────────────────────
    //  Status bar display config
    // ─────────────────────────────────────────
    const statusConfig = {
        idle: { label: "Not saved yet", color: "text-gray-400", dot: "bg-gray-300" },
        waiting: { label: "Waiting 1s...", color: "text-yellow-500", dot: "bg-yellow-400" },
        saving: { label: "Saving...", color: "text-blue-500", dot: "bg-blue-400" },
        saved: { label: "Saved ✓", color: "text-green-500", dot: "bg-green-400" },
        error: { label: "Failed ✗", color: "text-red-500", dot: "bg-red-400" },
    };

    const current = statusConfig[status];

    const inputClass =
        "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Auto-Save Form</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Type anything — saves automatically after{" "}
                    <span className="font-semibold text-gray-700">1 second</span> of inactivity.
                    No submit button.
                </p>

                {/* Form card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                        <span className={`w-2 h-2 rounded-full ${current.dot}`} />
                        <span className={`text-xs font-medium ${current.color}`}>
                            {current.label}
                        </span>
                    </div>

                    {/* Fields */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                Name
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Start typing... it will save by itself"
                                rows={4}
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                    </div>
                </div>

                {/* Explanation box */}
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800 leading-relaxed space-y-1">
                    <p><strong>Flow on every keystroke:</strong></p>
                    <p>1. <code className="bg-blue-100 px-1 rounded">handleChange</code> → updates form state instantly</p>
                    <p>2. <code className="bg-blue-100 px-1 rounded">debouncedSave()</code> → clears old timer, starts new 1s timer</p>
                    <p>3. After 1s of no typing → <code className="bg-blue-100 px-1 rounded">saveToServer()</code> finally runs</p>
                </div>

            </div>
        </div>
    );
}

export default DebounceFormSave;