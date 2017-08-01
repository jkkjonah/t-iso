import React, { Component } from 'react';
import logo from './logo.svg';
import dateFormat from 'dateformat';

class DefaultView extends Component {

  constructor(props){
    super(props);

    // data
    this.isos = props.isos;
    this.isoCounts = props.isoCounts;

    // hooks
    this.onCreateIsoClick = props.startCreateIso;
    this.onViewProfileClick = props.viewMyProfile;
  }

  getDateText(iso){
    let dateMin = iso.startDate;
    let dateMax = iso.endDate;

    return (
      <span>between { dateFormat(dateMin, "mmmm dS, yyyy") } and { dateFormat(dateMax, "mmmm dS, yyyy") }</span>
    )
  }

  getBudgetText(iso){
    let budgetLow = iso.budgetLow;
    let budgetHigh = iso.budgetHigh;

    return (
      <span>between ${ budgetLow } and ${ budgetHigh }</span>
    );
  }

  getIsoMatchCountText(iso){
    if (this.isoCounts[iso.id]){
      return <span>{ this.isoCounts[iso.id] } new matches!</span>
    }
    return ''
  }

  render(){
    return (
      <div>
        <h1>My Isos</h1>
        {
          !this.isos.length ? <div>Click the + button to continue</div> : (
            <table>
              <tbody>
                {
                  this.isos.map((iso) => {
                    return (
                      <tr>
                        <td><img src={logo} className="App-logo" alt="logo" /></td>
                        <td>Im in search of a <span>{ iso.isoTypeLabel }</span> in <span>{ iso.city }, { iso.state }</span> { this.getDateText(iso) }. My budget range is { this.getBudgetText(iso) }</td>
                        <td>{ this.getIsoMatchCountText(iso) }</td>
                      </tr>
                  ) })
                }
              </tbody>
            </table>
          )
        }
        <button onClick={ this.onCreateIsoClick }>+</button>
        <button onClick={ this.onViewProfileClick }>View My Profile</button>
      </div>
    )
  }

}

export default DefaultView;
