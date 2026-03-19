import { createContext, useEffect, useReducer, useState } from "react";


// step-1 -> create context
export const NoteListCONTXT = createContext({
    notes: [],
    loading: false,
    addNote: () => { },
    editNote: () => { },
    deleteNote: () => { }
});


// step - 2 -> create reducer
const noteReducer = (currNotes, action) => {

    switch (action.type) {
        case "ADD_NOTE":
            return [action.payload.note, ...currNotes];

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

const NotesProvider = ({children}) => {

    const [notes, dispatchNote] = useReducer(noteReducer, []);
    const [loading,setLoading] = useState(false);

    // Action for store initial notes
    const fetchNotes = async () => {
        setLoading(true);
        try {
            let notes = JSON.parse(localStorage.getItem("NOTE")) || [];
            dispatchNote({
                type: "INT_NOTE",
                payload: {notes: notes}
            })
        } catch (error) {
            setLoading(false);
            console.error("Error fetching notes action -> INT_NOTE :", error);
        }
        finally{
            setLoading(false);
        }
    }

    // Initial fetching Notes
    useEffect(()=> {
          fetchNotes();
    }, []);


    // ----- Add Note -----
    const addNote = (data) => {
        setLoading(true);
        try {
            dispatchNote({
                type: "ADD_NOTE",
                payload: {note: data.note}
            })
        } catch (error) {
            setLoading(false);
           console.error("Error adding note -> 'ADD_NOTE':", error);
        }
        finally{
            setLoading(false);
        }
    }

    //  ---- Delete Note ----
    const deleteNote = (uid) => {
        setLoading(true);
        try {
            dispatchNote({
                type: 'DEL_NOTE',
                payload: {uid}
            })
        } catch (error) {
            setLoading(false);
            console.log("Error delteing not 'DEL_NOTE'", error);
        }
        finally{
            setLoading(false);
        }
    }


    // ------ Edit Note ------
    const editNote = (uid, data) => {
        setLoading(true);
        try {
            dispatchNote({
                type: "EDIT_NOTE",
                payload: {
                    uid,
                    title: data.title,
                    content: data.content
                }
            })
        } catch (error) {
            setLoading(false);
            console.error("Error editing note:", err);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <NoteListCONTXT.Provider
         value={{
            notes,
            loading,
            addNote,
            deleteNote,
            editNote
         }}
        >
            {children}
        </NoteListCONTXT.Provider>
    )


}
