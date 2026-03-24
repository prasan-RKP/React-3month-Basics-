import { useContext, useState } from "react";
import CreateNote from "./Docs/CreateNote";
import EditNote from "./Docs/EditNote";
import SeeNote from "./Docs/SeeNote";
import NotesProvider, { NoteListCONTXT } from "./store/NoteList-store";

const NoteApp = ({}) => {
  const [activeTab, setActiveTab] = useState("see");
  const [editingNote, setEditingNote] = useState(null);
  const [filter, setFilter] = useState("All");
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [marked, setMarked] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Work");
  const tags = ["Work", "Personal", "Reading", "Ideas"];
  const [noteUid, setNoteUid] = useState('');

  const {notes} = useContext(NoteListCONTXT);

  const SAMPLE_NOTES = [
    { id: 1, title: "Sprint Planning Session", content: "Review backlog items, estimate story points with the team. Check velocity from last sprint before estimating. Assign tickets accordingly.", tag: "Work", marked: true, date: "Mar 19" },
    { id: 2, title: "Coffee Blend Recipe", content: "Ethiopia Yirgacheffe 60% + Colombia Huila 40%. Medium-light roast. Brew at 93°C with 28s pre-infusion. Grind size 18 on Comandante.", tag: "Personal", marked: false, date: "Mar 18" },
    { id: 3, title: "Reading List", content: "Thinking Fast and Slow, The Pragmatic Programmer, Blood Meridian, Sapiens. Start with Pragmatic Programmer this weekend.", tag: "Reading", marked: false, date: "Mar 17" },
    { id: 4, title: "API Design Principles", content: "Use REST for CRUD ops, GraphQL for complex nested queries. Always version endpoints. Rate limit everything. Document with OpenAPI 3.0.", tag: "Work", marked: true, date: "Mar 16" },
    { id: 5, title: "Weekend Plan", content: "Saturday: Farmers market in the morning, gym at 4pm. Sunday: Deep work session 10-2pm, call with parents at 7pm.", tag: "Personal", marked: false, date: "Mar 15" },
    { id: 6, title: "App Idea — Focus Timer", content: "Build a Pomodoro-style timer that locks distracting apps. 25 min work, 5 min break. Simple CLI first, then Electron.", tag: "Ideas", marked: false, date: "Mar 14" },
  ];

  const TAG_COLORS = {
    Work: "bg-sky-950 text-sky-400 border-sky-900",
    Personal: "bg-emerald-950 text-emerald-400 border-emerald-900",
    Reading: "bg-violet-950 text-violet-400 border-violet-900",
    Ideas: "bg-amber-950 text-amber-400 border-amber-900",
  };

  //const tags = ["Work", "Personal", "Reading", "Ideas"];


  const tabs = [
    { id: "add", label: "Add Note" },
    { id: "see", label: "See Notes", count: "📓" },
  ];

  console.log(notes)
  const filters = ["All", "Marked", "Work", "Personal", "Reading", "Ideas"];
  const markedCount = SAMPLE_NOTES.filter((n) => n.marked).length;


  return (
    <NotesProvider>
      <div className="min-h-screen bg-black text-white">
        <header
          className="sticky top-0 z-40 border-b border-zinc-900"
          style={{ background: "rgba(0,0,0,0.90)", backdropFilter: "blur(12px)" }}
        >
          <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center gap-6">
            <div className="flex items-center gap-2.5 mr-4">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black text-sm font-bold select-none">
                N
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">Notely</span>
            </div>

            <nav className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${active
                      ? "bg-white text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                      }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? "bg-zinc-200 text-zinc-600" : "bg-zinc-800 text-zinc-600"
                          }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex-1" />
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400">
              U
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          {activeTab === "add" && (
            <div className="max-w-2xl mx-auto py-2">
              <div className="mb-8">
                <h2 className="text-white text-2xl font-semibold">New Note</h2>
                <p className="text-zinc-600 text-sm mt-1">Capture your thought before it slips away.</p>
              </div>

              {/* Start */}
              <CreateNote tags={tags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} TAG_COLORS={TAG_COLORS} />
              {/* End */}
            </div>
          )}

          {activeTab === "see" && (
            <SeeNote activeTab={activeTab} SAMPLE_NOTES={SAMPLE_NOTES} markedCount={markedCount} TAG_COLORS={TAG_COLORS} filters={filters} filter={filter} hoveredNoteId={hoveredNoteId} setHoveredNoteId={setHoveredNoteId} setEditingNote={setEditingNote} setNoteUid={setNoteUid} />
          )}
        </main>

        {editingNote && (
          <EditNote editingNote={editingNote} setEditingNote={setEditingNote} noteUid={noteUid}/>
        )}
      </div>
    </NotesProvider>
  );
};

export default NoteApp;