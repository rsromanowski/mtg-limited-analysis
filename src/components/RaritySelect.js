import React, { Component } from 'react'

export class RaritySelect extends Component {
    render() {
        return (
            <div>
                <legend>Rarity</legend>  
                <input type="checkbox" name="rarity" value="c" id="rarity-c" onChange={(e) => this.props.handleRarityChange(e)}/>
                <label htmlFor="rarity-c">C</label>
                <input type="checkbox" name="rarity" value="u" id="rarity-u" onChange={(e) => this.props.handleRarityChange(e)}/>
                <label htmlFor="rarity-u">U</label>
                <input type="checkbox" name="rarity" value="r" id="rarity-r" onChange={(e) => this.props.handleRarityChange(e)}/>
                <label htmlFor="rarity-r">R</label>
                <input type="checkbox" name="rarity" value="m" id="rarity-m" onChange={(e) => this.props.handleRarityChange(e)}/>
                <label htmlFor="rarity-m">M</label>
            </div>
        )
    }
}

export default RaritySelect
