import React from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';

class App extends React.Component {
  state = {
    set: '',
    color: { w: false, u: false, b: false, r: false, g: false },
    rarity: { c: false, u: false, r: false, m: false },
    filter: '',

    data: {...initialData}
  }

  constructor(props) {
    super(props);

    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleRarityChange = this.handleRarityChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.loadCards = this.loadCards.bind(this);
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.data.columns[source.droppableId];
    const finish = this.state.data.columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        cardIds: newCardIds
      };

      const newData = {
        ...this.state.data,
        columns: {
          ...this.state.data.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState({...this.state, data: newData});
    } else {
      const startCardIds = Array.from(start.cardIds);
      startCardIds.splice(source.index, 1);

      const newStart = {
        ...start,
        cardIds: startCardIds
      };

      const finishCardIds = Array.from(finish.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        cardIds: finishCardIds
      };

      const newData = {
        ...this.state.data,
        columns: {
          ...this.state.data.columns,
          [start.id]: newStart,
          [finish.id]: newFinish
        }
      }

      this.setState({...this.state, data: newData});
    }


  }

  handleSetChange(code) { this.setState({ set: code }); }
  handleColorChange(e) {
    this.setState({
      ...this.state,
      color: {
        ...this.state.color,
        [e.target.value]: e.target.checked
      }
    });
  }
  handleRarityChange(e) {
    this.setState({
      ...this.state,
      rarity: {
        ...this.state.rarity,
        [e.target.value]: e.target.checked
      }
    });
  }
  handleFilterChange(query) { this.setState({ filter: query }); }

  loadCards() {
    const rarityClause = Object.keys(this.state.rarity).filter((r) => this.state.rarity[r]).map(r => `r:${r}`).join(' OR ');
    const colors = Object.keys(this.state.color).filter((c) => this.state.color[c]).join('');
    const additionalFilterClause = (this.state.filter ? this.state.filter + ' ' : '');

    const endpoint = `https://api.scryfall.com/cards/search?as=grid&order=name&q=${additionalFilterClause}color=${colors} set:${this.state.set} (${rarityClause})`.trim();

    console.log(endpoint);
    axios.get(endpoint).then((res) => {
      //get new cards
      const newCards = res.data.data.reduce((obj, item) => {
        return {
          ...obj,
          [item['id']]: item,
        };
      }, {});
      console.log('new cards');
      console.log(newCards);
      
      //clear columns
      const newColumnArray = this.state.data.columnOrder.map(columnId => ({...this.state.data.columns[columnId], cardIds: []}));
      const newColumns = newColumnArray.reduce((obj, item) => {
        return {
          ...obj,
          [item['id']]: item,
        };
      }, {});
      console.log('new columns');
      console.log(newColumns);

      //put res.data.data into bench ('column-0')
      const newBench = {
        ...this.state.data.columns['column-0'],
        cardIds: Object.keys(newCards)
      }
      console.log('new bench');
      console.log(newBench);

      const newData = {
        ...this.state.data,
        cards: newCards,
        columns: {'column-0': newBench, ...newColumns}
      }
      console.log('new data');
      console.log(newData);

      this.setState({
        ...this.state,
        data: newData
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar handleSetChange={this.handleSetChange} handleColorChange={this.handleColorChange}
          handleRarityChange={this.handleRarityChange} handleFilterChange={this.handleFilterChange} loadCards={this.loadCards} />
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Workspace data={this.state.data} />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
