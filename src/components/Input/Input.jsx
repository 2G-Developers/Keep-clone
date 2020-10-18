import React from 'react';
import Dialog from '../Dialog/Dialog';
import {useSelector} from 'react-redux'
import { useState } from 'react';

function Input() {
    const total = useSelector(state => state.total)
    const [dialog, setDialog] = useState(false)

    return (
        <>
            <div className="input" onClick={() => setDialog(prevState => !prevState)}>
                <div className="input__editable">Take a note...</div>
            </div>

            <Dialog id={total} isDialogOpen={dialog} setDialog={setDialog} isAddNote={true} noteTitle="" noteDesc="" />
        </>
    );
}

export default Input;