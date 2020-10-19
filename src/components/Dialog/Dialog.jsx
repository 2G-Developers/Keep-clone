import React, {useState,useEffect } from 'react';
import {ReactComponent as Trash } from '../../images/trash.svg'
import {ReactComponent as Archive } from '../../images/archive.svg'
import {ReactComponent as Pinned } from '../../images/push-pin.svg'
import { useDispatch} from 'react-redux'
import { addNote, updateNote, deleteNote, archiveNote, pinnedNote } from '.././../redux'

function Dialog({id, isDialogOpen, setDialog, isAddNote, noteTitle, noteDesc, noteArchive, notePinned}) {
    const [title, setTitle] = useState(noteTitle);
    const [description, setDescription] = useState(noteDesc);
    const [archive, setArchive] = useState(false);
    const [pin, setPin] = useState(false);

    const dispatch = useDispatch()

    const dialogToggle = isDialogOpen ? 'dialog dialog--open' : 'dialog';
    

    useEffect(() => {
        // To prevent scroll when modal is opened
        document.querySelector('body').style.overflow = isDialogOpen ? "hidden": "unset";
        return () => {
            document.querySelector('body').style.overflow = "unset"
        }
    }, [isDialogOpen])

    function updateNoteData(argArchive=false, argPinned=false) {
        if(title !== "" || description !== "") {
            // Initialize Data
            let data = {
                id,
                title,
                description,
                isArchive: archive,
                isPinned: pin,
                isDialogOpen: false
            }

            if(isAddNote) {
                // Update the archive or pin while creating new notes
                if(argArchive) {
                    data.isArchive = true;
                    setArchive(false)
                }
                if(argPinned) {
                    data.isPinned = true;
                    setPin(false)
                }

                // Add note
                dispatch(addNote(data))

                // Once note created, clear all the data
                setTitle('');
                setDescription('');
                setDialog(prevState => !prevState)
            } else {
                // Update data 
                data.isArchive = noteArchive;
                data.isPinned = notePinned;
                dispatch(updateNote({...data,isDialogOpen: false}))

                // archive or pinn when model is open
                if(argArchive) {
                    dispatch(archiveNote(id))
                }
                if(argPinned) {
                    dispatch(pinnedNote(id))
                }
            }
        } else {
            if(!isAddNote) {
                // If user delete title and desc from already created note, Then delete
                dispatch(deleteNote(id))
            } else {
                setDialog(prevState => !prevState)
            }
        }
        
    }

    function clearNotes() {
        setTitle('')
        setDescription('')
    }


    return (
        <>
            { isDialogOpen ? (<div className="card__backdrop" onClick={() => updateNoteData()}></div>) : null }

            <div className={dialogToggle}>
                <input className="card__title card__title--input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="card__desc card__desc--dialog" rows="3" value={description} placeholder="Write Something" onChange={(event) => setDescription(event.target.value)} />

                <div className="card__options card__options--dialog">
                    <div className="card__options-wrapper">
                        {isAddNote ? <p className="dialog__text dialog__text--clear" onClick={() => clearNotes()}>clear</p> : null}
                        { !isAddNote ? <Trash className="card__icon" onClick={() => dispatch(deleteNote(id))} /> : null }
                        <Archive className={`card__icon ${noteArchive ? 'card__icon--active-stroke': ''}`} onClick={() => updateNoteData(true, false) } />
                        <Pinned className={`card__icon card__icon--pinned ${notePinned ? 'card__icon--active': ''}`} onClick={() =>updateNoteData(false, true)} />
                        {
                            // eslint-disable-next-line
                        }<p className="dialog__text" onClick={() => updateNoteData()}>Close</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dialog;