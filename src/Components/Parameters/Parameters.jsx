import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import './Parameters.css';

import "react-datepicker/dist/react-datepicker.css";

class Parameters extends Component {
    state = {
        startDate: new Date()
      };
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        return (
            <div>
          
                <h2>Calculate parameters</h2>
                <div className="container.col-sm-">
                    <div className="row temp">
                        <div className="col-md-2"></div>
                        <div className="col-md-1 text-left">From:</div>
                        <div className="col-md-1">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-8"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-1 text-left">To:</div>
                        <div className="col-md-1">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-8"></div>
                     </div>
                     <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-1">
                            <button class="btn btn-primary">Calculate</button>
                         </div>
                         <div className="col-md-8"></div>
                     </div>
            </div>
            </div>
        )
    }
}

export default Parameters;