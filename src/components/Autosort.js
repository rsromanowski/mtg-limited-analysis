import React, { Component } from 'react'

export class Autosort extends Component {
    render() {
        return (
            <span>
                <label htmlFor="autosortSelect">
                    <div className="control">
                        <div class="select is-small">
                            <select id="autosortSelect">
                                <option>Sort by...</option>
                                <option>CMC</option>
                                <option>Power</option>
                                <option>Toughness</option>
                            </select>
                        </div>
                    </div>
                </label>
            </span>
        )
    }
}

export default Autosort
