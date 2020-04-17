import React, { Component } from 'react'
import ColumnContainer from './ColumnContainer'

export class Whiteboard extends Component {
    render() {
        return (
            <div className="whiteboard shadow-container">
                <div className="titleBar">
                    <div className="field has-addons">
                        <p class="control">
                        <button className="button is-small" type="button">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span>Add Column</span>
                        </button>
                        </p><p class="control">
                        <button className="button is-small" type="button">
                            <span class="icon is-small">
                                <i class="fas fa-save"></i>
                            </span>
                            <span>Save</span>
                        </button>
                        </p><p class="control">
                        <button className="button is-small" type="button">
                            <span class="icon is-small">
                                <i class="fas fa-share"></i>
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
