import React, { Component } from "react";
import "./App.css";
import data from "./data";
import crossfilter2 from "crossfilter2";
import PropTypes from "prop-types";
import OrderCountCharts from "./OrderCountCharts";
import RevenueCharts from "./RevenueCharts";
import TimeSeriesCharts from "./TimeSeriesCharts";

class App extends Component {

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
  };

  /*****Filteration Functions*****/

  /*Deal with filteration of bar charts through brushing. It detects the chart name,
  *and the area of filteration. Chart name is used to decide which dimension to do
  *filteration upon. area of filteration(dataWidth) is the filteration range.*/
  handleChartChange = (dataWidth, chartName) => {
    switch (chartName) {
      case "orderWeekDayChart":
        this.state.orderWeekDayDim.filterRange([
          Math.floor(dataWidth[0]),//Math.floor to reduce the float numbers to the nearst.
          Math.floor(dataWidth[1])
        ]);
        this.setState({
          data
        });
        break;
      case "deliverAreaChart":
        let minEndDelivery = this.state.deliveryAreaDim.group().top(20)[
          Math.floor(dataWidth[0])
        ];
        let maxEndDelivery = this.state.deliveryAreaDim.group().top(20)[
          Math.floor(dataWidth[1])
        ];
        /*If minEnd or maxEnd points went over 19.9 this would throw error because the max index
        * is 19 (20 branch).So if it would be larger than 19 I return it to 19.*/
        if (dataWidth[1] >= 19 && dataWidth[0] >= 19) {
          minEndDelivery = 19;
          maxEndDelivery = 19;
          this.state.deliveryAreaDim.filterRange([
            minEndDelivery.key,
            maxEndDelivery.key + "a"//This is to include the maxEnd value in the range.
          ]);
        } else if (dataWidth[0] >= 19) {
          minEndDelivery = 19;
          this.state.deliveryAreaDim.filterRange([
            minEndDelivery.key,
            maxEndDelivery.key
          ]);
        } else if (dataWidth[1] >= 19) {
          maxEndDelivery = 19;
          this.state.deliveryAreaDim.filterRange([
            minEndDelivery.key,
            maxEndDelivery.key + "a"
          ]);
        } else {
          this.state.deliveryAreaDim.filterRange([
            minEndDelivery.key,
            maxEndDelivery.key
          ]);
        }
        this.setState({
          data
        });
        break;
      case "branchChart":
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
          this.state.branchDim.filterRange([
            minEndBranch.key,
            minEndBranch.key + "a"
          ]);
        } else if (dataWidth[0] >= 5.9) {
          minEndBranch = 5;
          this.state.branchDim.filterRange([
            minEndBranch.key,
            maxEndBranch.key
          ]);
        } else if (dataWidth[1] >= 5.9) {
          maxEndBranch = 5;
          this.state.branchDim.filterRange([
            minEndBranch.key,
            maxEndBranch.key + "a"
          ]);
        } else {
          this.state.branchDim.filterRange([
            minEndBranch.key,
            maxEndBranch.key
          ]);
        }
        this.setState({
          data
        });
        break;
      case "orderDateChart":
        this.state.orderDateDim.filterRange([
          Math.floor(dataWidth[0]),
          Math.floor(dataWidth[1])
        ]);
        this.setState({
          data
        });
        break;
      default:
        break;
    }
  };
  //Deal with filteration of Branch bar charts by clicking on bars.
  handleBranchBarClick = branch => {
    this.state.branchDim.filterExact(branch);
    this.setState({
      data
    });
  };
  //Reset filter on the branch bar charts when second clicked.
  resetBarFilter = branch => {
    this.state.branchDim.filterAll();
    this.setState({
      data
    });
  };

  /* handlePieSliceClick = pieSlice => {
    switch ()
  } */

  render() {
    return (
      <div className="App">
        <h1>Analyze</h1>
        <button onClick={this.handleClick}>Filter</button>
        <button onClick={this.handleSecondClick}>Reset</button>

        <OrderCountCharts
          orderTimeDim={this.state.orderTimeDim}
          paymentMethodDim={this.state.paymentMethodDim}
          orderAmountDim={this.state.orderAmountDim}
          branchDim={this.state.branchDim}
          deliveryAreaDim={this.state.deliveryAreaDim}
          orderWeekDayDim={this.state.orderWeekDayDim}
          handleChartChange={this.handleChartChange}
          handleBranchBarClick={this.handleBranchBarClick}
          resetBarFilter={this.resetBarFilter}
          handlePieSliceClick={this.handlePieSliceClick}
          resetPieFilter={this.resetPieFilter}
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
          handleChartChange={this.handleChartChange}
          handleBranchBarClick={this.handleBranchBarClick}
          resetBarFilter={this.resetBarFilter}
          handlePieSliceClick={this.handlePieSliceClick}
          resetPieFilter={this.resetPieFilter}
        />
        <button onClick={this.handleClick}>Filter</button>
        <button onClick={this.handleSecondClick}>Filter Again</button>
        <TimeSeriesCharts
          orderDateDim={this.state.orderDateDim}
          handleChartChange={this.handleChartChange}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array,
  countPerPayment: PropTypes.func,
  countPerTime: PropTypes.func
};

export default App;
