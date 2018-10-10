import React, { Component } from 'react'
import {
    VictoryLine,
    VictoryChart
} from 'victory';
import PropTypes from 'prop-types'

class TimeSeriesCharts extends Component {
    render() {
        return (
            <div>
                <VictoryChart
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31", strokeWidth: 1 },

                        }}
                        data={this.props.orderDateDim.group().all().map(date => { return { x: date.key, y: date.value } })}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 2000 }
                        }}
                    />
                </VictoryChart>
            </div>
        )
    }
}

export default TimeSeriesCharts