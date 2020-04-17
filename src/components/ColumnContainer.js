import React, { Component } from 'react'
import Column from './Column'

export class ColumnContainer extends Component {

    render() {
        return <div className="mtg-column-container">
            {this.props.columnOrder.map((columnId, index) => {
                const column = this.props.columns[columnId];
                const cards = column.cardIds.map((cardId) => (this.props.cards[cardId]));

                return <Column key={column.id} column={column} cards={cards} />;
            })}
        </div>;
    }
}

export default ColumnContainer
