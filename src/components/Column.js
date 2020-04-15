import React, { Component } from 'react';
import Card from './Card';
import {Droppable} from 'react-beautiful-dnd';

export class Column extends Component {
    render() {
        return (
            <div className="column">
                <h3>{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div className="cards" ref={provided.innerRef} {...provided.droppableProps} >
                            {this.props.cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default Column

