import React from 'react';
import axios from 'axios';
import Moment from 'moment';

class SetSelect extends React.Component {
    state = {
        sets: []
    };

    componentDidMount() {
        axios.get('https://api.scryfall.com/sets').then((res) => {
            this.setState({
                sets: res.data.data
                    .filter(s => ['core', 'expansion', 'masters', 'draft_innovation'].some(e => e === s.set_type))
                    .sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'))
            });

            this.props.handleSetChange(this.state.sets[0].code);
        })

    }

    render() {
        return (<div class="field">
            <label class="label" htmlFor="set">Set</label>
            <div className="control">
                <div class="select is-small">
                    <select onChange={(e) => this.props.handleSetChange(e.target.value)}  >
                        {this.state.sets.map(e => {
                            return <option key={e.code} value={e.code}>{e.name}</option>;
                        })}
                    </select>
                </div>
            </div>
        </div>);
    }

}

export default SetSelect;