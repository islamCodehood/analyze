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
    /* const facts = crossfilter(this.state.data)
    const orderAmountDim = facts.dimension(d => d.orderAmount)
    const orderdateDim = facts.dimension(d => d.orderdate)
    const paymentMethodDim = facts.dimension(d => d.paymentMethod)
    const branchDim = facts.dimension(d => d.branch)
    const deliveryAreaDim = facts.dimension(d => d.deliveryArea)
    console.log(paymentMethodDim.group().all()) */
    //console.log(crossfilter(this.state.data).dimension(d => d.paymentMethod).group().all()[0])
    //console.log(crossfilter(this.state.data).dimension(d => new Date(d.orderdate).getHours() >= 0 && new Date(d.orderdate).getHours() < 23).group().all())
    console.log(crossfilter(this.state.data).dimension(function (d) {return d.orderdate}).group(function(d) {return new Date(d).getHours()}).all())
    //console.log(crossfilter(facts).groupAll().reduceSum(function(d) {return parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))}).value())
    console.log(this.state.dataCrossFiltered.dimension(d => d.paymentMethod).group().all())
    console.log(this.state.dataCrossFiltered.dimension(d => new Date(d.orderdate).getHours()).group().all())
    console.log(this.state.dataCrossFiltered.dimension(d => new Date(d.orderdate).getHours()).group(d => d >= 20).all()[1].value + this.state.dataCrossFiltered.dimension(d => new Date(d.orderdate).getHours()).group(d => d >= 6).all()[0].value)
    //this.state.dataCrossFiltered.dimension(d => d.paymentMethod).filterExact("KNET")
    console.log(this.state.dataCrossFiltered.dimension(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, '')) > 10).group().all())
    console.log(this.state.dataCrossFiltered.dimension(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).group(d => d >= 70).all())
    
  }
  state = {
    data,
    dataCrossFiltered: crossfilter(data)
    /* paymentMethodDim: crossfilter(data).dimension(d => d.paymentMethod),
    orderdateDim: crossfilter(data).dimension(d => new Date(d.orderdate)) */
  }
  //get order count per payment method.
/*    getCountPerPayment = (paymentMethod) => 
    this.state.data.filter(order => order.paymentMethod === paymentMethod).length */


/*    getCountPerTime = (startHour, endHour) => 
    this.state.data.filter(order => (new Date(order.orderdate).getHours()) >= startHour
     && (new Date(order.orderdate).getHours()) < endHour).length */
  
  /* getCountPerSize = (startAmount, endAmount) =>
  this.state.data.filter(order => ((parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) >= startAmount)
    && (parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) < endAmount))
    || (parseFloat(order.orderAmount.replace(/[^0-9.-]+/g, '')) > startAmount)).length */

    /* handleClick = () => {
      this.state.dataCrossFiltered.dimension(d => d.paymentMethod).filter(["Cash", "KNET", "CreditCard"])
      this.setState({
        data
      })
    } */

  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <button id="btn" onClick={this.handleClick}>filter</button>
        <OrderCountCharts

          //data={this.state.data}
          paymentMethodDim={this.state.dataCrossFiltered.dimension(d => d.paymentMethod)}
          orderdateDim={this.state.dataCrossFiltered.dimension(d => new Date(d.orderdate).getHours())}
          orderAmountDim={this.state.dataCrossFiltered.dimension(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, '')))}
          //countPerPayment={this.getCountPerPayment}
          //countPerTime={this.getCountPerTime}
          //countPerAmount={this.getCountPerSize}
        />
        <RevenueCharts 
          //data={this.state.data}
        />
        <TimeSeriesCharts 
          //data={this.state.data}
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
