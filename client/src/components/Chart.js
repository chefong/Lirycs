import React, { Component } from 'react';
import './Chart.css';

let ZingChart = require('zingchart-react').core;

class Chart extends Component {

  render() {
    return (
      <div className="chart-container">
        <ZingChart 
          id="myChart"
          height="500" 
          width="800"
          theme="dark"
          data={
            { 
              type: 'wordcloud',
              options: {
                text: this.props.lyrics,
                maxItems: 80,
                aspect: 'spiral',
                colorType: 'palette',
                palette: ['#1db954', '#0b6623', '#9dc183', '#c7ea46', '#3f704d', '#00A86B', '#8F9779', '#A9BA9D', '#98FB98', '#01796F', '#D0F0C0', '#00A572', '#4B5320', '#50C878', '#39FF14'],
                style: {
                  fontFamily: 'Catamaran',
                  hoverState: {
                    alpha: 1,
                    backgroundColor: 'black',
                    borderColor: 0,
                    fontColor: 'white',
                    textAlpha: 1,
                  }
                }
              } 
            }
          } 
        />
      </div>
    );
  }
}

export default Chart;