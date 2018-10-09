import React, { Component } from 'react'
import {
    VictoryPie,
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme
} from 'victory';
import PropTypes from 'prop-types'

class OrderCountCharts extends Component {
    render() {
        return (
            <div>
                <VictoryPie
                    data={[
                        { y: this.props.paymentMethodDim.group().all()[0].value, label: "Cash" },
                        { y: this.props.paymentMethodDim.group().all()[1].value, label: "Credit Card" },
                        { y: this.props.paymentMethodDim.group().all()[2].value, label: "KNET" }
                    ]}
                    height={200}
                    colorScale="warm"
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />
                <VictoryPie
                    data={[
                        { y: this.props.orderdateDim.group(d => d >= 6).all()[1].value - this.props.orderdateDim.group(d => d >= 12).all()[1].value, label: "Morning" },
                        { y: this.props.orderdateDim.group(d => d >= 12).all()[1].value - this.props.orderdateDim.group(d => d >= 17).all()[1].value, label: "Afternoon" },
                        { y: this.props.orderdateDim.group(d => d >= 17).all()[1].value - this.props.orderdateDim.group(d => d >= 20).all()[1].value, label: "Evening" },
                        { y: this.props.orderdateDim.group(d => d >= 20).all()[1].value + this.props.orderdateDim.group(d => d >= 6).all()[0].value, label: "Night" }
                    ]}
                    height={200}
                    colorScale="warm"
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />
                <VictoryPie
                    data={[
                        { y: this.props.orderAmountDim.group(d => d >= 10).all()[0].value, label: "< $10" },
                        { y: this.props.orderAmountDim.group(d => d >= 10).all()[1].value - this.props.orderAmountDim.group(d => d >= 20).all()[1].value, label: "$10 - $20" },
                        { y: this.props.orderAmountDim.group(d => d >= 20).all()[1].value - this.props.orderAmountDim.group(d => d >= 40).all()[1].value, label: "$20 - $40" },
                        { y: this.props.orderAmountDim.group(d => d >= 40).all()[1].value - this.props.orderAmountDim.group(d => d >= 70).all()[1].value, label: "$40 - $70" },
                        { y: this.props.orderAmountDim.group(d => d >= 70).all()[1].value, label: "> $70" }
                    ]}
                    height={200}
                    colorScale="warm"
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />

                <VictoryChart
                    domainPadding={20}
                    theme={VictoryTheme.material}


                >
                    <VictoryAxis

                        tickValues={this.props.branchDim.group().all().map( (branch , index) => index++)}
                        tickFormat={this.props.branchDim.group().all().map(branch => branch.key) }
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryBar
                        data={this.props.branchDim.group().all().map(branch => {return {y: branch.value, label: branch.key}}) }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                    />
                </VictoryChart>

                <VictoryChart 
                    domainPadding={20}
                    theme={VictoryTheme.material}


                >
                    <VictoryAxis

                        tickValues={this.props.deliveryAreaDim.group().top(20).map( (area , index) => index++)}
                        tickFormat={this.props.deliveryAreaDim.group().top(20).map(area => area.key) }
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryBar
                        data={this.props.deliveryAreaDim.group().top(20).map(order => {return {y: order.value, label: order.key}}) }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                    />
                </VictoryChart>
                <VictoryChart 
                    domainPadding={20}
                    theme={VictoryTheme.material}


                >
                    <VictoryAxis

                        tickValues={this.props.dayDim.group().all().map(day=> day.key)}
                        tickFormat={this.props.dayDim.group().all().map(day => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.key]) }
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryBar
                        data={this.props.dayDim.group().all().map(day => {return {y: day.value, label: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.key]}}) }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                    />
                </VictoryChart>

            </div>
        )
    }
}

OrderCountCharts.propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number,
    colorScale: PropTypes.string,
    labelRadius: PropTypes.number,
    style: PropTypes.object
}

export default OrderCountCharts