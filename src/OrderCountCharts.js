import React, { Component } from 'react'
import {
    VictoryPie,
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
                <VictoryPie
                    data={[
                        { y: this.props.countPerAmount(0, 10), label: "< $10" },
                        { y: this.props.countPerAmount(10, 20), label: "$10 - $20" },
                        { y: this.props.countPerAmount(20, 40), label: "$20 - $40" },
                        { y: this.props.countPerAmount(40, 70), label: "$40 - $70" },
                        { y: this.props.countPerAmount(70), label: "> $70" },
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

OrderCountCharts.propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number,
    colorScale: PropTypes.string,
    labelRadius: PropTypes.number,
    style: PropTypes.object
}

export default OrderCountCharts