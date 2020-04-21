import React, { Component } from 'react';
import Card from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ColumnHeader from './ColumnHeader';

export class Column extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <div className="mtg-column has-text-centered" {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                        <ColumnHeader title={this.props.column.title} columnId={this.props.column.id} deleteColumn={this.props.deleteColumn} />
                        <Droppable droppableId={this.props.column.id} type="card" direction="vertical">
                            {(provided) => (
                                <div className="mtg-cards" ref={provided.innerRef} {...provided.droppableProps} >
                                    {this.props.cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>)}
            </Draggable>
        )
    }
}

export default Column

