

import React, { Component } from 'react';
import {register } from './api/api';
import NavRegister from './NavRegister';


export default class Registrarse extends Component {
  constructor(props) {
     super(props);
 
     this.state = {

       email:'',
       firstName:'',
       lastName:'',
       password: '',
       idCard:'', 
       error: "",
       isSuccess: false,
       
       
     };
     this.successTitle = 'Registrarse';
     this.changeEmail = this.changeEmail.bind(this);
     this.changeFirstname = this.changeFirstname.bind(this);
     this.changeIdCard = this.changeIdCard.bind(this);
     this.changeLastname = this.changeLastname.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.executeRegister = this.executeRegister.bind(this);
   }

   changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeIdCard(event){
    this.setState({ idCard: event.target.value});
  }

  changeFirstname(event) {
    this.setState({ firstName: event.target.value });
  }

  changeLastname(event) {
    this.setState({ lastName: event.target.value });
  }
  
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  
  renderErrorModal() {
    return <div />
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
              <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/')}>Go to page</button>
            </div>
          </div>
        </div>
      </div>
      );

  }
    

  executeRegister() {
    register({email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, password: this.state.password, idCard: this.state.idCard })
    .then((res)=>{
      console.log(res)
      this.setState({ isSuccess: true, successMessage: res.message })
      
  
    
  }).catch((error) => {
    console.log(error.response.data.title)
    
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

  render() {
    return (
      <React.Fragment>
        <div> <NavRegister/>
        <div className="container">
          <div className="row centerRow">
            <div className="col-3" />
            <div className="col-6 card newCard">
              <h1> Registrarse </h1>
              <div className="card-body">
                {this.renderInput('Email', this.state.email, 'text', this.changeEmail,"x@gmail.com")}
                {this.renderInput('First name', this.state.firstName, 'text', this.changeFirstname,"Nombre")}
                {this.renderInput('Last name', this.state.lastName, 'text', this.changeLastname,"Apellido")}
                {this.renderInput('IdCard', this.state.idCard, 'text', this.changeIdCard,"1234")}
                {this.renderInput('Password', this.state.password, 'password', this.changePassword,"********")}
              
                <div className="col-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.executeRegister}>Registrar</button>
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

