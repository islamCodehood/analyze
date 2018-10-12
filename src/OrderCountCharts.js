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
    clickedBar: ""
  };
  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
  };

  handleBranchBarClick = barLabel => {
    if (barLabel === this.state.clickedBar) {
      this.props.resetBarFilter(barLabel);
      this.setState({
        clickedBar: ""
      });
    } else {
      this.props.handleBranchBarClick(barLabel);
    }
  };

  render() {
    return (
      <div>
        <VictoryPie
          cornerRadius={1}
          data={this.props.paymentMethodDim
            .group()
            .all()
            .map(paymentMethod => {
              return { y: paymentMethod.value, label: paymentMethod.key };
            })}
          height={200}
          colorScale="warm"
          labelRadius={20}
          style={{ labels: { fill: "black", fontSize: 8 } }}
        />
        <VictoryPie
          data={[
            {
              y:
                this.props.orderTimeDim.group(d => d >= 6).all()[1].value -
                this.props.orderTimeDim.group(d => d >= 12).all()[1].value,
              label: "Morning"
            },
            {
              y:
                this.props.orderTimeDim.group(d => d >= 12).all()[1].value -
                this.props.orderTimeDim.group(d => d >= 17).all()[1].value,
              label: "Afternoon"
            },
            {
              y:
                this.props.orderTimeDim.group(d => d >= 17).all()[1].value -
                this.props.orderTimeDim.group(d => d >= 20).all()[1].value,
              label: "Evening"
            },
            {
              y:
                this.props.orderTimeDim.group(d => d >= 20).all()[1].value +
                this.props.orderTimeDim.group(d => d >= 6).all()[0].value,
              label: "Night"
            }
          ]}
          height={200}
          colorScale="warm"
          labelRadius={60}
          style={{ labels: { fill: "black", fontSize: 8 } }}
          animate={{
            duration: 2000,
            onLoad: { duration: 3000 }
          }}
        />
        <VictoryPie
          innerRadius={10}
          data={[
            {
              y: this.props.orderAmountDim.group(d => d >= 10).all()[0].value,
              label: "< $10"
            },
            {
              y:
                this.props.orderAmountDim.group(d => d >= 10).all()[1].value -
                this.props.orderAmountDim.group(d => d >= 20).all()[1].value,
              label: "$10 - $20"
            },
            {
              y:
                this.props.orderAmountDim.group(d => d >= 20).all()[1].value -
                this.props.orderAmountDim.group(d => d >= 40).all()[1].value,
              label: "$20 - $40"
            },
            {
              y:
                this.props.orderAmountDim.group(d => d >= 40).all()[1].value -
                this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
              label: "$40 - $70"
            },
            {
              y: this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
              label: "> $70"
            }
          ]}
          height={200}
          colorScale="warm"
          labelRadius={60}
          style={{ labels: { fill: "black", fontSize: 8 } }}
          animate={{
            duration: 2000,
            onLoad: { duration: 3000 }
          }}
        />

        <VictoryChart
          /* containerComponent={
                        <VictoryBrushContainer
                            brushDimension="y"
                            brushDomain={{ x: [2, 4] }}
                            defaultBrushArea={"none"}
                            onBrushDomainChange={this.handleChange}
                            brushStyle={{ stroke: "transparent", fill: "red", fillOpacity: 0.3 }}
                            name="branchChart"
                        />
                    } */
          domainPadding={20}
        >
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
              data: { fill: (d, active) => (active ? "grey" : "blue") }
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
                          this.setState({
                            clickedBar: props.text
                          });
                          this.handleBranchBarClick(props.text);
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

        <VictoryChart
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
              data: { fill: (d, active) => (active ? "grey" : "blue") }
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 3000 }
            }}
          />
        </VictoryChart>

        <VictoryChart
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
            style={{ labels: { fill: "black", fontSize: 8 } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 3000 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

OrderCountCharts.propTypes = {
  height: PropTypes.number,
  colorScale: PropTypes.string,
  labelRadius: PropTypes.number,
  style: PropTypes.object
};

export default OrderCountCharts;
