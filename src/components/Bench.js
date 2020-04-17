import React, { Component } from 'react';
import Card from './Card';
import {Droppable} from 'react-beautiful-dnd';
import Autosort from './Autosort';

export class Bench extends Component {
    
    render() {
        return (
            <div className="bench shadow-container">
                <div className="actionBar">
                    <Autosort />
                </div>
                <Droppable droppableId="column-0" direction="horizontal">
                    {(provided) => (
                        <div className="mtg-row-container" ref={provided.innerRef} {...provided.droppableProps} >
                            {this.props.bench.cardIds.map((cardId, index) => {
                                const card = this.props.cards[cardId];
                                return <Card key={card.id} card={card} index={index} />
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default Bench
