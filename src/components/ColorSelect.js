import React, { Component } from 'react'

export class ColorSelect extends Component {

    render() {
        return (
            <div className="checkboxes">
                <div>
                    <label className="label">Color</label>
                    <label className="checkbox">
                        <input type="checkbox" name="color" value="w" id="color-w" onChange={(e) => this.props.handleColorChange(e)} />
                        White
                    </label>
                </div>
                <div>
                    <label className="checkbox">
                    <input type="checkbox" name="color" value="u" id="color-u" onChange={(e) => this.props.handleColorChange(e)} />
                        Blue
                    </label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="color" value="b" id="color-b" onChange={(e) => this.props.handleColorChange(e)} />
                        Black
                    </label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="color" value="r" id="color-r" onChange={(e) => this.props.handleColorChange(e)} />
                        Red
                    </label>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" name="color" value="g" id="color-g" onChange={(e) => this.props.handleColorChange(e)} />
                        Green
                    </label>
                </div>
            </div>
        )
    }
}

export default ColorSelect
