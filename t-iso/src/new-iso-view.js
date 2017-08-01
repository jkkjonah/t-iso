import React, { Component } from 'react';
import logo from './logo.svg';

class NewIsoView extends Component {

  constructor(props){
    super(props);

    this.createIso = props.createIso;
    this.cancelCreateIso = props.cancelCreateIso;

    this.iso = {};
    this.onPublishClick = this.onPublishClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  onPublishClick(){
    this.createIso(this.iso);
  }

  onCancelClick(){
    this.cancelCreateIso();
  }

  updateProp(propName){
    return (e) => {
      let val = e.target.value;
      this.iso[propName] = val;
    }
  }

  render(){
    return (
      <div>
        <h1>Create a New ISO</h1>
        <div style={{fontSize: 18}}>
          Im in search of <input type="text" placeholder="Vendor Type" onClick={ this.updateProp('isoTypeLabel') } ></input>
          in <input type="text" placeholder="City" onClick={ this.updateProp('city') }></input>, <input type="text" placeholder="State" onClick={ this.updateProp('state') }></input>
          between <input type="text" placeholder="Start Date" onClick={ this.updateProp('startDate') }/> and <input type="text" placeholder="End Date" onClick={ this.updateProp('endDate') }/>.
          My budget range is between $<input type="text" placeholder="Minimum Budget" onClick={ this.updateProp('budgetLow') }/> and $<input type="text" placeholder="Maximum Budget" onClick={ this.updateProp('budgetHigh') }/>.
        </div>
        <button onClick={ this.onPublishClick }>Publish!</button>
        <button onClick={ this.onCancelClick }>Cancel</button>
      </div>
    )
  }

}

export default NewIsoView;
