import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
//import Moment from 'react-moment';
//import './InsulinChart.css'
class InsulinChart extends Component {

    constructor(props) {
        super(props);
        this.createColorsDepeningOnGlucoseValues = this.createColorsDepeningOnGlucoseValues.bind(this);
        this.createData = this.createData.bind(this);
        this.createOptions = this.createOptions.bind(this);
    }

    render() {
        var moment = require('moment');
       
        let gData = this.createData();
        return (
            <div>
                <h3>Glucos levels</h3>
                <Line
                    options={this.createOptions()}
                    data={gData.data}/>
            </div>
        )
    }

    createOptions(){
        let counter = 0;
        const options = {
            distribution:'linear',
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                    type: 'time',
                    time:{
                        displayFormats:{
                            hour: 'ddd D HH:mm',
                          // day: 'DD/MM'
                        },
                        tooltipFormat:'YYYY-MM-DD hh:mm'
                    },
                    display: true,
                    ticks:{
                        callback: function(dataLabel, index) {
                   
                          if(dataLabel.substring(dataLabel.length-5) === '00:00'){
                            counter++;
                              let sss = dataLabel.substring(0, dataLabel.length-5)
                                return sss;
                            }
                           if(dataLabel.substring(dataLabel.length-2)== '00'){
                                if(counter > 0) {
                                    counter=0;
                                    return ''
                                }
                                counter++;
                                return dataLabel.substring(dataLabel.length-5);
                           }
                            return dataLabel;
                        }
                    }
                }]
            }
        }
        return options;
    }
    createData(){
        let gData= {
            data: {
               // labels: label,
                datasets: [
                    {
                        label: "sugar",
                        fill: false,
                        showLine: false,
                        backgroundColor: this.createColorsDepeningOnGlucoseValues(),//"rgba(255, 0, 255, 0.75)",
                        data: this.props.glucoseData.map(data => ({
                            x: data.date,
                            y: data.sgv/18
                        }))
 
                    }
                ]
            }
        }
        return gData;
    }
    createColorsDepeningOnGlucoseValues() {
        var colors = []
        for(var i = 0; i < this.props.glucoseData.length; i++){
            
            var color;
            var value=-1;
            if(this.props.glucoseData[i].sgv != null)
                var value = this.props.glucoseData[i].sgv/18

            if(value >= 10 || value < 3){
                color = 'red';
            }
            else if(value >= 8.5 || value < 4){
                color = 'yellow';
            }
            else {
                color = 'green';
            }
                colors[i] = color;
        }
        return colors;
    }
}

export default InsulinChart;