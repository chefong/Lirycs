import React, { Component } from 'react';
import './Chart.css';

let ZingChart = require('zingchart-react').core;


class Chart extends Component {

  render() {
    return (
      <ZingChart 
        height="300" 
        width="600" 
        data={
          { 
            type: 'wordcloud',
            options: {
              text: 'hello'
            } 
          }
        } 
      />
    );
  }
}

export default Chart;