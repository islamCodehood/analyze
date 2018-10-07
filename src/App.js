import React, { Component } from 'react';
import './App.css';
import data from './data'
import OrderCountCharts from './OrderCountCharts'
import RevenueCharts from './RevenueCharts'
import TimeSeriesCharts from './TimeSeriesCharts'
class App extends Component {
  componentDidMount() {
    console.log(this.state.data.filter(order => (new Date(order.orderdate).getHours()) - 2 > 20))
  }
  state = {
    data
  }
  //get order count per payment method.
  getCountPerPayment = (paymentMethod) => {
    return this.state.data.filter(order => order.paymentMethod === paymentMethod).length
  }



  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <OrderCountCharts
          data={this.state.data}
          countPerPayment={this.getCountPerPayment}
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
