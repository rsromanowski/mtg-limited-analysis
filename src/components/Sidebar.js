import React, { Component } from 'react'
import SetSelect from './SetSelect'
import ColorSelect from './ColorSelect'
import RaritySelect from './RaritySelect'
import AdditionalFilter from './AdditionalFilter'

export class Sidebar extends Component {
    
    render() {
        return (
            <div className="sidebar">
                <SetSelect handleSetChange={this.props.handleSetChange}/>
                <ColorSelect handleColorChange={this.props.handleColorChange}/>
                <RaritySelect handleRarityChange={this.props.handleRarityChange}/>
                <AdditionalFilter handleFilterChange={this.props.handleFilterChange}/>
                <button type="button" onClick={this.props.loadCards}>Reload cards</button>
            </div>
        )
    }
}

export default Sidebar
