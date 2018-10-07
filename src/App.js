import React, { Component } from 'react';
import './App.css';
import data from './data'
import OrderCountCharts from './OrderCountCharts'
import RevenueCharts from './RevenueCharts'
import TimeSeriesCharts from './TimeSeriesCharts'
class App extends Component {
  state = {
    data
  }
  render() {
    return (
      <div className="App">
        <OrderCountCharts
          data={this.state.data}
        />
        <RevenueCharts 
          data={this.state.data}
        />
        <TimeSeriesCharts 
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
