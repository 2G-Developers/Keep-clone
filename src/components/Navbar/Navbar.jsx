import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {ReactComponent as Close } from '../../images/x.svg'
import {searchNote} from '../../redux'
import Toggle from '../Toggle/Toggle'

export default function Navbar({setSidebarToggle, sidebar}) {

    const search = useSelector(state => state.searchText)
    const dispatch = useDispatch()
    return (
        <nav className="navbar">
            <div className="navbar__icon" onClick={() => setSidebarToggle(!sidebar)}>
                <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </div>
            <div className="navbar__search">
                <input type="text" placeholder="Search" value={search} onChange={(e) => dispatch(searchNote(e.target.value))} />
                {search.length > 0 ? <Close class="navbar__icon--close" onClick={() => dispatch(searchNote(''))} /> : null}
            </div>
            <div className="navbar__title">
                <Toggle />
                <p>Google Keep</p>
            </div>
        </nav>
    )
}
