import React from 'react';
import CardList from '../CardList/CardList';

function Archived({archivedNotes}) {
    return (
        <>
            <div className="workspace__archive">
                <CardList cards={archivedNotes} />
            </div>
        </>
    );
}

export default Archived;