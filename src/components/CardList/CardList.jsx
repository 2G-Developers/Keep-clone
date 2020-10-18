import React from 'react';
import Card from '../Card/Card';

function CardList({cards}) {
    return (
        <>
            {cards.map((note) => <Card key={note.id} note={note} />)}
        </>
    );
}

export default CardList;