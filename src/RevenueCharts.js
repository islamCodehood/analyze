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
    clickedPieSlice: [],
    clickedAreaBar: []
  };

  //Handle Brushing of the week day bar chart
  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
  };

  handleBranchBarClick = () => {
    setTimeout(() => {//Time out to give a chance to the state change to happen before calling the function.
      this.props.handleBranchBarClick(this.state.clickedBar);
    }, 10);
  };

  handleDeliveryAreaBarClick = () => {
    setTimeout(() => {
      this.props.handleDeliveryAreaBarClick(this.state.clickedAreaBar);
    }, 10);
  };

  handlePieSliceClick = () => {
    setTimeout(() => {
      this.props.handlePieSliceClick(this.state.clickedPieSlice);
    }, 10);
  };

  handleResetClick = () => {
    this.props.resetAll();
    this.setState({
      clickedBar: []
    })
    this.setState({
      clickedPieSlice: []
    })
    this.setState({
      clickedAreaBar: []
    })
  };

  
  //Sort delivery area bar chart's areas alphabetically
  sortByName = (a, b) => {
    const deliveryAreaA = a.key.substr(0, 8).toUpperCase();
    const deliveryAreaB = b.key.substr(0, 8).toUpperCase();
    if (deliveryAreaA < deliveryAreaB) {
      return -1;
    } else if (deliveryAreaA > deliveryAreaB) {
      return 1;
    } else {
      return 0;
    }
  };

  render() {
    return (
      <div className="card-container">
        <div id="revenue-orderTime" className="card-def card-sm">
          <h2>Revenue / Order Time</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryPie
            responsive={false}
            name="orderTime"
            externalEventMutations={this.props.externalMutations}
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
            colorScale={["rgba(200, 231, 176, 0.9)", "rgba(61, 61, 66, 0.9)", "rgba(77, 183, 206, 0.9)", "rgba(0, 143, 104, 0.9)"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 }, data: { stroke: "#F5F5DC", strokeWidth: 2} }}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
            events={[
              {
                target: "data",
                childName: "orderTime",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        mutation: props => {
                          return {style: {fill: props.style.fill.substr(0, props.style.fill.length - 2) + "8"}}
                        }
                      }
                    ]
                  },
                  onMouseOut: () => {
                    return [
                      {
                        mutation: props => {
                          return null
                        }
                      }
                    ]
                  },
                  onClick: () => {
                    return [
                      {
                        target: "data",
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
        <div id="revenue-orderSize" className="card-def card-sm">
          <h2>Revenue / Order Size</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryPie
            responsive={false}
            name="orderSize"
            externalEventMutations={this.props.externalMutations}
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
            colorScale={["rgba(200, 231, 176, 0.9)", "rgba(61, 61, 66, 0.9)", "rgba(77, 183, 206, 0.9)", "rgba(0, 143, 104, 0.9)", "rgba(239, 187, 53, 0.9)"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 }, data: { stroke: "#F5F5DC", strokeWidth: 2} }}
            innerRadius={50}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
            events={[
              {
                target: "data",
                childName: "orderSize",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        mutation: props => {
                          return {style: {fill: props.style.fill.substr(0, props.style.fill.length - 2) + "8"}}
                        }
                      }
                    ]
                  },
                  onMouseOut: () => {
                    return [
                      {
                        mutation: props => {
                          return null
                        }
                      }
                    ]
                  },
                  onClick: () => {
                    return [
                      {
                        target: "data",
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
        <div id="revenue-deliveryArea" className="card-def card-md">
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
            domainPadding={9}
            height={245}
            externalEventMutations={this.props.externalMutations}
            events={[
              {
                target: "data",
                childName: "deliveryArea",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: props => {
                          if (
                            this.state.clickedAreaBar.includes(props.datum.x)
                          ) {
                            this.setState(prevState => ({
                              clickedAreaBar: prevState.clickedAreaBar.filter(
                                area => area !== props.datum.x
                              )
                            }));
                            this.handleDeliveryAreaBarClick();
                          } else {
                            this.setState(prevState => ({
                              clickedAreaBar: prevState.clickedAreaBar.concat(
                                props.datum.x
                              )
                            }));
                            this.handleDeliveryAreaBarClick();
                          }
                          return props.style.fill === "#4c4c82"
                            ? ""
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <VictoryBar
              name="deliveryArea"
              data={this.props.deliveryAreaDim
                .group()
                .reduceSum(d =>
                  parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                )
                .top(20)
                .sort(this.sortByName)
                .map(area => {
                  return { y: area.value, x: area.key };
                })}
              style={{
                labels: { fill: "black", fontSize: 8 },
                data: { fill: "#33619D" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 2000 }
              }}
              barWidth={16}
            />
            <VictoryAxis
              style={{ tickLabels: { angle: -70, fontSize: 12, padding: 25 } }}
              tickValues={this.props.deliveryAreaDim
                .group()
                .top(20)
                .sort(this.sortByName)
                .map(order => {
                  return { y: order.value, x: order.key };
                })}
              tickFormat={t => t.substr(0, 8)}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
        <div id="revenue-paymentMethod" className="card-def card-sm">
          <h2>Revenue / Payment Method</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryPie
            responsive={false}
            name="paymentMethod"
            externalEventMutations={this.props.externalMutationsPayment}
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
            colorScale={["rgba(61, 61, 66, 0.9)", "rgba(0, 143, 104, 0.9)", "rgba(239, 187, 53, 0.9)"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 }, data: { stroke: "#F5F5DC", strokeWidth: 2} }}
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}
            events={[
              {
                target: "data",
                childName: "paymentMethod",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        mutation: props => {
                          return {style: {fill: props.style.fill.substr(0, props.style.fill.length - 2) + "8"}}
                        }
                      }
                    ]
                  },
                  onMouseOut: () => {
                    return [
                      {
                        mutation: props => {
                          return null
                        }
                      }
                    ]
                  },
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: props => {
                          if (
                            this.state.clickedPieSlice.find(
                              slice => slice === props.datum.label
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
                                slice => slice !== props.datum.label
                              )
                            }));
                            this.handlePieSliceClick();
                          }
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

        <div id="revenue-branch" className="card-def">
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
            externalEventMutations={this.props.externalMutations}
            events={[
              {
                target: "data",
                childName: "branch",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
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
                          return props.style.fill === "#4c4c82"
                            ? ""
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
          <VictoryAxis dependentAxis
          style={{
            axis: {stroke: "transparent"}
          }}
          />
            <VictoryBar
              horizontal
              name="branch"
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
                  };
                })}
              labels={
                this.props.branchDim
                .group()
                .reduceSum(d =>
                  parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
                )
                .all()
                .map(branch => 
                      {return "$" +
                      Math.round(branch.value)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                )
              }
              style={{
                labels: {  fontSize: 14 },
                data: { fill: "#008f68" }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 2000 }
              }}
              barWidth={45}
            />
          </VictoryChart>
        </div>

        <div id="revenue-weekDay" className="card-def">
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
                defaultBrushArea={"all"}
                onBrushDomainChange={this.handleChange}
                handleStyle={{
                  stroke: "transparent",
                  strokeWidth: 1,
                  fill: "#000",
                  fillOpacity: ".5"
                }}
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
                onLoad: { duration: 2000 }
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
