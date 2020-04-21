import React, { Component } from 'react'
import ColumnContainer from './ColumnContainer'
import { Droppable } from 'react-beautiful-dnd'

export class Whiteboard extends Component {
    render() {
        return (
            <div className="whiteboard shadow-container">
                <div className="titleBar">
                    <div className="field has-addons">
                        <p className="control">
                        <button className="button is-small" type="button" onClick={this.props.addColumn} >
                            <span className="icon is-small">
                                <i className="fas fa-plus"></i>
                            </span>
                            <span>Add Column</span>
                        </button>
                        </p><p className="control">
                        <button className="button is-small" type="button">
                            <span className="icon is-small">
                                <i className="fas fa-save"></i>
                            </span>
                            <span>Save</span>
                        </button>
                        </p><p className="control">
                        <button className="button is-small" type="button">
                            <span className="icon is-small">
                                <i className="fas fa-share"></i>
                            </span>
                            <span>Share</span>
                        </button>
                        </p>
                    </div>
                </div>
                <ColumnContainer {...this.props} />
            </div>
        )
    }
}

export default Whiteboard
