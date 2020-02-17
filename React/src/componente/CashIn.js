import React, { Component } from 'react';
import {cashIn } from './api/api';
import NavUser from './NavUser';


export default class CashIn extends Component {
  constructor(props) {
     super(props);
     this.user = this.props.location.state;
 
     this.state = {
        
        fromCVU: '' ,
        amount : '',
        cardNumber:'',
        fullName: '',
        endDate:'',
        securityCode: '',
        typeCard: '',
        isSuccess: false,
        error: props.error,
        user : props.location.state

       
     };

     this.successTitle = 'Cash In';
     this.changeFromCVU = this.changeFromCVU.bind(this);
     this.changeAmount = this.changeAmount.bind(this);
     this.changeCardNumber = this.changeCardNumber.bind(this);
     this.changeFullName = this.changeFullName.bind(this);
     this.changeEndDate = this.changeEndDate.bind(this);
     this.changeSecurityCode = this.changeSecurityCode.bind(this);
     this.changeTypeCard = this.changeTypeCard.bind(this);
     this.executeCashIn = this.executeCashIn.bind(this);

   }

   changeFromCVU(event) {
    this.setState({ fromCVU: event.data });
  }

  changeCardNumber(event) {
    this.setState({ cardNumber: event.target.value });
  }
  
  changeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  changeFullName(event) {
    this.setState({ fullName: event.target.value });
  }

  changeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  changeSecurityCode(event) {
    this.setState({ securityCode: event.target.value });
  }

  changeTypeCard(event) {
    this.setState({ typeCard: event.target.value });
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
              <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/home',this.user)}>Go to page</button>
            </div>
          </div>
        </div>
      </div>
      );

  }
    

  executeCashIn() {
      cashIn({ fromCVU: this.user.account.cvu, amount: this.state.amount, cardNumber: this.state.cardNumber, fullName: this.state.fullName,endDate: this.state.endDate, securityCode: this.state.securityCode, typeCard: this.state.typeCard})
      .then((res)=>{   
        this.setState({ isSuccess: true, successMessage: res.message })
        
      
      }).catch((error) => {
        this.setState({ error: error.response.data.title })
      })

  
  }                
    
                         

  renderInput(label, value, inputType, onChange, placeholder) {
    return (
   
      <div className="form-group row">
        
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <input placeholder={placeholder || label} type={inputType} className="form-control" value={value} onChange={onChange} />
        </div>
      </div>
    );
  }

  
  render() {
    return (
      <React.Fragment>
      <div> <NavUser user={this.user} links={this.renderUserLinks}/>
      
      <div className="container">
        <div className="row centerRow">
          <div className="col-3" />
          <div className="col-6 card newCard">
          <h1> Cash In </h1>
          <div className="card-body">
              {console.log(this.props.location.state)}
              {this.renderInput('CVU', this.user.account.cvu, 'text', () => {})}
              {this.renderInput('Amount', this.state.amount, 'text', this.changeAmount,"Cantidad")}
              {this.renderInput('Card Number', this.state.cardNumber, 'text', this.changeCardNumber, "xxxx xxxx xxxx xxxx")}
              {this.renderInput('Full Name', this.state.fullName, 'text', this.changeFullName,"Nombre completo")}
              {this.renderInput('End Date', this.state.endDate, 'text', this.changeEndDate, "dd/mm/yyyy")}
              {this.renderInput('Security Code', this.state.securityCode, 'text', this.changeSecurityCode,"123")}
              <select class="form-control"> 
                 <option>{this.state.typeCard = "DebitCard"} </option>
                 <option>{this.state.typeCard = "CreditCard"} </option>
              </select>

              <div className="col-12">
                <button type="button" className="btn btn-primary btn-block" onClick={this.executeCashIn}>Aceptar</button>
              </div>
              <div className="col-12 " >
                {this.state.error && this.state.error} 
              </div>
          </div>
        </div>
      </div>
      </div>
    
      </div>
      {this.renderSuccessModal()}
      </React.Fragment>
    );
  }
}

 


