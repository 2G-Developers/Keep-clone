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
        document.querySelector('body').style.overflow = isDialogOpen ? "hidden": "unset";
        return () => {
            document.querySelector('body').style.overflow = "unset"
        }
    }, [isDialogOpen])

    function updateNoteData(argArchive=false, argPinned=false) {
        if(title !== "" || description !== "") {
            let data = {
                id,
                title,
                description,
                isArchive: archive,
                isPinned: pin,
                isDialogOpen: false
            }

            if(isAddNote) {
                if(argArchive) {
                    data.isArchive = true;
                    setArchive(false)
                }
                if(argPinned) {
                    data.isPinned = true;
                    setPin(false)
                }
                dispatch(addNote(data))
                setTitle('');
                setDescription('');
                setDialog(prevState => !prevState)
            } else {
                data.isArchive = noteArchive;
                data.isPinned = notePinned;
                dispatch(updateNote({...data,isDialogOpen: false}))
            }
        } else {
            if(!isAddNote) {
                dispatch(deleteNote(id))
            } else {
                setDialog(prevState => !prevState)
            }
        }
        
    }

    return (
        <>
            { isDialogOpen ? (<div className="card__backdrop" onClick={() => updateNoteData()}></div>) : null }

            <div className={dialogToggle}>

                <input className="card__title card__title--input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <textarea className="card__desc card__desc--dialog" rows="3" value={description} placeholder="Write Something" onChange={(event) => setDescription(event.target.value)} />
                <div className="card__options card__options--dialog">
                    <div className="card__options-wrapper">
                        { !isAddNote ? <Trash className="card__icon" onClick={() => dispatch(deleteNote(id))} /> : null }
                        <Archive className={`card__icon`} onClick={() => {isAddNote ? updateNoteData(true, false) : dispatch(archiveNote(id))}} />
                        <Pinned className={`card__icon card__icon--pinned`} 
                            onClick={() => {isAddNote ?  updateNoteData(false, true): dispatch(pinnedNote(id))}} />
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