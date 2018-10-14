import React, { Component } from "react";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryBrushContainer,
  VictoryAxis
} from "victory";

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
    }, 10);
  };

  handleResetClick = e => {
    if (e.target.text === "Reset All") {
      this.props.resetAll();
    } else {
      this.props.resetDim(e.target.parentElement.id);
    }
  };

  render() {
    return (
      <div className="card-container">
        <div id="revenue-paymentMethod" className="card">
          <h2>Revenue / Payment Method</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>
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
            colorScale={["#3d3d42", "#008f68", "#EFBB35"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
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
                          return props.style.fill === "#4c4c82"
                            ? "blue"
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container">
            <div id="box-1" />
            <div className="label-1">Cash</div>
            <div id="box-2" />
            <div className="label-2">Credit Card</div>
            <div id="box-3" />
            <div className="label-3">KNET</div>
          </div>
        </div>
        <div id="revenue-orderTime" className="card">
          <h2>Revenue / Order Time</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>
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
                label: [6, 8, 8, 12]
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
                label: [12, 14, 14, 17]
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
                label: [17, 18, 18, 20]
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
                label: [20, 24, 0, 6]
              }
            ]}
            height={280}
            width={280}
            colorScale={["#c8e7b0", "#3d3d42", "#4db7ce", "#008f68"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
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
                          if (
                            this.state.clickedPieSlice.find(
                              slice => slice[0] === props.datum.label[0]
                            ) === undefined
                          ) {
                            this.state.clickedPieSlice.push(props.datum.label);
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            });

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
                          return props.style.fill === "#4c4c82"
                            ? "blue"
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container-orderTime">
            <div id="box-1-orderTime" />
            <div className="label-1-orderTime">Morning</div>
            <div id="box-2-orderTime" />
            <div className="label-2-orderTime">Afternoon</div>
            <div id="box-3-orderTime" />
            <div className="label-3-orderTime">Evening</div>
            <div id="box-4-orderTime" />
            <div className="label-4-orderTime">Night</div>
          </div>
        </div>
        <div id="revenue-orderSize" className="card">
          <h2>Revenue / Order Size</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>
          <VictoryPie
            className=""
            responsive={false}
            data={[
              {
                y: this.props.orderAmountDim
                  .group(d => d >= 10)
                  .reduceSum(d =>
                    parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                  )
                  .all()[0].value,
                label: [0, 10]
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
                label: [10, 20]
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
                label: [20, 40]
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
                label: [40, 70]
              },
              {
                y: this.props.orderAmountDim
                  .group(d => d >= 70)
                  .reduceSum(d =>
                    parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                  )
                  .all()[1].value,
                label: [70, 1000000]
              }
            ]}
            height={280}
            width={280}
            colorScale={["#c8e7b0", "#3d3d42", "#4db7ce", "#008f68", "#EFBB35"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
            innerRadius={50}
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
                          if (
                            this.state.clickedPieSlice.find(
                              slice => slice[0] === props.datum.label[0]
                            ) === undefined
                          ) {
                            this.state.clickedPieSlice.push(props.datum.label);
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            });

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
                          return props.style.fill === "#4c4c82"
                            ? "blue"
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container-orderAmount">
            <div id="box-1-orderAmount" />
            <div className="label-1-orderAmount">Less than $10</div>
            <div id="box-2-orderAmount" />
            <div className="label-2-orderAmount">$10 - $20</div>
            <div id="box-3-orderAmount" />
            <div className="label-3-orderAmount">$20 - $40</div>
            <div id="box-4-orderAmount" />
            <div className="label-4-orderAmount">$40 - $70</div>
            <div id="box-5-orderAmount" />
            <div className="label-5-orderAmount">$70 and more</div>
          </div>
        </div>
        <div id="revenue-branch" className="card">
          <h2>Revenue / Branch</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryChart
            responsive={false}
            domainPadding={16}
            padding={{ left: 80, right: 60 }}
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
                  return {
                    y: branch.value,
                    x: branch.key,
                    label:
                      "$" +
                      Math.round(branch.value)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  };
                })}
              style={{
                labels: { fill: "#666", fontSize: 14 },
                data: { fill: "#008f68" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
              barWidth={31}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: "labels",
                          mutation: props => {
                            if (this.state.clickedBar.includes(props.datum.x)) {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.filter(
                                  branch => branch !== props.datum.x
                                )
                              }));
                              this.handleBranchBarClick();
                            } else {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.concat(
                                  props.datum.x
                                )
                              }));
                              this.handleBranchBarClick();
                            }
                          }
                        },
                        {
                          target: "data",
                          mutation: props => {
                            return props.style.fill === "#4c4c82"
                              ? "blue"
                              : { style: { fill: "#4c4c82" } };
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
        <div id="revenue-deliveryArea" className="card">
          <h2>Revenue / Delivery Area</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryChart
            responsive={false}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={{ x: [6, 14] }}
                defaultBrushArea={"none"}
                onBrushDomainChange={this.handleChange}
                brushStyle={{
                  stroke: "transparent",
                  fill: "#999",
                  fillOpacity: 0.3
                }}
                name="deliverAreaChart"
              />
            }
            domainPadding={9}
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
              style={{
                labels: { fill: "black", fontSize: 8 },
                data: { fill: "#33619D" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }}
              barWidth={17}
            />
            <VictoryAxis
              style={{ tickLabels: { angle: -70, fontSize: 12, padding: 25 } }}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
        <div id="revenue-weekDay" className="card">
          <h2>Revenue / Week Day</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
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
                  fill: "#999",
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
                data: { fill: "#C64828", fontSize: 1 }
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
            <VictoryAxis
              style={{ tickLabels: { angle: -70, fontSize: 15, padding: 32 } }}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default RevenueCharts;
