import React, { Component } from 'react'
import SetSelect from './SetSelect'
import ColorSelect from './ColorSelect'
import RaritySelect from './RaritySelect'
import AdditionalFilter from './AdditionalFilter'

export class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar shadow-container">
                <SetSelect handleSetChange={this.props.handleSetChange} />
                <div className="h-container">
                    <ColorSelect handleColorChange={this.props.handleColorChange} />
                    <RaritySelect handleRarityChange={this.props.handleRarityChange} />
                </div>
                <AdditionalFilter handleFilterChange={this.props.handleFilterChange} />
                <button className="button is-info button-load" type="button" onClick={this.props.loadCards}>RELOAD CARDS</button>
            </div>
        )
    }
}

export default Sidebar
