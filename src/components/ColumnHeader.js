import React, { Component } from 'react'

export class ColumnHeader extends Component {
    state = {
        value: this.props.title || 'Title',
        isInEditMode: false
    }

    constructor(props) {
        super(props);
    }
    changeEditMode = () => {
        this.setState({ isInEditMode: !this.state.isInEditMode });
    }
    updateComponentValue = (value) => {
        this.setState({ isInEditMode: !this.state.isInEditMode, value: this.refs.titleInput.value });
    }
    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.updateComponentValue()
        }
    }
    render() {
        return <div className="mtg-column-header">
            <span><i className="fas fa-grip-vertical"></i></span>
            {(this.state.isInEditMode ?
                <div className="mtg-column-title field has-addons">
                    <div className="control">
                        <input className="input is-small" name="titleInput" ref="titleInput"  type="text" onKeyPress={this.keyPressed} defaultValue={this.state.value} />
                    </div>
                    <div className="control">
                        <button className="button is-small is-danger" onClick={this.changeEditMode}>X</button>
                    </div>
                    <div className="control">
                        <button className="button is-small is-success" onClick={this.updateComponentValue}>Ok</button>
                    </div>
                </div> :
                <h3 className="mtg-column-title title is-5" onDoubleClick={this.changeEditMode}>{this.state.value}</h3>
            )}
            <span onClick={() => this.props.deleteColumn(this.props.columnId)}>X</span>
        </div>
    }
}

export default ColumnHeader
