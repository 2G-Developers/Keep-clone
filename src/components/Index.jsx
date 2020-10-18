import React, { useState, useMemo } from 'react'
import Input from './Input/Input';
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import { useSelector} from 'react-redux'

import Archived from './Archived/Archived';
import Notes from './Notes/Notes';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Result from './Result/Result';

function Index() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const search = useSelector(state => state.searchText)
    const notes = useSelector(state => state.notes)

    // Notes logic
    const filteredData = useMemo(() => {
        return notes.filter(el => {
            if(el.title.toLowerCase().includes(search.toLowerCase())) {
                return el.title.toLowerCase().includes(search.toLowerCase())
            }
            return el.description.toLowerCase().includes(search.toLowerCase())
        });
    }, [notes, search])

    const pinnedNotes = useMemo(() => {
        return notes.filter(el => el.isPinned)
    }, [notes])

    const unPinnedNotes = useMemo(() => {
        return notes.filter(el => {
            if(el.isPinned){
                return !el.isPinned
            }
            return !el.isArchive
        })
    }, [notes])

    const archivedNotes = useMemo(() => notes.filter(el => el.isArchive), [notes])

    const userSearch = (search.length > 0) ? (<Route 
        path="/" 
        exact
        render={(props) => <Result {...props} filteredData={filteredData} />} 
        />) :
        (<Route 
            path="/" 
            exact
            render={(props) => <Notes {...props} unPinnedNotes={unPinnedNotes} pinnedNotes={pinnedNotes}/>} 
        />)

    const userSearchArchive = (search.length > 0) ? (<Route 
        path="/archive" 
        exact
        render={(props) => <Result {...props} filteredData={filteredData} />} 
        />) :
        (<Route 
            path="/archive" 
            exact
            render={(props) => <Archived {...props} archivedNotes={archivedNotes} />} 
        />)

    return (
        <Router>
            <div style={{height: "100%"}}>
                <Navbar sidebar={isSidebarOpen} setSidebarToggle={setIsSidebarOpen} />
                <div className="wrapper">
                    <Sidebar sidebar={isSidebarOpen} />

                    <div className="workspace">
                        {
                        (search.length > 0)
                        ?
                        null
                        :
                        <div className="workspace__input">
                            <Input />
                        </div>
                        }
                        
                        <div className="workspace__area">
                            <Switch>
                                
                                {userSearch}
                                
                                {userSearchArchive}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Index