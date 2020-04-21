import React from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import { v4 as uuidv4 } from 'uuid'; 

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

    this.addColumn = this.addColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);

    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleRarityChange = this.handleRarityChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    
    this.loadCards = this.loadCards.bind(this);
  }

  addColumn = () => {
    const newColumnId = uuidv4();
    const newColumn = {
      id: newColumnId,
      title: '',
      cardIds: []
    };

    const newColumns = {
      ...this.state.data.columns,
      [newColumnId]: newColumn
    };
    const newColumnOrder = [...this.state.data.columnOrder, newColumnId];

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        columns: newColumns,
        columnOrder: newColumnOrder
      }
    });
  }
  deleteColumn = (columnId) => {
    //Move the cards back to the bench
    const cardIds = this.state.data.columns[columnId].cardIds;
    const newBenchCardIds = this.state.data.columns['column-0'].cardIds.concat(cardIds);

    //Remove column from columns
    const remainingColumns = {...this.state.data.columns};
    delete remainingColumns[columnId];

    remainingColumns['column-0'].cardIds = newBenchCardIds;

    //Remove columnId from columnorder
    const remainingColumnOrder = this.state.data.columnOrder.filter(id => id !== columnId);

    console.log(`columnId: ${columnId}`);
    console.log('remainingColumns', remainingColumns);
    console.log('remainingColumnOrder', remainingColumnOrder);
    
    this.setState({data: {
      ...this.state.data,
      columns: remainingColumns,
      columnOrder: remainingColumnOrder
    }});

  }

  onDragEnd = result => {
    const { destination, source, draggableId, type} = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      this.setState({data: {
        ...this.state.data,
        columnOrder: newColumnOrder
      }});
    } else {
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
    const rarities = Object.keys(this.state.rarity).filter((r) => this.state.rarity[r]).map(r => `r:${r}`).join(' OR ');
    const rarityClause = (rarities ? `(${rarities})` : '');

    const colors = Object.keys(this.state.color).filter((c) => this.state.color[c]).join('');
    const colorClause = (colors ? `color=${colors}` : '');
    
    const additionalFilterClause = (this.state.filter ? `(${this.state.filter})` : '');
    const setClause = `set:${this.state.set}`;
    const fullQuery = [setClause, colorClause, rarityClause, additionalFilterClause].join(' ');

    const endpoint = `https://api.scryfall.com/cards/search?as=grid&order=set&q=${fullQuery}`;

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
          <Workspace data={this.state.data} addColumn={this.addColumn} deleteColumn={this.deleteColumn}/>
        </DragDropContext>
      </div>
    );
  }
}

export default App;