import React, { Component } from 'react'
import {
    VictoryPie,
    VictoryChart,
    VictoryAxis,
    VictoryTheme
} from 'victory';

class OrderCountCharts extends Component {
    render() {
        return (
            <div>
                <VictoryPie
                    data={[
                        { y: this.props.countPerPayment("Cash"), label: "Cash" },
                        { y: this.props.countPerPayment("KNET"), label: "KNET" },
                        { y: this.props.countPerPayment("CreditCard"), label: "Credit Card" }
                    ]}
                    height={180}
                    colorScale="warm"
                    labelRadius={45}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />
                <VictoryPie
                    data={[
                        { y: this.props.countPerTime(6, 12), label: "Morning" },
                        { y: this.props.countPerTime(12, 17), label: "Afternoon" },
                        { y: this.props.countPerTime(17, 20), label: "Evening" },
                        { y: this.props.countPerTime(20, 24) + this.props.countPerTime(0, 6), label: "Night" },
                    ]}
                    height={200}
                    colorScale="warm"
                    labelRadius={60}
                    style={{ labels: { fill: "black", fontSize: 8 } }}
                />

            </div>
        )
    }
}

export default OrderCountCharts