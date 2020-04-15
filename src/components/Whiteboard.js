import React, { Component } from 'react'
import ColumnContainer from './ColumnContainer'

export class Whiteboard extends Component {
    render() {
        return (
            <div className="whiteboard">
                Whiteboard
                <ColumnContainer {...this.props}/>
            </div>
        )
    }
}

export default Whiteboard
