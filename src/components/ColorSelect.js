import React, { Component } from 'react'

export class ColorSelect extends Component {

    render() {
        return (
            <div>
                <legend>Color</legend>  
                <input type="checkbox" name="color" value="w" id="color-w" onChange={(e) => this.props.handleColorChange(e)} />
                <label htmlFor="color-w">W</label>
                <input type="checkbox" name="color" value="u" id="color-u" onChange={(e) => this.props.handleColorChange(e)} />
                <label htmlFor="color-u">U</label>
                <input type="checkbox" name="color" value="b" id="color-b" onChange={(e) => this.props.handleColorChange(e)} />
                <label htmlFor="color-b">B</label>
                <input type="checkbox" name="color" value="r" id="color-r" onChange={(e) => this.props.handleColorChange(e)} />
                <label htmlFor="color-r">R</label>
                <input type="checkbox" name="color" value="g" id="color-g" onChange={(e) => this.props.handleColorChange(e)} />
                <label htmlFor="color-g">G</label>
            </div>
        )
    }
}

export default ColorSelect
