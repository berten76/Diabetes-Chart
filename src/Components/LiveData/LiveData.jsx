import React, {Component} from 'react'
import InsulinChart from '../Shared/InulinChart'
import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions'
import {testReducer, initGlucoseValues} from '../../store/actions/actions'
import './LiveData.css'
import InsulinChart2 from '../Shared/InsulinChart2'

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    margin: 100
  };

class LiveData extends Component {
    constructor() {

        super(); //Error 1
  
        this.onButtonOlderClicked = this.onButtonOlderClicked.bind(this);
        this.onButtonNewerClicked = this.onButtonNewerClicked.bind(this);
        this.isNewButtonDisabled = this.isNewButtonDisabled.bind(this);
        this.state = {
            startDate : new Date(),
            endDate: null
        }
    }
    componentDidMount() {
        this.props.onIncrementCounter();
        var moment = require('moment');
        let currentDate = new Date();
        let startDate = moment(currentDate).subtract(30, 'd');
        
        if(this.props.glucoseData.length > 1){
            startDate = moment(this.props.glucoseData[this.props.glucoseData.length-1].date).add(2, 'm');
        }
        this.props.iniGlucoseValues(startDate);

        let currentStartDate = moment(currentDate).subtract(24, 'h');
        this.setState( {startDate: currentStartDate});
    
    }

    render() {
        var moment = require('moment');
        const start = moment(this.state.startDate).format();
        const end = moment(this.state.endDate).format();
        console.log('component did mount');
        console.log(moment(this.state.startDate).format())
        return (
            <div>
                <h1>Live Data</h1>
                <div  className="bigChart">
                <InsulinChart  glucoseData={filterData(this.props.glucoseData, this.state.startDate, this.state.endDate)} />
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary" onClick={this.onButtonOlderClicked}>Older</button>
                    <button type="button" disabled={this.isNewButtonDisabled(this.props.glucoseData)}  className="btn btn-secondary" onClick={this.onButtonNewerClicked}>Newer</button>
                </div>
            </div>
        )
    }
// <InsulinChart  glucoseData={filterData(this.props.glucoseData, this.state.startDate, this.state.endDate)} />
    isNewButtonDisabled(data){
        if(data ==null || data.length === 0 || data[0].date==null || this.state.endDate == null)
            return true;
        const lastValue = data[data.length-1].date;
        var moment = require('moment');
        console.log('lastval = ' + moment(lastValue).format());
        console.log('enddate = ' + moment(this.state.endDate).format());
        return lastValue <= this.state.endDate;

    }
    //disabled={this.isNewButtonDisabled(this.props.glucoseData)}
     onButtonOlderClicked(){

        var moment = require('moment');
        let endDate = this.state.startDate;
        let newStartDate = moment(this.state.startDate).subtract(24, 'h');
        this.setState( {
            startDate: newStartDate,
            endDate: endDate
        });
    }
    onButtonNewerClicked(){
  
        var moment = require('moment');
        let newEndDate = moment(this.state.endDate).add(24, 'h');
        let newStartDate = this.state.endDate;   
        
        console.log('EndDate = ' + moment(this.state.endDate).format());
        console.log('StartDate = ' + moment(this.state.startDate).format());
        console.log('newEndDate = ' + moment(newEndDate).format());
        console.log('newStartDate = ' + moment(newStartDate).format());

        this.setState( {
            startDate: newStartDate,
            endDate: newEndDate
        });
    }
}

const filterData = (data, startDate, endDate) => {
    var moment = require('moment');

    //let startDate = moment(new Date()).subtract(24, 'h');
    if(endDate === null){
        return data.filter(data => data.date > startDate);
    }
    console.log('start'+ moment(startDate).format());
    console.log('end'+ moment(endDate).format());
    console.log('num '+ data.filter(data => data.date > startDate && data.date < endDate).length);
    return data.filter(data => data.date > startDate && data.date < endDate);
}


//<InsulinChart2 />
//  <InsulinChart className="bigChart" glucoseData={this.props.glucoseData.filter(data => data.date > startDate)} />
const mapStateToProps = state => {
    var moment = require('moment');
        let currentDate = new Date();
        let startDate = moment(currentDate).subtract(30, 'd');
    return {
        result: 1,
        glucoseData: state.glucoseData,
        glocuseDataFiltered: state.glucoseData.filter(data => data.date > startDate)
    };
}
const mapDispatchToProps = dispatch => {
    console.log('dispatch');
    return {
        
        onIncrementCounter: () => dispatch(testReducer()),
        iniGlucoseValues: (startDate) => dispatch(initGlucoseValues(startDate))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveData);