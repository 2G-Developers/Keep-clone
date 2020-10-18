import React from 'react';
import CardList from '../CardList/CardList';

function Notes({pinnedNotes, unPinnedNotes}) {
    return (
        <>
            {pinnedNotes.length > 0 ? <h2 className="primary-heading">Pinned</h2> : null}
            <div className="workspace__pinned">
                <CardList cards={pinnedNotes} />
            </div>
            {(unPinnedNotes.length > 0 && pinnedNotes.length > 0) ? <h2 className="primary-heading">Others</h2> : null}
            <div className="workspace__unpinned">
                <CardList cards={unPinnedNotes} />
            </div>
        </>
    );
}

export default Notes;