import React from 'react';
import {ReactComponent as Trash } from '../../images/trash.svg'
import {ReactComponent as Archive } from '../../images/archive.svg'
import {ReactComponent as Pinned } from '../../images/push-pin.svg'
import { useDispatch} from 'react-redux'
import { deleteNote, archiveNote, pinnedNote, setNoteDialog } from '.././../redux'
import Dialog from '../Dialog/Dialog';

function Card({note}) {
    const dispatch = useDispatch()
    const isCardPin = note.isPinned ? 'card__icon card__icon--pinned card__icon--active': 'card__icon card__icon--pinned';
    const isCardArchive = note.isArchive ? 'card__icon card__icon--active-stroke': 'card__icon';
    
    return (
        <>
            <div className="card">
                <div className="card__title" onClick={() => dispatch(setNoteDialog(note.id))}>
                    {note.title}
                </div>
                <div className="card__desc" onClick={() => dispatch(setNoteDialog(note.id))}>
                    {note.description}
                </div>
                <div className="card__options">
                    <div className="card__options-wrapper">
                        <Trash className='card__icon' onClick={() => dispatch(deleteNote(note.id))} />
                        <Archive className={`${isCardArchive}`} onClick={() => dispatch(archiveNote(note.id))} />
                        <Pinned className={`${isCardPin}`} onClick={() => dispatch(pinnedNote(note.id))} />
                    </div>
                </div>
            </div>

            <Dialog 
                id={note.id} 
                isAddNote={false} 
                isDialogOpen={note.isDialogOpen} 
                noteTitle={note.title} 
                noteDesc={note.description}
                noteArchive={note.isArchive}
                notePinned={note.isPinned} />
        </>
    );
}

export default Card;