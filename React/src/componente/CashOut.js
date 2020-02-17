import React, { Component } from 'react';
import {cashOut } from './api/api';
import Nav from 'react-bootstrap/Nav'
import NavUser from './NavUser';




export default class CashOut extends Component {
  constructor(props) {
     super(props);
     this.user = this.props.location.state;
 
     this.state = {
        fromCVU: '',
        toCVU : '',
        amount: '',
        error: props.error,
        isSuccess: false,
        user : props.location.state

       
     };

     this.successTitle = 'Cash Out';
     this.changeFromCVU = this.changeFromCVU.bind(this);
     this.changeToCVU = this.changeToCVU.bind(this);
     this.changeAmount = this.changeAmount.bind(this);
     this.executeCashOut = this.executeCashOut.bind(this);

   }

   changeFromCVU(event) {
    this.setState({ fromCVU: event.data });
  }

  changeToCVU(event) {
    this.setState({ toCVU: event.target.value });
  }
  
  changeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  renderSuccessModal() { 
    return (
      <div className="modal" tabindex="-1" role="dialog" style={{ display: this.state.isSuccess ? 'block' : '' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.successTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ isSuccess: false })}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.state.successMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/home', this.user)}>Go to page</button>
            </div>
          </div>
        </div>
      </div>
      );

  }

  executeCashOut() {
      cashOut({ fromCVU: this.user.account.cvu, toCVU: this.state.toCVU, amount: this.state.amount})
      .then((res)=>{   
        this.setState({ isSuccess: true, successMessage: res.message })
      
      
      }).catch((error) => {
        this.setState({ error: error.response.data.title })
      })


}    

  renderInput(label, value, inputType, onChange,placeholder) {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
        <input placeholder={placeholder || label} type={inputType} className="form-control" value={value} onChange={onChange} />
        </div>
      </div>
    );
  }

  renderUserLinks = (title) => {
    return (
      <div>
      <Nav.Link href="/cashOut">CashOut</Nav.Link>
      <Nav.Link href="/cashIn">CashIn</Nav.Link>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
      <div>
        <NavUser user={this.user} links={this.renderUserLinks}/>
      <div className="container">
        <div className="row centerRow">
          <div className="col-3" />
          <div className="col-6 card newCard">
          <h1> Cash Out </h1>

            <div className="card-body">
              {this.renderInput('From CVU', this.user.account.cvu, 'text', () => {})}
              {this.renderInput('To CVU', this.state.toCVU, 'text', this.changeToCVU,"123456789")}
              {this.renderInput('Amount', this.state.amount, 'text', this.changeAmount,"Amount")}
             
              <div className="col-12">
                <button type="button" className="btn btn-primary btn-block" onClick={this.executeCashOut}>Aceptar</button>
                <div className="col-12 " >
                {this.state.error && this.state.error}
              </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div style={{ border: '1px solid blue', padding: '10px', margin: '10px'}}>
      <div style= {{borderBottom: '1px dashed black' ,marginBottom: '5px'}}>#{this.props.fromCVU} </div>
      <div>{this.props.data}</div>
      </div>
      </div>

     {this.renderSuccessModal()}
     </React.Fragment>
    );
  }
}

