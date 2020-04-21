import React, { Component } from 'react'
import Column from './Column'
import { Droppable } from 'react-beautiful-dnd';

export class ColumnContainer extends Component {

    render() {
        return (
            <Droppable droppableId="mtg-column-container" type="column" direction="horizontal">
                {(provided) => (
                    <div className="mtg-column-container" {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.columnOrder.map((columnId, index) => {
                            const column = this.props.columns[columnId];
                            const cards = column.cardIds.map((cardId) => (this.props.cards[cardId]));

                            return (
                                <Column key={column.id} index={index} column={column} cards={cards} deleteColumn={this.props.deleteColumn} />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export default ColumnContainer
