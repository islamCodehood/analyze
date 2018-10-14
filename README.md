# Analyze


### Contents:

- [Description](#description).
- [App URL](#app-url).
- [React App Hierarchy](#react-app-hierarchy).
- [Dependencies](#dependencies).
- [Installation](#installation).
- [How To Use](#how-to-use).


## Description

- Analyze is a Chart Dashboard consists of 10 Charts and developed by React js.
- It represents a data set of 2000 records.
- The data is imported from a JSON file.
- The app can be used to represent, filter data by different dimensions.
- Dimensions used are:
  1. Payment Method.
  2. Delivery Area.
  3. Order Amount.
  4. Branch.
  5. Order Date.
- Types of Charts used to represent data are:
  1. Pie Chart.
  2. Bar Chart.
  3. Line Chart(Time Series Chart).
- The app gives user the ability to either reset individual dimension, or reset all dimensions.


## App URL

- https://analyzcharts.netlify.com


## React App Hierarchy

  ```bash
├── <App />
        ├── <OrderCountCharts />
        |       
        |       
        ├──<RevenueCharts />
        |
        |
        └──<TimeSeriesCharts />
```


## Dependencies

- [crossfilter2](https://crossfilter.github.io/crossfilter/): An extension of crossfilter. It overcomes the limit of array width of more than 32. This drawback appears with multiple filteration of different dimensions.
- [victory js](https://github.com/FormidableLabs/victory): A collection of composable React components for building interactive data visualizations
- [prop-types](https://github.com/facebook/prop-types).


## Installation

You can either:
1. Visit the [App web page](https://analyzcharts.netlify.com)./ Or
2. Download a compressed version from [here](https://github.com/Islam888/analyze/archive/master.zip). Then:
  - Decompress the app.
  - In your terminale locate the app directory and run `npm install`.
    - To run development mood:
      1. After finishing run `npm start`.
      2. A browser tab will open at a localhost port 3000.
    - To run production mood:
      1. run `npm run build`.
      2. Then to serve it with a static server run `npm install -g serve`.
      3. Then run `serve -s build`.


## How To Use

- Filter Data through each of the methods below:
  1. Filter through pie charts by clicking on individual slices.
  2. Filter through bar chart with Branches dimension by clicking on individual bars.
  3. Filter through other bar charts by brushing through charts.
  4. Filter through line charts (Time series charts) by brushing through charts.
- Reset all filteration by clicking Reset All button.
- Reset individual dimension filteration by clicking Reset Dimension button.



