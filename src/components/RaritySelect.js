import React, { Component } from 'react'

export class RaritySelect extends Component {
    render() {
        return (
            <div className="checkboxes">
                <div>
                    <label className="label">Rarity</label>
                    <label className="checkbox">
                        <input type="checkbox" name="rarity" value="c" id="rarity-c" onChange={(e) => this.props.handleRarityChange(e)} />
                Common</label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="rarity" value="u" id="rarity-u" onChange={(e) => this.props.handleRarityChange(e)} />
                Uncommon</label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="rarity" value="r" id="rarity-r" onChange={(e) => this.props.handleRarityChange(e)} />
                Rare</label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="rarity" value="m" id="rarity-m" onChange={(e) => this.props.handleRarityChange(e)} />
                Mythic</label>
                </div>
            </div>
        )
    }
}

export default RaritySelect
