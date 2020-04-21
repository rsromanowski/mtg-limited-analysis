import React, { Component } from 'react'

export class AdditionalFilter extends Component {
    render() {
        return (
            <div className="field">
                <label className="label">Additional Filter</label>
                <div className="control">
                    <input className="input is-small" type="text" placeholder="o:flash" onChange={(e) => this.props.handleFilterChange(e.target.value)}></input>
                </div>
            </div>
        )
    }
}

export default AdditionalFilter
