import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export class Card extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.card.id} index={this.props.index}>
                {(provided) => (
                   this.props.card.image_uris ? <img className="mtg-card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        alt={this.props.card.id} src={this.props.card.image_uris.small}
                    /> : ''
                )}
            </Draggable>
        )
    }
}

export default Card;
