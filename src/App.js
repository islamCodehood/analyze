import React, { Component } from 'react';
import './App.css';
import data from './data'
import crossfilter from 'crossfilter'
import PropTypes from 'prop-types'
import OrderCountCharts from './OrderCountCharts'
import RevenueCharts from './RevenueCharts'
import TimeSeriesCharts from './TimeSeriesCharts'

class App extends Component {
  componentDidMount() {
    /* this.setState({
      data
    }) */
    const facts = crossfilter(this.state.data)
    orderAmountDim = facts.dimension(d => d.orderAmount)
    orderdateDim = facts.dimension(d => d.orderdate)
    paymentMethodDim = facts.dimension(d => d.paymentMethod)
    branchDim = facts.dimension(d => d.branch)
    deliveryAreaDim = facts.dimension(d => d.deliveryArea)
    //console.log(crossfilter(facts).groupAll().reduceSum(function(d) {return parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))}).value())
  }
  state = {
    data
  }
  //get order count per payment method.
  getCountPerPayment = paymentMethod => 
    this.state.data.filter(order => order.paymentMethod === paymentMethod).length
  

  getCountPerTime = (startHour, endHour) => 
    this.state.data.filter(order => (new Date(order.orderdate).getHours()) >= startHour
     && (new Date(order.orderdate).getHours()) - 2 < endHour).length
  
  getCountPerSize = (startAmount, endAmount) =>
  this.state.data.filter(order => ((parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) >= startAmount)
    && (parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) < endAmount))
    || (parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) > startAmount)).length


  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <OrderCountCharts
          data={this.state.data}
          countPerPayment={this.getCountPerPayment}
          countPerTime={this.getCountPerTime}
          countPerAmount={this.getCountPerSize}
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

App.propTypes = {
  data: PropTypes.array,
  countPerPayment: PropTypes.func,
  countPerTime: PropTypes.func
}

export default App;
