import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
//import Moment from 'react-moment';
//import './InsulinChart.css'
class InsulinChart extends Component {
    getDate(timeInMinute) {
        const timeFormat='HH:mm';
        let d = new Date(2019, 12, 1, 10, 0, 0, 0);
        var moment = require('moment');
        return moment(d).add(timeInMinute, 'm').format(timeFormat);
    }
    constructor(props) {
        super(props);
        

        this.state = {
            data: {
                labels: [this.getDate(0),this.getDate(5),this.getDate(10),this.getDate(15),this.getDate(20),this.getDate(25),this.getDate(30),this.getDate(35),this.getDate(40)],
                datasets: [
                    {
                        label: "sugar",
                        fill: false,
                        showLine: false,
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data:[{
                                x: this.getDate(3),
                                y: 5.3
                            },
                            {
                                x: this.getDate(10),
                                y: 6.5
                            },
                            {
                                x: this.getDate(15),
                                y: 8.5
                            },
                            {
                                x: this.getDate(25),
                                y: 6.5
                            },
                            {
                                x: this.getDate(30),
                                y: 6.1
                            }
                        ]
                    }
                ]
            }
        }
    }
    render() {
        let counter=0;
        var moment = require('moment');
        console.log('this.props.glucoseData');
        console.log(this.props.glucoseData);
       
        let label = this.props.glucoseData.map(data => moment(data.date).format('HH:mm'));
        if(label.length > 0 && this.props.glucoseData[0].date != null){
            returnLabels(this.props.glucoseData[0].date);
            label[0] = moment(this.props.glucoseData[0].date).format('DD/MM');
        }
        let gData= {
            data: {
               // labels: label,
                datasets: [
                    {
                        label: "sugar",
                        fill: false,
                        showLine: false,
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data: this.props.glucoseData.map(data => ({
                            x: data.date,
                            y: data.sgv/18
                        }))
 
                    }
                ]
            }
        }
        console.log('gData');
        console.log(gData);
        return (
        <div>
            <h3>Glucos levels</h3>
            <Line
                options={{
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
                                    console.log('aaaaa '+ dataLabel);
                                      let sss = dataLabel.substring(0, dataLabel.length-5)
                                    console.log('aaaaa '+ sss);
                                        return sss;
                                    }
                                   if(dataLabel.slice(dataLabel.length-2)== '00'){
                                        if(counter > 0) {
                                            counter=0;
                                            return ''
                                        }
                                        counter++;
                                        return dataLabel.slice(dataLabel.length-5);
                                   }
                                    return dataLabel;
                                 
                                  /*  var pos = dataLabel.search(' ');
                                    console.log('dataLabel ' + dataLabel + 'pos' + index);
                                    console.log('pos ' + pos);
                                    var sliced =  dataLabel.slice(pos, dataLabel.length-1);
                                    console.log('aaaaa ' + sliced);
                                    return sliced;
                                    //return index % 1 === 0 ? dataLabel: '';*/
                                }
                            }
                        }]
                    }
                }}
                data={gData.data}
               //data = {this.state.data}
                />

        </div>

        )
    }
}
const returnLabels = (startTimeIn) => {
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiit');
    var moment = require('moment');
    let year = moment(startTimeIn).year();
    let month = moment(startTimeIn).month();
    let day = moment(startTimeIn).day();
    let hour = moment(startTimeIn).hour();
   let currentHour = getLabel(hour);
   let currentDate = new Date(year, month, day, currentHour, 0);
    var i=0;

    new Date()
    let labels = []; 
    for (i = 0; i < 8; i++) {
        labels.push(moment(currentDate).format('HH:mm'));
        currentDate = moment(currentDate).add(6, 'h');
    }

    console.log('dates' + labels+ 'llllllllllllllllllllllllllllllllllllllllllllll');
}
const getLabel = hour => {
    if(hour < 6)
        return 6;
    if(hour < 12)
        return 12;
    if(hour < 18)
        return 18;
    return 0;
}
export default InsulinChart;