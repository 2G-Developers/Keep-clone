import React from 'react';
import CardList from '../CardList/CardList';

function Result({filteredData}) {
    const archivedNote = filteredData.filter(element => element.isArchive )
    const unArchivedNote = filteredData.filter(element => !element.isArchive )
    
    return (
        <>
            <div className="workspace__pinned">
                <CardList cards={unArchivedNote} />
            </div>

            {archivedNote.length > 0 ? <h2 class="primary-heading">Archived</h2> : null}
            <div className="workspace__unpinned">
                <CardList cards={archivedNote} />
            </div>
        </>
    );
}

export default Result;