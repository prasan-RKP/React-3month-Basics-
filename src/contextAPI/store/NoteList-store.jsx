import { createContext, useEffect, useReducer, useRef, useState } from "react";


// step-1 -> create context
export const NoteListCONTXT = createContext({
    notes: [],
    loading: false,
    addNote: () => { },
    editNote: () => { },
    deleteNote: () => { },
    markNote: () => { }
});


// step - 2 -> create reducer
const noteReducer = (currNotes, action) => {

    switch (action.type) {
        case "ADD_NOTE":
            return [action.payload.note, ...currNotes];

        case "MARK_NOTE":
            return currNotes.map((note) =>
                note?.uid === action.payload.uid
                    ? { ...note, marked: action.payload.val } : note
            );

        case "DEL_NOTE":
            return currNotes.filter((note) => note?.uid !== action.payload.uid);

        case "EDIT_NOTE":
            return currNotes.map(note =>
                note?.uid === action.payload.uid
                    ? { ...note, title: action.payload.newTitle, content: action.payload.newContent } : note
            );

        case "INT_NOTE":
            return action.payload.notes;


        default:
            return currNotes;
    }
}



// step-3 (note Provider)

const NotesProvider = ({ children }) => {

    const [notes, dispatchNote] = useReducer(noteReducer, []);
    const [myLoading, setMyLoading] = useState(false);
    const isInitialized = useRef(false);
    // Action for store initial notes
    const fetchNotes = async () => {
        setMyLoading(true);
        try {
            const notesRaw = localStorage.getItem("NOTE");
            const notes = notesRaw ? JSON.parse(notesRaw) : [];

            dispatchNote({
                type: "INT_NOTE",
                payload: { notes }
            });

            // enabling the first render
            isInitialized.current = true;
        } catch (error) {
            console.error("Error fetching notes action -> INT_NOTE:", error);
        } finally {
            setMyLoading(false);
        }
    }

    // Initial fetching Notes
    useEffect(() => {
        if (!isInitialized.current) return;
        localStorage.setItem("NOTE", JSON.stringify(notes));
    }, [notes]);


    useEffect(() => {
        fetchNotes();
    }, []);


    // ----- Add Note -----
    const addNote = (note) => {
        setMyLoading(true);
        try {
            dispatchNote({
                type: "ADD_NOTE",
                payload: { note }
            })
        } catch (error) {
            console.error("Error adding note -> 'ADD_NOTE':", error);
        }
        finally {
            setMyLoading(false);
        }
    }

    // ---- Mark Note ----

    const markNote = (uid, val) => {
        setMyLoading(true);
        try {
            dispatchNote({
                type: "MARK_NOTE",
                payload: {uid, val}
            })
        } catch (error) {
             console.log("Error marking note'MARK_NOTE'", error);
        }
        finally{
            setMyLoading(false);
        }
    }

    //  ---- Delete Note ----
    const deleteNote = (uid) => {
        setMyLoading(true);
        try {
            dispatchNote({
                type: 'DEL_NOTE',
                payload: { uid }
            })
        } catch (error) {
            console.log("Error delteing not 'DEL_NOTE'", error);
        }
        finally {
            setMyLoading(false);
        }
    }


    // ------ Edit Note ------
    const editNote = (uid, note) => {
        setMyLoading(true);
        try {
            dispatchNote({
                type: "EDIT_NOTE",
                payload: {
                    uid,
                    title: note.title,
                    content: note.content
                }
            })
        } catch (error) {
            console.error("Error editing note:", err);
        }

        finally {
            setMyLoading(false);
        }
    };

    return (
        <NoteListCONTXT.Provider
            value={{
                notes,
                loading: myLoading,
                addNote,
                deleteNote,
                editNote,
                markNote
            }}
        >
            {children}
        </NoteListCONTXT.Provider>
    )


}

export default NotesProvider;