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
      orderAmountDim: this.state.dataCrossFiltered.dimension(
        d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, "")) //remove the dollar sign.
      )
    });
    this.setState({
      orderDateDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate).getDate()
      )
    });
    this.setState({
      orderWeekDayDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate).getDay()
      )
    });
    this.setState({
      orderMonthDim: this.state.dataCrossFiltered.dimension(d =>
        new Date(d.orderdate).getMonth()
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
    deliveryAreaDim: {},
    externalMutations: undefined,
    externalMutationsPaymentOrderCount: undefined,
    externalMutationsPaymentRevenue: undefined
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
  handleBranchBarClick = (selectedBranches) => {
    if (!selectedBranches.length) {
      /*Reset filter on the branch bar charts when second clicked.
      * When same bar clicked for the second time, it will be filtered from the returned array state.*/
      this.setState(prevState => ({
        branchDim: prevState.branchDim.filterAll()
      }));
    } else {
      /*When there is clicked bar(s). Filter according the array contains bars' labels.
    I iterate over the maximum array length to be sure that I take into account any number of bars clicked.*/
      this.setState(prevState => ({
        branchDim: prevState.branchDim.filterFunction(
          (
            d //taking into consideration any possible array length of branches selected(max number is 6 branches)
          ) =>
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

  //Deal with filteration of Delivery Area bar charts by clicking on bars.
  handleDeliveryAreaBarClick = selectedAreas => {
    if (!selectedAreas.length) {
      /*Reset filter on the Delivery Area bar charts when second clicked.
      * When same bar clicked for the second time, it will be filtered from the returned array state.*/
      this.setState(prevState => ({
        deliveryAreaDim: prevState.deliveryAreaDim.filterAll()
      }));
    } else {
      /*When there is clicked bar(s). Filter according the array contains bars' labels.
    I iterate over the maximum array length to be sure that I take into account any number of bars clicked.*/
      this.setState(prevState => ({
        deliveryAreaDim: prevState.deliveryAreaDim.filterFunction(
          (
            d //taking into consideration any possible array length of delivery areas selected(max number is 20 areas)
          ) =>
            d === selectedAreas[0] ||
            d === selectedAreas[1] ||
            d === selectedAreas[2] ||
            d === selectedAreas[3] ||
            d === selectedAreas[4] ||
            d === selectedAreas[5] ||
            d === selectedAreas[6] ||
            d === selectedAreas[7] ||
            d === selectedAreas[8] ||
            d === selectedAreas[9] ||
            d === selectedAreas[10] ||
            d === selectedAreas[11] ||
            d === selectedAreas[12] ||
            d === selectedAreas[13] ||
            d === selectedAreas[14] ||
            d === selectedAreas[15] ||
            d === selectedAreas[16] ||
            d === selectedAreas[17] ||
            d === selectedAreas[18] ||
            d === selectedAreas[19]
        )
      }));
    }
  };

  //Deal with filteration by clicking on Pie charts' slices.
  handlePieSliceClick = (selectedSlices, selectedPaymentKeys, selectedOrderSizeKeys, selectedOrderTimeKeys) => {
    //Filterate the array to select every dimension slices and store them in different variables.
    const paymentMethodPie = selectedSlices.filter(
      slice => slice === "Cash" || slice === "CreditCard" || slice === "KNET"
    );
    //Slices for orderTime Pie and orderAmount Pie are in array format.
    const orderTimePie = selectedSlices.filter(
      (
        slice //filteration accord to the first element of the arrays inside the selectedSlices array.
      ) =>
        slice[0] === 6 || slice[0] === 12 || slice[0] === 17 || slice[1] === 24 //Exception: To avoid double storage of the same slice (num 20 is shared in the two dimensions. )
    );

     
    const orderAmountPie = selectedSlices.filter(
      (
        slice //filteration accord to the first element of the arrays inside the selectedSlices array.
      ) =>
        slice[0] === 0 ||
        slice[0] === 10 ||
        slice[1] === 40 || //Exception: To avoid double storage of the same slice (num 20 is shared in the two dimensions. )
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
      /* this.setState({
        externalMutationsPaymentOrderCount: [
          {
            childName: "paymentMethodOrderCount",
            target: ["data"],
            eventKey: [0, 1, 2].filter(key => key !== selectedPaymentKeys[0] && key !== selectedPaymentKeys[1] && key !== selectedPaymentKeys[2]), 
            mutation: () => ({ style: { fill: "rgb(128,128,128)" } }),
            callback: this.removeMutation
          }
        ]
      })  */      
      /* this.setState({
        externalMutationsPaymentRevenue: [
          {
            childName: "paymentMethodRevenue",
            target: ["data"],
            eventKey: [0, 1, 2].filter(key => key !== selectedPaymentKeys[0] && key !== selectedPaymentKeys[1] && key !== selectedPaymentKeys[2]), 
            mutation: () => ({ style: { fill: "rgb(128,128,128)" } }),
            callback: this.removeMutation
          }
        ]
      }) */       
    } else {
      //Reset filter on the paymentMethodDim pie chart when slices reset by double clicked.
      this.setState(prevState => ({
        paymentMethodDim: prevState.paymentMethodDim.filterAll()
      }));
    }
    //If any slice of order Time pie clicked.
    if (orderTimePie.length) {
      switch (orderTimePie.length) {
        /*Labels for time are in array format and divided into 4 time points to overcome issue of
        * the time range from 20 to 6*/
        case 1:
          this.setState(prevState => ({
            orderTimeDim: prevState.orderTimeDim.filterFunction(
              slice =>
                (slice >= orderTimePie[0][0] && slice < orderTimePie[0][1]) ||
                (slice >= orderTimePie[0][2] && slice < orderTimePie[0][3])
            )
          }));
          /* this.setState({
            externalMutations: [
              {
                childName: "orderTime",
                target: ["data"],
                eventKey: [0, 1, 2, 3].filter(key => key !== selectedOrderTimeKeys[0]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          }) */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderTime",
                target: ["data"],
                eventKey: [0, 1, 2, 3].filter(key => key !== selectedOrderTimeKeys[0] && key !== selectedOrderTimeKeys[1]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          }) */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderTime",
                target: ["data"],
                eventKey: [0, 1, 2, 3].filter(key => key !== selectedOrderTimeKeys[0] && key !== selectedOrderTimeKeys[1] && key !== selectedOrderTimeKeys[2]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          }) */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderTime",
                target: ["data"],
                eventKey: [0, 1, 2, 3].filter(key => key !== selectedOrderTimeKeys[0] && key !== selectedOrderTimeKeys[1] && key !== selectedOrderTimeKeys[2] && key !== selectedOrderTimeKeys[3]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          }) */
          break;
        default:
          break;
      }
    } else {
      this.setState(prevState => ({
        orderTimeDim: prevState.orderTimeDim.filterAll()
      }));
    }
    //If any slice of order Amount pie clicked.
    if (orderAmountPie.length) {
      switch (orderAmountPie.length) {
        case 1:
          this.setState(prevState => ({
            orderAmountDim: prevState.orderAmountDim.filterFunction(
              slice =>
                slice >= orderAmountPie[0][0] && slice < orderAmountPie[0][1]
            )
          }));
          /* this.setState({
            externalMutations: [
              {
                childName: "orderSize",
                target: ["data"],
                eventKey: [0, 1, 2, 3, 4].filter(key => key !== selectedOrderSizeKeys[0]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          })  */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderSize",
                target: ["data"],
                eventKey: [0, 1, 2, 3, 4].filter(key => key !== selectedOrderSizeKeys[0] && key !== selectedOrderSizeKeys[1]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          })  */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderSize",
                target: ["data"],
                eventKey: [0, 1, 2, 3, 4].filter(key => key !== selectedOrderSizeKeys[0] && key !== selectedOrderSizeKeys[1] && key !== selectedOrderSizeKeys[2]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          })  */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderSize",
                target: ["data"],
                eventKey: [0, 1, 2, 3, 4].filter(key => key !== selectedOrderSizeKeys[0] && key !== selectedOrderSizeKeys[1] && key !== selectedOrderSizeKeys[2] && key !== selectedOrderSizeKeys[3]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          })  */
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
          /* this.setState({
            externalMutations: [
              {
                childName: "orderSize",
                target: ["data"],
                eventKey: [0, 1, 2, 3, 4].filter(key => key !== selectedOrderSizeKeys[0] && key !== selectedOrderSizeKeys[1] && key !== selectedOrderSizeKeys[2] && key !== selectedOrderSizeKeys[3] && key !== selectedOrderSizeKeys[4]), 
                mutation: () => ({ style: { fill: "#808080" } }),
                callback: this.removeMutation
              }
            ]
          })  */
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

  //reset all dimensions, and reset all charts colors.
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

    this.setState({
      externalMutations: [
        {
          childName: "branch",
          target: ["data"],
          eventKey: "all",
          mutation: () => ({ style: { fill: "#008f68" } }),
          callback: this.removeMutation
        },
        {
          childName: "deliveryArea",
          target: ["data"],
          eventKey: "all",
          mutation: () => ({ style: { fill: "#33619D" } }),
          callback: this.removeMutation
        },
        {
          childName: "orderSize",
          target: ["data"],
          eventKey: "all",
          mutation: props => {
            switch (props.index) {
              case 0:
                return { style: { fill: "#c8e7b0" } };
              case 1:
                return { style: { fill: "#3d3d42" } };
              case 2:
                return { style: { fill: "#4db7ce" } };
              case 3:
                return { style: { fill: "#008f68" } };
              case 4:
                return { style: { fill: "#EFBB35" } };
              default:
                break;
            }
          },
          callback: this.removeMutation
        },
        {
          childName: "orderTime",
          target: ["data"],
          eventKey: "all",
          mutation: props => {
            switch (props.index) {
              case 0:
                return { style: { fill: "#c8e7b0" } };
              case 1:
                return { style: { fill: "#3d3d42" } };
              case 2:
                return { style: { fill: "#4db7ce" } };
              case 3:
                return { style: { fill: "#008f68" } };
              default:
                break;
            }
          },
          callback: this.removeMutation
        }
      ]
    });
    //Payment method pie is handled alone because it contains different slices' colors order than other pies.
    this.setState({
      externalMutationsPaymentOrderCount: [
        {
          childName: "paymentMethodOrderCount",
          target: ["data"],
          eventKey: "all",
          mutation: props => {
            switch (props.index) {
              case 0:
                return { style: { fill: "#3d3d42" } };
              case 1:
                return { style: { fill: "#008f68" } };
              case 2:
                return { style: { fill: "#EFBB35" } };
              default:
                break;
            }
          },
          callback: this.removeMutation
        }
      ]
    });
    this.setState({
      externalMutationsPaymentRevenue: [
        {
          childName: "paymentMethodRevenue",
          target: ["data"],
          eventKey: "all",
          mutation: props => {
            switch (props.index) {
              case 0:
                return { style: { fill: "#3d3d42" } };
              case 1:
                return { style: { fill: "#008f68" } };
              case 2:
                return { style: { fill: "#EFBB35" } };
              default:
                break;
            }
          },
          callback: this.removeMutation
        }
      ]
    });
  };
  // Remove external mustation to reset charts' colors.
  removeMutation = () => {
    this.setState({
      externalMutations: undefined
    });
    this.setState({
      externalMutationsPaymentOrderCount: undefined
    });
    this.setState({
      externalMutationsPaymentRevenue: undefined
    });
    this.setState({
      inactivePart: undefined
    });
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
          handleDeliveryAreaBarClick={this.handleDeliveryAreaBarClick}
          externalMutations={this.state.externalMutations}
          externalMutationsPayment={this.state.externalMutationsPaymentOrderCount}
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
          handleDeliveryAreaBarClick={this.handleDeliveryAreaBarClick}
          externalMutations={this.state.externalMutations}
          externalMutationsPayment={this.state.externalMutationsPaymentRevenue}
        />

        <TimeSeriesCharts
          orderDateDim={this.state.orderDateDim}
          handleChartChange={this.handleChartChange}
          orderMonthDim={this.state.orderMonthDim}
          resetAll={this.resetAll}
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
  orderDateDim: PropTypes.object,
  orderMonthDim: PropTypes.object
};

export default App;
