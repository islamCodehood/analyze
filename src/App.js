import React, { Component } from 'react';
import './App.css';
import data from './data'
import crossfilter2 from 'crossfilter2'
import PropTypes from 'prop-types'
import OrderCountCharts from './OrderCountCharts'
import RevenueCharts from './RevenueCharts'
import TimeSeriesCharts from './TimeSeriesCharts'

class App extends Component {
  componentDidMount() {
    this.state.branchDim.filterRange(["Branch A", "Branch D"])
    console.log(this.state.dataCrossFiltered.groupAll().value())
    this.state.paymentMethodDim.filterRange(["Cash", "KNET"])
    console.log(this.state.dataCrossFiltered.groupAll().value())
  }
  componentWillMount() {
    //Get all dimensions ready.
    this.setState({
      branchDim: this.state.dataCrossFiltered.dimension(d => d.branch)
    })
    this.setState({
      paymentMethodDim: this.state.dataCrossFiltered.dimension(d => d.paymentMethod)
    })
    this.setState({
      orderAmountDim: this.state.dataCrossFiltered.dimension(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, '')))
    })
    this.setState({
      orderDateDim: this.state.dataCrossFiltered.dimension(d => (new Date(d.orderdate.substr(0, 10)).getDate()))
    })
    this.setState({
      orderWeekDayDim: this.state.dataCrossFiltered.dimension(d => (new Date(d.orderdate.substr(0, 10)).getDay()))
    })
    this.setState({
      orderMonthDim: this.state.dataCrossFiltered.dimension(d => (new Date(d.orderdate.substr(0, 10)).getMonth()))
    })
    this.setState({
      orderTimeDim: this.state.dataCrossFiltered.dimension(d => new Date(d.orderdate).getHours())
    })
    this.setState({
      deliveryAreaDim: this.state.dataCrossFiltered.dimension(d => d.deliveryArea)
    })
  }



  state = {
    data,
    dataCrossFiltered: crossfilter2(data),
    branchDim: {},
    paymentMethodDim: {},
    orderAmountDim: {},
    orderDateDim: {},
    orderWeekDayDim: {},
    orderMonthDim: {},
    orderTimeDim: {},
    deliveryAreaDim: {}
  }

  handleClick = () => {
    this.state.orderMonthDim.filterRange([0, 2])
    this.setState({
      data
    })
    console.log(this.state.dataCrossFiltered.groupAll().value())
    console.log(this.state.paymentMethodDim.group().all()[0].key)

  }

  handleSecondClick = () => {
    this.state.orderMonthDim.filterAll()
    this.setState({
      data
    })
    console.log(this.state.dataCrossFiltered.groupAll().value())

  }

  handleChartChange = (dataWidth, chartName) => {
    //console.log(dataWidth.x)
    switch (chartName) {
      case "orderWeekDayChart":
        this.state.orderWeekDayDim.filterRange([Math.floor(dataWidth[0]),Math.floor(dataWidth[1])])
        this.setState({
          data
        })
        console.log(this.state.dataCrossFiltered.groupAll().value())
        break
      case "deliverAreaChart":
        let minEnd = this.state.deliveryAreaDim.group().top(20)[Math.floor(dataWidth[0])]
        let maxEnd = this.state.deliveryAreaDim.group().top(20)[Math.floor(dataWidth[1])]
        if (dataWidth[1] >= 19.9 && dataWidth[0] >= 19.9) {
          maxEnd = 19
          minEnd = 19
          this.state.deliveryAreaDim.filterRange([minEnd.key, maxEnd.key])
          console.log(this.state.dataCrossFiltered.groupAll().value())
        } else if (dataWidth[0] >= 19.9) {
          minEnd = 19
          this.state.deliveryAreaDim.filterRange([minEnd.key, maxEnd.key])
          console.log(this.state.dataCrossFiltered.groupAll().value())
        } else if (dataWidth[1] >= 19.9) {
          maxEnd = 19
          this.state.deliveryAreaDim.filterRange([minEnd.key, maxEnd.key])
          console.log(this.state.dataCrossFiltered.groupAll().value())
        } else {
          this.state.deliveryAreaDim.filterRange([minEnd.key, maxEnd.key])
          console.log(this.state.dataCrossFiltered.groupAll().value())
        }
        //console.log(this.state.deliveryAreaDim.group().top(20)[])
        //console.log(this.state.deliveryAreaDim.group().top(20))
        
        //console.log(Math.floor(dataWidth[1]-1.5), maxEnd)
        //this.state.deliveryAreaDim.filterRange(minEnd, maxEnd)
        this.setState({
          data
        })
        break
    }
    
  }

  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <button onClick={this.handleClick}>Filter</button>
        <button onClick={this.handleSecondClick}>Filter Again</button>

        <OrderCountCharts
          orderTimeDim={this.state.orderTimeDim}
          paymentMethodDim={this.state.paymentMethodDim}
          orderAmountDim={this.state.orderAmountDim}
          branchDim={this.state.branchDim}
          deliveryAreaDim={this.state.deliveryAreaDim}
          orderWeekDayDim={this.state.orderWeekDayDim}
          handleChartChange={this.handleChartChange}
        />
        <button onClick={this.handleClick}>Filter</button>
        <button onClick={this.handleSecondClick}>Filter Again</button>
        <RevenueCharts
          branchDim={this.state.branchDim}
          deliveryAreaDim={this.state.deliveryAreaDim}
          orderWeekDayDim={this.state.orderWeekDayDim}
          paymentMethodDim={this.state.paymentMethodDim}
          orderTimeDim={this.state.orderTimeDim}
          orderAmountDim={this.state.orderAmountDim}
        />
        <button onClick={this.handleClick}>Filter</button>
        <button onClick={this.handleSecondClick}>Filter Again</button>
        <TimeSeriesCharts
          orderDateDim={this.state.orderDateDim}
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
