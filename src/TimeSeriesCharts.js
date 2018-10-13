import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryBrushContainer } from "victory";
//import PropTypes from 'prop-types'

class TimeSeriesCharts extends Component {
  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
  };

  render() {
    return (
      <div className="card-container">
      <div className="time-series-card">
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
                fill: "red",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 1 }
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
                fill: "red",
                fillOpacity: 0.3
              }}
              name="orderDateChart"
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a58", strokeWidth: 1 }
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
      </div>
    );
  }
}

export default TimeSeriesCharts;
