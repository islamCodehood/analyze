import React, { Component } from "react";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryBrushContainer,
  VictoryLabel
} from "victory";
import PropTypes from "prop-types";

class OrderCountCharts extends Component {


  state = {
    clickedBar: [],
    clickedPieSlice: []
  };
  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
  };

  handleBranchBarClick = () => {
    setTimeout(() => {
      this.props.handleBranchBarClick(this.state.clickedBar);
    }, 10);
  };

  handlePieSliceClick = () => {
    setTimeout(() => {
      this.props.handlePieSliceClick(this.state.clickedPieSlice);
    }, 100);
  };

  render() {
    return (
      <div className="card-container">
        <div id="pie-1" className="card">
          <VictoryPie
            name="payMethodPieChart"
            responsive={false}
            data={this.props.paymentMethodDim
              .group()
              .all()
              .map(paymentMethod => {
                return { y: paymentMethod.value, label: paymentMethod.key };
              })}
            height={280}
            width={280}
            colorScale="warm"
            labelRadius={120}
            style={{ labels: { fill: "#fff", fontSize: 10 } }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (this.state.clickedPieSlice.includes(props.text)) {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice !== props.text
                              )
                            }));
                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.concat(
                                props.text
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "red"
                            ? "blue"
                            : { style: { fill: "red" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </div>
        <div id="pie-2" className="card">
          <VictoryPie
            responsive={false}
            data={[
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 6).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 12).all()[1].value,
                label: [6, 12]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 12).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 17).all()[1].value,
                label: [12, 17]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 17).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 20).all()[1].value,
                label: [17, 20]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 20).all()[1].value +
                  this.props.orderTimeDim.group(d => d >= 6).all()[0].value,
                label: [20, 6]
              }
            ]}
            height={280}
            width={280}
            colorScale="warm"
            labelRadius={120}
            style={{ labels: { fill: "#fff", fontSize: 10 } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 3000 }
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (this.state.clickedPieSlice.find(slice => slice[0] === props.datum.label[0]) === undefined) {
                            this.state.clickedPieSlice.push(props.datum.label)
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            })
                            
                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice[0] !== props.datum.label[0]
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "red"
                            ? "blue"
                            : { style: { fill: "red" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </div>
        <div id="pie-3" className="card">
          <VictoryPie
            responsive={false}
            innerRadius={10}
            data={[
              {
                y: this.props.orderAmountDim.group(d => d >= 10).all()[0].value,
                label: [0, 10]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 10).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 20).all()[1].value,
                label: [10 , 20]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 20).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 40).all()[1].value,
                label: [20 , 40]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 40).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
                label: [40 , 70]
              },
              {
                y: this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
                label: [70 , 1000000]
              }
            ]}
            height={280}
            width={280}
            colorScale="warm"
            labelRadius={120}
            style={{ labels: { fill: "#fff", fontSize: 10 } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 3000 }
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (this.state.clickedPieSlice.find(slice => slice[0] === props.datum.label[0]) === undefined) {
                            this.state.clickedPieSlice.push(props.datum.label)
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            })
                            
                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice[0] !== props.datum.label[0]
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "red"
                            ? "blue"
                            : { style: { fill: "red" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </div>
        <div id="bar-1" className="card">
          <VictoryChart responsive={false} domainPadding={20}>
            <VictoryBar
              horizontal
              labelComponent={
                <VictoryLabel
                  verticalAnchor="middle"
                  textAnchor="start"
                  desc="Order Count per branch chart"
                />
              }
              data={this.props.branchDim
                .group()
                .all()
                .map(branch => {
                  return { y: branch.value, x: branch.key, label: branch.key };
                })}
              style={{
                data: { fill: (d, active) => (active ? "grey" : "#C64828") },
                labels: { fill: "#888" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
              barWidth={25}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: "labels",
                          mutation: props => {
                            if (this.state.clickedBar.includes(props.text)) {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.filter(
                                  branch => branch !== props.text
                                )
                              }));
                              this.handleBranchBarClick();
                            } else {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.concat(
                                  props.text
                                )
                              }));
                              this.handleBranchBarClick();
                            }
                          }
                        },
                        {
                          target: "data",
                          mutation: props => {
                            return props.style.fill === "red"
                              ? "blue"
                              : { style: { fill: "red" } };
                          }
                        }
                      ];
                    }
                  }
                }
              ]}
            />
          </VictoryChart>
        </div>
        <div id="bar-2" className="card">
          <VictoryChart
            responsive={false}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={{ x: [9, 11] }}
                defaultBrushArea={"none"}
                onBrushDomainChange={this.handleChange}
                brushStyle={{
                  stroke: "transparent",
                  fill: "#9995",
                  fillOpacity: 0.3
                }}
                name="deliverAreaChart"
              />
            }
            domainPadding={20}
          >
            <VictoryBar
              data={this.props.deliveryAreaDim
                .group()
                .top(20)
                .map(order => {
                  return { y: order.value, x: order.key };
                })}
              style={{
                data: { fill: (d, active) => (active ? "grey" : "#33619D") },
                labels: { fill: "#888", fontSize: 10 }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
            />
          </VictoryChart>
        </div>
        <div id="bar-3" className="card">
          <VictoryChart
            responsive={false}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={{ x: [3, 5] }}
                defaultBrushArea={"none"}
                onBrushDomainChange={this.handleChange}
                brushStyle={{
                  stroke: "transparent",
                  fill: "red",
                  fillOpacity: 0.3
                }}
                name="orderWeekDayChart"
              />
            }
            domainPadding={20}
          >
            <VictoryBar
              data={this.props.orderWeekDayDim
                .group()
                .all()
                .map(day => {
                  return {
                    y: day.value,
                    x: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ][day.key]
                  };
                })}
              style={{
                labels: { fill: "#888", fontSize: 10 },
                data: { fill: "#C64828" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

/* OrderCountCharts.propTypes = {
  height: PropTypes.number,
  colorScale: PropTypes.string,
  labelRadius: PropTypes.number,
  style: PropTypes.object
}; */

export default OrderCountCharts;
