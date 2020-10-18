import { ADD_NOTE, DELETE_NOTE, SET_DIALOG, SEARCH_TEXT, UPDATE_NOTE, ARCHIVE_NOTE, PINNED_NOTE } from './noteType'

const initialState = {
    notes: [],
    total: 0,
    searchText: '',
}

const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NOTE: return {
            ...state,
            total: state.total + 1,
            notes: [...state.notes, action.payload]
        }

        case UPDATE_NOTE: 
            const index = state.notes.findIndex((e) => e.id === action.payload.id)
            const updatedNote = [...state.notes];
            updatedNote.splice(index, 1, action.payload)
            return {
                ...state,
                notes: [
                    ...updatedNote
                ]
            }

        case DELETE_NOTE:
            const deletedNote = state.notes.filter(item => item.id !== action.payload )
            return {
                ...state,
                notes: [...deletedNote]
            }

        case ARCHIVE_NOTE:
            return {
                ...state,
                notes: state.notes.map((element) => {
                    if(element.id === action.payload) {
                        return {...element, isArchive: !element.isArchive, isPinned: false}
                    }
                    return {...element}
                })
            }
        case PINNED_NOTE:
            return {
                ...state,
                notes: state.notes.map((element) => {
                    if(element.id === action.payload) {
                        return {...element, isPinned: !element.isPinned, isArchive: false}
                    }
                    return {...element}
                })
            }
        case SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            }
        case SET_DIALOG:
            return {
                ...state,
                notes: state.notes.map((element) => {
                    if(element.id === action.payload) {
                        return {...element, isDialogOpen: !element.isDialogOpen}
                    }
                    return {...element}
                })
            }
        default: return state
    }
}

export default noteReducer