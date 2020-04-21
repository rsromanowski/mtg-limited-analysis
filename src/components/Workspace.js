import React, { Component } from 'react';
import Bench from './Bench';
import Whiteboard from './Whiteboard';

export class Workspace extends Component {

    render() {
        return (
            <div className="workspace">
                <Bench bench={this.props.data.columns['column-0']} cards={this.props.data.cards} />
                <Whiteboard columns={this.props.data.columns} columnOrder={this.props.data.columnOrder} addColumn={this.props.addColumn} cards={this.props.data.cards} deleteColumn={this.props.deleteColumn}/>
            </div>
        )
    }
}

export default Workspace
