import React, { Component } from "react";
import "./App.css";
import data from "./data";
import crossfilter2 from "crossfilter2";
import PropTypes from "prop-types";
import OrderCountCharts from "./OrderCountCharts";
import RevenueCharts from "./RevenueCharts";
import TimeSeriesCharts from "./TimeSeriesCharts";

class App extends Component {
  componentDidUpdate() {
    console.log(this.state.dataCrossFiltered.groupAll().value())
  }
  componentWillMount() {
    //Get all dimensions ready.
    this.setState({
      branchDim: this.state.dataCrossFiltered.dimension(d => d.branch)
    });
    this.setState({
      paymentMethodDim: this.state.dataCrossFiltered.dimension(
        d => d.paymentMethod
      )
    });
    this.setState({
      orderAmountDim: this.state.dataCrossFiltered.dimension(d =>
        parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ""))
      )
    });
    this.setState({
      orderDateDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate.substr(0, 10)).getDate()
      )
    });
    this.setState({
      orderWeekDayDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate.substr(0, 10)).getDay()
      )
    });
    this.setState({
      orderMonthDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate.substr(0, 10)).getMonth()
      )
    });
    this.setState({
      orderTimeDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate).getHours()
      )
    });
    this.setState({
      deliveryAreaDim: this.state.dataCrossFiltered.dimension(
        d => d.deliveryArea
      )
    });
  }

  state = {
    dataCrossFiltered: crossfilter2(data),
    branchDim: {},
    paymentMethodDim: {},
    orderAmountDim: {},
    orderDateDim: {},
    orderWeekDayDim: {},
    orderMonthDim: {},
    orderTimeDim: {},
    deliveryAreaDim: {}
  };

  /*****Filteration Functions*****/

  /*Deal with filteration of bar charts through brushing. It detects the chart name,
  *and the area of filteration. Chart name is used to decide which dimension to do
  *filteration upon. area of filteration(dataWidth) is the filteration range.*/
  handleChartChange = (dataWidth, chartName) => {
    switch (chartName) {
      case "orderWeekDayChart":
        this.setState(prevState => ({
          orderWeekDayDim: prevState.orderWeekDayDim.filterRange([
            Math.floor(dataWidth[0]), //Math.floor to reduce the float numbers to the nearst.
            Math.floor(dataWidth[1])
          ])
        }));
        break;
      case "deliverAreaChart":
        let minEndDelivery = this.state.deliveryAreaDim.group().top(20)[
          Math.floor(dataWidth[0])
        ];
        let maxEndDelivery = this.state.deliveryAreaDim.group().top(20)[
          Math.floor(dataWidth[1])
        ];
        console.log(minEndDelivery, maxEndDelivery)
        console.log(this.state.deliveryAreaDim.group().top(20))
        /*If minEnd or maxEnd points went over 19.9 this would throw error because the max index
        * is 19 (20 branch).So if it would be larger than 19 I return it to 19.*/
        if (dataWidth[1] >= 19 && dataWidth[0] >= 19) {
          minEndDelivery = 19;
          maxEndDelivery = 19;
          this.setState(prevState => ({
            deliveryAreaDim: prevState.deliveryAreaDim.filterFunction(area =>
              area === minEndDelivery.key ||
              area === maxEndDelivery.key 
            )
          }));
        } else if (dataWidth[0] >= 19) {
          minEndDelivery = 19;
          this.setState(prevState => ({
            deliveryAreaDim: prevState.deliveryAreaDim.filterFunction(area => 
              area === minEndDelivery.key ||
              area === maxEndDelivery.key
            )
          }));
        } else if (dataWidth[1] >= 19) {
          maxEndDelivery = 19;
          this.setState(prevState => ({
            deliveryAreaDim: prevState.deliveryAreaDim.filterFunction(area => 
              area === minEndDelivery.key ||
              area === maxEndDelivery.key
            )
          }));
        } else {
          this.setState(prevState => ({
            deliveryAreaDim: prevState.deliveryAreaDim.filterFunction(area => 
              area === minEndDelivery.key ||
              area === maxEndDelivery.key
            )
          }));
        }
        break;
      /* case "branchChart":
        let minEndBranch = this.state.branchDim.group().all()[
          Math.floor(dataWidth[0])
        ];
        let maxEndBranch = this.state.branchDim.group().all()[
          Math.floor(dataWidth[1])
        ];
        //Here the max index is 5 (6 branches)
        if (dataWidth[1] >= 5 && dataWidth[0] >= 5) {
          minEndBranch = 5;
          maxEndBranch = 5;
          this.setState(prevState => ({
            branchDim: prevState.branchDim.filterRange([
              minEndBranch.key,
              minEndBranch.key + "a"
            ])
          }));
        } else if (dataWidth[0] >= 5.9) {
          minEndBranch = 5;
          this.setState(prevState => ({
            branchDim: prevState.branchDim.filterRange([
              minEndBranch.key,
              maxEndBranch.key
            ])
          }));
        } else if (dataWidth[1] >= 5.9) {
          maxEndBranch = 5;
          this.setState(prevState => ({
            branchDim: prevState.branchDim.filterRange([
              minEndBranch.key,
              maxEndBranch.key + "a"
            ])
          }));
        } else {
          this.setState(prevState => ({
            branchDim: prevState.branchDim.filterRange([
              minEndBranch.key,
              maxEndBranch.key
            ])
          }));
        }
        break;*/
      case "orderDateChart":
        this.setState(prevState => ({
          orderDateDim: prevState.orderDateDim.filterRange([
            Math.floor(dataWidth[0]),
            Math.floor(dataWidth[1])
          ])
        }));
        break;
        case "orderMonthChart":
        this.setState(prevState => ({
          orderMonthDim: prevState.orderMonthDim.filterRange([
            Math.floor(dataWidth[0]),
            Math.floor(dataWidth[1])
          ])
        }));
        break;
      default:
        break;
    }
  };
  //Deal with filteration of Branch bar charts by clicking on bars.
  handleBranchBarClick = selectedBranches => {
    if (!selectedBranches.length) {
      //Reset filter on the branch bar charts when second clicked.
      this.setState(prevState => ({
        branchDim: prevState.branchDim.filterAll()
      }));
    } else {
      /*When there is clicked bar(s). Filter according the array contains bars' labels.
    I iterate over the maximum array length to be sure that I take into account any number of bars clicked.*/
      this.setState(prevState => ({
        branchDim: prevState.branchDim.filterFunction(
          d =>
            d === selectedBranches[0] ||
            d === selectedBranches[1] ||
            d === selectedBranches[2] ||
            d === selectedBranches[3] ||
            d === selectedBranches[4] ||
            d === selectedBranches[5]
        )
      }));
    }
  };

  //Deal with filteration by clicking on Pie charts' slices.
  handlePieSliceClick = selectedSlices => {
    //Filterate the array to select every dimension slices and store them in different variables.
    const paymentMethodPie = selectedSlices.filter(
      slice => slice === "Cash" || slice === "CreditCard" || slice === "KNET"
    );
    //Slices for orderTime Pie and orderAmount Pie are in array format.
    const orderTimePie = selectedSlices.filter(
      slice =>
        slice[0] === 6 || slice[0] === 12 || slice[0] === 17 || slice[1] === 24 //To avoid double storage of the same slice (num 20 is shared in the two dimensions. )
    );
    const orderAmountPie = selectedSlices.filter(
      slice =>
        slice[0] === 0 ||
        slice[0] === 10 ||
        slice[1] === 40 || //To avoid double storage of the same slice (num 20 is shared in the two dimensions. )
        slice[0] === 40 ||
        slice[0] === 70
    );
    //If any slice of payment Method pie clicked.
    if (paymentMethodPie.length) {
      this.setState(prevState => ({
        paymentMethodDim: prevState.paymentMethodDim.filterFunction(
          slice =>
            slice === paymentMethodPie[0] ||
            slice === paymentMethodPie[1] ||
            slice === paymentMethodPie[2]
        )
      }));
    } else {
      //Reset filter on the paymentMethodDim pie chart when slices reset by double clicked.
      this.setState(prevState => ({
        paymentMethodDim: prevState.paymentMethodDim.filterAll()
      }));
    }
    if (orderTimePie.length) {
      switch (orderTimePie.length) {
        /*Labels for time are in array format and divided into 4 time points to overcome the
        * the time range from 20 to 6*/
        case 1:
          this.setState(prevState => ({
            orderTimeDim: prevState.orderTimeDim.filterFunction(
              slice =>
                (slice >= orderTimePie[0][0] && slice < orderTimePie[0][1]) ||
                (slice >= orderTimePie[0][2] && slice < orderTimePie[0][3])
            )
          }));
          break;
        case 2:
          this.setState(prevState => ({
            orderTimeDim: prevState.orderTimeDim.filterFunction(
              slice =>
                (slice >= orderTimePie[0][0] && slice < orderTimePie[0][1]) ||
                (slice >= orderTimePie[0][2] && slice < orderTimePie[0][3]) ||
                (slice >= orderTimePie[1][0] && slice < orderTimePie[1][1]) ||
                (slice >= orderTimePie[1][2] && slice < orderTimePie[1][3])
            )
          }));
          break;
        case 3:
          this.setState(prevState => ({
            orderTimeDim: prevState.orderTimeDim.filterFunction(
              slice =>
                (slice >= orderTimePie[0][0] && slice < orderTimePie[0][1]) ||
                (slice >= orderTimePie[0][2] && slice < orderTimePie[0][3]) ||
                (slice >= orderTimePie[1][0] && slice < orderTimePie[1][1]) ||
                (slice >= orderTimePie[1][2] && slice < orderTimePie[1][3]) ||
                (slice >= orderTimePie[2][0] && slice < orderTimePie[2][1]) ||
                (slice >= orderTimePie[2][2] && slice < orderTimePie[2][3])
            )
          }));
          break;
        case 4:
          this.setState(prevState => ({
            orderTimeDim: prevState.orderTimeDim.filterFunction(
              slice =>
                (slice >= orderTimePie[0][0] && slice < orderTimePie[0][1]) ||
                (slice >= orderTimePie[0][2] && slice < orderTimePie[0][3]) ||
                (slice >= orderTimePie[1][0] && slice < orderTimePie[1][1]) ||
                (slice >= orderTimePie[1][2] && slice < orderTimePie[1][3]) ||
                (slice >= orderTimePie[2][0] && slice < orderTimePie[2][1]) ||
                (slice >= orderTimePie[2][2] && slice < orderTimePie[2][3]) ||
                (slice >= orderTimePie[3][0] && slice < orderTimePie[3][1]) ||
                (slice >= orderTimePie[3][2] && slice < orderTimePie[3][3])
            )
          }));
          break;
        default:
          break;
      }
    } else {
      this.setState(prevState => ({
        orderTimeDim: prevState.orderTimeDim.filterAll()
      }));
    }
    if (orderAmountPie.length) {
      switch (orderAmountPie.length) {
        case 1:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                slice >= orderAmountPie[0][0] && slice < orderAmountPie[0][1]
            )
          }));
          break;
        case 2:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                (slice >= orderAmountPie[0][0] &&
                  slice < orderAmountPie[0][1]) ||
                (slice >= orderAmountPie[1][0] && slice < orderAmountPie[1][1])
            )
          }));
          break;
        case 3:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                (slice >= orderAmountPie[0][0] &&
                  slice < orderAmountPie[0][1]) ||
                (slice >= orderAmountPie[1][0] &&
                  slice < orderAmountPie[1][1]) ||
                (slice >= orderAmountPie[2][0] && slice < orderAmountPie[2][1])
            )
          }));
          break;
        case 4:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                (slice >= orderAmountPie[0][0] &&
                  slice < orderAmountPie[0][1]) ||
                (slice >= orderAmountPie[1][0] &&
                  slice < orderAmountPie[1][1]) ||
                (slice >= orderAmountPie[2][0] &&
                  slice < orderAmountPie[2][1]) ||
                (slice >= orderAmountPie[3][0] && slice < orderAmountPie[3][1])
            )
          }));
          break;
        case 5:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                (slice >= orderAmountPie[0][0] &&
                  slice < orderAmountPie[0][1]) ||
                (slice >= orderAmountPie[1][0] &&
                  slice < orderAmountPie[1][1]) ||
                (slice >= orderAmountPie[2][0] &&
                  slice < orderAmountPie[2][1]) ||
                (slice >= orderAmountPie[3][0] &&
                  slice < orderAmountPie[3][1]) ||
                (slice >= orderAmountPie[4][0] && slice < orderAmountPie[4][1])
            )
          }));
          break;
        default:
          break;
      }
    } else {
      this.setState(prevState => ({
        orderAmountDim: prevState.orderAmountDim.filterAll()
      }));
    }
  };
  //reset all dimensions
  resetAll = () => {
    this.setState(prevState => ({
      branchDim: prevState.branchDim.filterAll()
    }));
    this.setState(prevState => ({
      paymentMethodDim: prevState.paymentMethodDim.filterAll()
    }));
    this.setState(prevState => ({
      deliveryAreaDim: prevState.deliveryAreaDim.filterAll()
    }));
    this.setState(prevState => ({
      orderTimeDim: prevState.orderTimeDim.filterAll()
    }));
    this.setState(prevState => ({
      orderDateDim: prevState.orderDateDim.filterAll()
    }));
    this.setState(prevState => ({
      orderWeekDayDim: prevState.orderWeekDayDim.filterAll()
    }));
    this.setState(prevState => ({
      orderMonthDim: prevState.orderMonthDim.filterAll()
    }));
    this.setState(prevState => ({
      orderAmountDim: prevState.orderAmountDim.filterAll()
    }));
  };
  //reset individual dimension
  resetDim = dim => {
    switch (dim) {
      case "orderCount-paymentMethod":
        this.setState(prevState => ({
          paymentMethodDim: prevState.paymentMethodDim.filterAll()
        }));
        break;
      case "orderCount-orderTime":
        this.setState(prevState => ({
          orderTimeDim: prevState.orderTimeDim.filterAll()
        }));
        break;
      case "orderCount-orderSize":
        this.setState(prevState => ({
          orderAmountDim: prevState.orderAmountDim.filterAll()
        }));
        break;
      case "revenue-paymentMethod":
        this.setState(prevState => ({
          paymentMethodDim: prevState.paymentMethodDim.filterAll()
        }));
        break;
      case "revenue-orderTime":
        this.setState(prevState => ({
          orderTimeDim: prevState.orderTimeDim.filterAll()
        }));
        break;
      case "revenue-orderSize":
        this.setState(prevState => ({
          orderAmountDim: prevState.orderAmountDim.filterAll()
        }));
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <OrderCountCharts
          orderTimeDim={this.state.orderTimeDim}
          paymentMethodDim={this.state.paymentMethodDim}
          orderAmountDim={this.state.orderAmountDim}
          branchDim={this.state.branchDim}
          deliveryAreaDim={this.state.deliveryAreaDim}
          orderWeekDayDim={this.state.orderWeekDayDim}
          handleChartChange={this.handleChartChange}
          handleBranchBarClick={this.handleBranchBarClick}
          handlePieSliceClick={this.handlePieSliceClick}
          resetAll={this.resetAll}
          resetDim={this.resetDim}
        />

        <RevenueCharts
          branchDim={this.state.branchDim}
          deliveryAreaDim={this.state.deliveryAreaDim}
          orderWeekDayDim={this.state.orderWeekDayDim}
          paymentMethodDim={this.state.paymentMethodDim}
          orderTimeDim={this.state.orderTimeDim}
          orderAmountDim={this.state.orderAmountDim}
          handleChartChange={this.handleChartChange}
          handleBranchBarClick={this.handleBranchBarClick}
          handlePieSliceClick={this.handlePieSliceClick}
          resetAll={this.resetAll}
          resetDim={this.resetDim}
        />

        <TimeSeriesCharts
          orderDateDim={this.state.orderDateDim}
          handleChartChange={this.handleChartChange}
          orderMonthDim={this.state.orderMonthDim}
          resetAll={this.resetAll}
          resetDim={this.resetDim}
        />

      </div>
    );
  }
}

App.propTypes = {
  orderTimeDim: PropTypes.object,
  paymentMethodDim: PropTypes.object,
  orderAmountDim: PropTypes.object,
  branchDim: PropTypes.object,
  deliveryAreaDim: PropTypes.object,
  orderWeekDayDim: PropTypes.object,
  handleChartChange: PropTypes.func,
  handleBranchBarClick: PropTypes.func,
  handlePieSliceClick: PropTypes.func,
  resetAll: PropTypes.func,
  resetDim: PropTypes.func,
  orderDateDim: PropTypes.object,
  orderMonthDim: PropTypes.object
};

export default App;
