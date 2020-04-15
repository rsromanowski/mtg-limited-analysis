import React, { Component } from 'react'

export class AdditionalFilter extends Component {
    render() {
        return (
            <div>
                <label htmlFor="additionalFilter">Additional Filter</label>
                <input type="text" placeholder="o:flash" onChange={(e) => this.props.handleFilterChange(e.target.value)}></input>
            </div>
        )
    }
}

export default AdditionalFilter
