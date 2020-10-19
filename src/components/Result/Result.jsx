import React from 'react';
import CardList from '../CardList/CardList';

function Result({filteredData}) {
    const archivedNote = filteredData.filter(element => element.isArchive )
    const pinnedNote = filteredData.filter(element => element.isPinned )
    const unPinnedNote = filteredData.filter(element => {
        if(element.isPinned) {
            return !element.isPinned
        }
        return !element.isArchive
    })
    
    return (
        <>
            <h2>Search Result</h2>
            {pinnedNote.length > 0 ? <h2 class="primary-heading">Pinned</h2> : null}
            <div className="workspace__pinned">
                <CardList cards={pinnedNote} />
            </div>
            
            {unPinnedNote.length > 0 ? <h2 class="primary-heading">Others</h2> : null}
            <div className="workspace__pinned">
                <CardList cards={unPinnedNote} />
            </div>

            {archivedNote.length > 0 ? <h2 class="primary-heading">Archived</h2> : null}
            <div className="workspace__unpinned">
                <CardList cards={archivedNote} />
            </div>
        </>
    );
}

export default Result;