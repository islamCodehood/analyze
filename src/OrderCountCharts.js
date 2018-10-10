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
                    data={
                        this.props.paymentMethodDim.group().all().map(paymentMethod => {return {y: paymentMethod.value, label: paymentMethod.key}})
                    }
                    height={200}
                    colorScale="warm"
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />
                <VictoryPie
                    data={[
                        { y: this.props.orderTimeDim.group(d => d >= 6).all()[1].value - this.props.orderTimeDim.group(d => d >= 12).all()[1].value, label: "Morning" },
                        { y: this.props.orderTimeDim.group(d => d >= 12).all()[1].value - this.props.orderTimeDim.group(d => d >= 17).all()[1].value, label: "Afternoon" },
                        { y: this.props.orderTimeDim.group(d => d >= 17).all()[1].value - this.props.orderTimeDim.group(d => d >= 20).all()[1].value, label: "Evening" },
                        { y: this.props.orderTimeDim.group(d => d >= 20).all()[1].value + this.props.orderTimeDim.group(d => d >= 6).all()[0].value, label: "Night" }
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


                >
                    
                    <VictoryBar
                        data={this.props.branchDim.group().all().map(branch => {return {y: branch.value, x: branch.key}}) }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                    />
                </VictoryChart>

                <VictoryChart 
                    domainPadding={20}
                >
                    
                    <VictoryBar
                        data={this.props.deliveryAreaDim.group().top(20).map(order => {return {y: order.value, x: order.key}}) }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                    />
                </VictoryChart>

                <VictoryChart 
                    domainPadding={20}
                >
                    <VictoryBar
                        data={this.props.dayDim.group().all().map(day => {return {y: day.value, x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.key]}}) }
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