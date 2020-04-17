import React, { Component } from 'react'

export class AdditionalFilter extends Component {
    render() {
        return (
            <div class="field">
                <label class="label">Additional Filter</label>
                <div class="control">
                    <input className="input is-small" type="text" placeholder="o:flash" onChange={(e) => this.props.handleFilterChange(e.target.value)}></input>
                </div>
            </div>
        )
    }
}

export default AdditionalFilter
