import React, { Component } from "react";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryBrushContainer
} from "victory";
//import PropTypes from 'prop-types'

class RevenueCharts extends Component {
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
        <div className="card">
          <VictoryPie
            responsive={false}
            data={this.props.paymentMethodDim
              .group()
              .reduceSum(d =>
                parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
              )
              .all()
              .map(paymentMethod => {
                return { y: paymentMethod.value, label: paymentMethod.key };
              })}
            height={280}
            width={280}
            colorScale="warm"
            labelRadius={60}
            style={{ labels: { fill: "#999", fontSize: 10 } }}
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
        <div className="card">
          <VictoryPie
            responsive={false}
            data={[
              {
                y:
                  this.props.orderTimeDim
                    .group(d => d >= 6)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderTimeDim
                    .group(d => d >= 12)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: [6, 12]
              },
              {
                y:
                  this.props.orderTimeDim
                    .group(d => d >= 12)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderTimeDim
                    .group(d => d >= 17)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: [12, 17]
              },
              {
                y:
                  this.props.orderTimeDim
                    .group(d => d >= 17)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderTimeDim
                    .group(d => d >= 20)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: [17, 20]
              },
              {
                y:
                  this.props.orderTimeDim
                    .group(d => d >= 20)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value +
                  this.props.orderTimeDim
                    .group(d => d >= 6)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[0].value,
                label: [20, 6]
              }
            ]}
            height={280}
            width={280}
            colorScale="warm"
            labelRadius={60}
            style={{ labels: { fill: "#999", fontSize: 10 } }}
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
        <div className="card">
          <VictoryPie
            responsive={false}
            data={[
              {
                y: this.props.orderAmountDim
                  .group(d => d >= 10)
                  .reduceSum(d =>
                    parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                  )
                  .all()[0].value,
                label: "< $10"
              },
              {
                y:
                  this.props.orderAmountDim
                    .group(d => d >= 10)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderAmountDim
                    .group(d => d >= 20)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: "$10 - $20"
              },
              {
                y:
                  this.props.orderAmountDim
                    .group(d => d >= 20)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderAmountDim
                    .group(d => d >= 40)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: "$20 - $40"
              },
              {
                y:
                  this.props.orderAmountDim
                    .group(d => d >= 40)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value -
                  this.props.orderAmountDim
                    .group(d => d >= 70)
                    .reduceSum(d =>
                      parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                    )
                    .all()[1].value,
                label: "$40 - $70"
              },
              {
                y: this.props.orderAmountDim
                  .group(d => d >= 70)
                  .reduceSum(d =>
                    parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                  )
                  .all()[1].value,
                label: "> $70"
              }
            ]}
            height={280}
            width={280}
            colorScale={["#008f68", "#6DB", "#6DB65B", "#4AAE9B", "#EFBB35"]}
            labelRadius={60}
            style={{ labels: { fill: "#999", fontSize: 10 } }}
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
        <div className="card">
          <VictoryChart
            responsive={false}
            /* containerComponent={
                        <VictoryBrushContainer
                          brushDimension="x"
                          brushDomain={{x: [2, 4]}}
                          defaultBrushArea={"none"}
                          onBrushDomainChange={this.handleChange}
                          brushStyle={{stroke: "transparent", fill: "red", fillOpacity: 0.3}}
                          name="branchChart"
                        />
                    } */
            domainPadding={20}
          >
            <VictoryBar
              horizontal
              data={this.props.branchDim
                .group()
                .reduceSum(d =>
                  parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                )
                .all()
                .map(branch => {
                  return { y: branch.value, x: branch.key, label: branch.key };
                })}
              style={{ labels: { fill: "black", fontSize: 8 } }}
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
        <div className="card">
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
                  fill: "red",
                  fillOpacity: 0.3
                }}
                name="deliverAreaChart"
              />
            }
            domainPadding={4}
          >
            <VictoryBar
              data={this.props.deliveryAreaDim
                .group(d => d.substr(0, 8))
                .reduceSum(d =>
                  parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                )
                .top(20)
                .map(area => {
                  return { y: area.value, x: area.key };
                })}
              style={{ labels: { fill: "black", fontSize: 8 } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
            />
          </VictoryChart>
        </div>
        <div className="card">
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
            domainPadding={10}
          >
            <VictoryBar
              style={{
                labels: { fill: "black", fontSize: 1 },
                data: { fill: "#33619D", fontSize: 1 }
              }}
              data={this.props.orderWeekDayDim
                .group()
                .reduceSum(d =>
                  parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                )
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

export default RevenueCharts;
