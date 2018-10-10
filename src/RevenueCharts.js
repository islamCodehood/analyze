import React, { Component } from 'react'
import {
    VictoryPie,
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme
} from 'victory';
import PropTypes from 'prop-types'

class RevenueCharts extends Component {
    render() {
        return (
            <div>

                <VictoryPie
                    data={
                        this.props.paymentMethodDim.group().reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all().map(paymentMethod => { return { y: paymentMethod.value, label: paymentMethod.key } })
                    }
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
                    data={[
                            { y: this.props.orderTimeDim.group(d => d >= 6).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderTimeDim.group(d => d >= 12).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "Morning" },
                            { y: this.props.orderTimeDim.group(d => d >= 12).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderTimeDim.group(d => d >= 17).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "Afternoon" },
                            { y: this.props.orderTimeDim.group(d => d >= 17).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderTimeDim.group(d => d >= 20).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "Evening" },
                            { y: this.props.orderTimeDim.group(d => d >= 20).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value + this.props.orderTimeDim.group(d => d >= 6).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[0].value, label: "Night" }
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
                data={[
                        { y: this.props.orderAmountDim.group(d => d >= 10).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[0].value, label: "< $10" },
                        { y: this.props.orderAmountDim.group(d => d >= 10).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderAmountDim.group(d => d >= 20).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "$10 - $20" },
                        { y: this.props.orderAmountDim.group(d => d >= 20).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderAmountDim.group(d => d >= 40).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "$20 - $40" },
                        { y: this.props.orderAmountDim.group(d => d >= 40).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value - this.props.orderAmountDim.group(d => d >= 70).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "$40 - $70" },
                        { y: this.props.orderAmountDim.group(d => d >= 70).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all()[1].value, label: "> $70" }
                    ]}
                    height={200}
                    colorScale={["#008f68","#6DB", "#6DB65B", "#4AAE9B", "#EFBB35"]}
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 3000 }
                    }}
                />


                <VictoryChart
                    domainPadding={20}
                >
                    
                    <VictoryBar
                        data={
                            this.props.branchDim.group().reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all().map(branch => { return { y: branch.value, x: branch.key } })
                        }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                        animate={{
                        duration: 2000,
                        onLoad: { duration: 3000 }
                    }}
                    />
                </VictoryChart>

                <VictoryChart
                    domainPadding={4}
                >
                    
                    <VictoryBar
                        data={
                            this.props.deliveryAreaDim.group(d => d.substr(0, 8)).reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).top(20).map(area => { return { y: area.value, x: area.key } })
                        }
                        style={{ labels: { fill: "black", fontSize: 8 } }}
                        animate={{
                        duration: 2000,
                        onLoad: { duration: 3000 }
                    }}
                    />
                </VictoryChart>

                

                <VictoryChart
                    domainPadding={10}
                    /*theme={VictoryTheme.material} */


                >
                    
                    <VictoryBar
                    style={{ labels: { fill: "black", fontSize: 1 }, data: { fill: "#6DB65B", fontSize: 1 } }}
                        data={
                            this.props.dayDim.group().reduceSum(d => parseFloat(d.orderAmount.replace(/[^0-9.-]+/g, ''))).all().map(day => { return { y: day.value, x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.key] } })
                        }
                        animate={{
                        duration: 2000,
                        onLoad: { duration: 3000 }
                    }}
                    />
                </VictoryChart>

                
            </div>
        )
    }
}

export default RevenueCharts
