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


            </div>
        )
    }
}

export default OrderCountCharts