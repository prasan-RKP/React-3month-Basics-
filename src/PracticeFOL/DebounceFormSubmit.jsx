import { useState, useRef } from "react";
import { toast } from 'sonner';

const debounce = (fn, delay) => {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    }
}

const DebounceFormSubmit = () => {

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");


    // form save function
    const formSave = (formVal) => {
        if (!formVal?.name && !formVal?.email && !formVal.message) {
            setStatus("fill");
            toast.error("form can't be Empty");
            return '';
        }
        console.log(`Form value Submitted`, formVal);
        setForm({ name: "", email: "", message: "" })
    }



    // helper fn which will provide all the stuff to 'debounce' fn
    const debounceHelper = useRef(
        debounce((latestForm) => {
            setStatus("saving")
            try {
                formSave(latestForm);
                setStatus("saved")
            } catch (error) {
                setStatus("error");
            }
        }, 1000)
    ).current;


    function handleChange(e) {
        let { name, value } = e.target;
        // 1) update the form value
        let updatedForm = { ...form, [name]: value };
        setForm(updatedForm);
        // 2) update the status indicator aswell
        setStatus("waiting");

        // 3) A helper function which will help us to give us our all operation tobe 1sec delay,
        debounceHelper(updatedForm);

    }

    const statusConfig = {
        idle: { label: "idle — not saved yet", dot: "bg-gray-500", text: "text-gray-400" },
        waiting: { label: "waiting 1s...", dot: "bg-amber-400", text: "text-amber-400" },
        saving: { label: "saving...", dot: "bg-blue-400", text: "text-blue-400" },
        saved: { label: "saved", dot: "bg-green-400", text: "text-green-400" },
        error: { label: "failed", dot: "bg-red-400", text: "text-red-400" },
        fill: { label: "fill it", dot: "bg-red-400", text: "text-red-400" }
    };

    const { label, dot, text } = statusConfig[status];

    const inputClass = `
    w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3.5 py-2.5
    text-sm text-white placeholder-zinc-500
    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
    transition-all duration-150
  `;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-md">

                {/* heading */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-white mb-1">Auto-save form</h1>
                    <p className="text-sm text-zinc-400">
                        Saves after <span className="font-medium text-zinc-200">1 second</span> of inactivity. No submit button.
                    </p>
                </div>

                {/* card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">

                    {/* status pill */}
                    <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full">
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        <span className={`text-xs font-medium ${text}`}>{label}</span>
                    </div>

                    {/* name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={inputClass}
                        />
                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={inputClass}
                        />
                    </div>

                    {/* message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Start typing..."
                            rows={4}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                </div>

                {/* flow hint */}
                <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                    <p className="text-xs font-medium text-zinc-300 mb-0.5">Keystroke flow</p>
                    <p className="text-xs text-zinc-500">onChange → waiting → 1s no typing → saving → saved</p>
                </div>

            </div>
        </div>
    );
};

export default DebounceFormSubmit;