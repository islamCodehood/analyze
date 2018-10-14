import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryBrushContainer } from "victory";
//import PropTypes from 'prop-types'

class TimeSeriesCharts extends Component {

  state = {
    selectedDomain: {},
    zoomDomain: {}
  }

  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
    console.log(domain)
  };

  handleResetClick = (e) => {
    if (e.target.text === "Reset All") {
      this.props.resetAll()
    } else {
      this.props.resetDim(e.target.parentElement.id)
    }
    
  }




  render() {
    return (
      <div className="card-container">
      <div className="time-series-card">
      <h2 className="time-series-title">Order Count / Day</h2>
      <br/>
          <br/>
          <div className="btn-group">

          <a href="#!" className="reset" onClick={this.handleResetClick}>Reset All</a>
          </div>
        <VictoryChart
          width={1000}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={{ x: [12, 18] }}
              defaultBrushArea={"none"}
              onBrushDomainChange={this.handleChange}
              brushStyle={{
                stroke: "transparent",
                fill: "#999",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 2 }
            }}
            
            data={this.props.orderDateDim
              .group()
              .all()
              .map(date => {
                return { x: date.key, y: date.value };
              })}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
          />
        </VictoryChart>
        </div>
        <div className="time-series-card">
        <h2 className="time-series-title">Sales / Day</h2>
        <br/>
          <br/>
          <div className="btn-group">

          <a href="#!" className="reset" onClick={this.handleResetClick}>Reset All</a>
          </div>
        <VictoryChart
        width={1000}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={{ x: [12, 18] }}
              defaultBrushArea={"none"}
              onBrushDomainChange={this.handleChange}
              brushStyle={{
                stroke: "transparent",
                fill: "#999",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 2 },
              
            }}
            data={this.props.orderDateDim
              .group()
              .reduceSum(d =>
                parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
              )
              .all()
              .map(date => {
                return { x: date.key, y: date.value };
              })}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
          />
        </VictoryChart>
        </div>
        <div className="time-series-card">
        <h2 className="time-series-title">Order Count / Month</h2>
        <br/>
          <br/>
          <div className="btn-group">

          <a href="#!" className="reset" onClick={this.handleResetClick}>Reset All</a>
          </div>
        <VictoryChart
        width={1000}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={{ x: [4, 6] }}
              defaultBrushArea={"none"}
              onBrushDomainChange={this.handleChange}
              brushStyle={{
                stroke: "transparent",
                fill: "#999",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 2 },
              
            }}
            data={this.props.orderMonthDim
              .group()
              .all()
              .map(date => {
                return { x: date.key, y: date.value };
              })}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
          />
        </VictoryChart>
        </div>
        <div className="time-series-card">
        <h2 className="time-series-title">Sales / Month</h2>
        <br/>
          <br/>
          <div className="btn-group">

          <a href="#!" className="reset" onClick={this.handleResetClick}>Reset All</a>
          </div>
        <VictoryChart
        width={1000}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={{ x: [4, 6] }}
              defaultBrushArea={"none"}
              onBrushDomainChange={this.handleChange}
              brushStyle={{
                stroke: "transparent",
                fill: "#999",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 2 },
              
            }}
            data={this.props.orderMonthDim
              .group()
              .reduceSum(d =>
                parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
              )
              .all()
              .map(date => {
                return { x: date.key, y: date.value };
              })}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
          />
        </VictoryChart>
        </div>
      </div>
    );
  }
}

export default TimeSeriesCharts;
