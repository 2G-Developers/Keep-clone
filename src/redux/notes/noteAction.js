import { ADD_NOTE, UPDATE_NOTE, SET_DIALOG, SEARCH_TEXT, DELETE_NOTE, ARCHIVE_NOTE,PINNED_NOTE } from './noteType'

export const addNote = (note) => {
    return {
        type: ADD_NOTE,
        payload: note
    }
}

export const updateNote = (note) => {
    return {
        type: UPDATE_NOTE,
        payload: note
    }
}

export const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}

export const archiveNote = (id) => {
    return {
        type: ARCHIVE_NOTE,
        payload: id
    }
}

export const pinnedNote = (id) => {
    return {
        type: PINNED_NOTE,
        payload: id
    }
}

export const searchNote = (value) => {
    return {
        type: SEARCH_TEXT,
        payload: value
    }
}

export const setNoteDialog = (id) => {
    return {
        type: SET_DIALOG,
        payload: id
    }
}