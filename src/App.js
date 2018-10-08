import React, { Component } from 'react';
import './App.css';
import data from './data'
import OrderCountCharts from './OrderCountCharts'
import RevenueCharts from './RevenueCharts'
import TimeSeriesCharts from './TimeSeriesCharts'
class App extends Component {
  componentDidMount() {
    console.log(this.getCountPerTime(20, 24) + this.getCountPerTime(0, 6))
  }
  state = {
    data
  }
  //get order count per payment method.
  getCountPerPayment = paymentMethod => 
    this.state.data.filter(order => order.paymentMethod === paymentMethod).length
  

  getCountPerTime = (startHour, endHour) => 
    this.state.data.filter(order => (new Date(order.orderdate).getHours()) - 2 >= startHour
     && (new Date(order.orderdate).getHours()) - 2 < endHour).length
  

  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <OrderCountCharts
          data={this.state.data}
          countPerPayment={this.getCountPerPayment}
          countPerTime={this.getCountPerTime}
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
