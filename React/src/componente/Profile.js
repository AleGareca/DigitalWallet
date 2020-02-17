import React, { Component } from 'react';
import {profile} from './api/api';
import NavUser from './NavUser';

export default class Profile extends Component {
    constructor(props) {
       super(props);
       this.user = this.props.location.state;
   
       this.state = {

        firstName:'',
        lastName:'',
        email: '', 
        cvu:'',    
        amount: '',
        error: props.error,
        isSuccess: false,
        user : props.location.state

         
       };
  
       this.successTitle = 'Profile';
       this.changeFirstName = this.changeFirstName.bind(this);
       this.changeLastName = this.changeLastName.bind(this);
       this.changeEmail = this.changeEmail.bind(this);
       this.changeCvu = this.changeCvu.bind(this);
       this.changeAmount = this.changeAmount.bind(this);

       this.executeProfile = this.executeProfile.bind(this);
     }

     componentDidMount() {
      
          
              this.setState({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                cvu: this.user.account.cvu,
                amount: this.user.account.balance

               });
             
          
    }
  
     changeFirstName(event) {
        this.setState({ firstName: event.target.value });
      }

      changeLastName(event) {
        this.setState({ lastName: event.data });
      }

    changeEmail(event) {
      this.setState({ email: event.target.value });
    }

    changeCvu(event) {
        this.setState({ cvu: event.data});
    }

    changeAmount(event) {
        this.setState({ amount: event.data });
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

    executeProfile() {
      profile({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, cvu: this.user.account.cvu, amount: this.user.account.balance })
      .then((res)=>{   
        console.log(res)
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
  
    render() {
      return (
        <React.Fragment>
        <div> <NavUser user = {this.user} />
        <div className="container">
          <div className="row centerRow">
            <div className="col-3" />
            <div className="col-6 card newCard">
            <h1> Profile </h1>

              <div className="card-body"> 
                {this.renderInput('First Name', this.state.firstName, 'text', this.changeFirstName,"Nombre")}
                {this.renderInput('Last Name', this.user.lastName, 'text', () => {})}
                {this.renderInput('Email', this.state.email, 'text', this.changeEmail,"Email")}
                 {this.renderInput('CVU', this.user.account.cvu, 'text',() => {})}
                {this.renderInput('Amount', this.user.account.balance, 'text', () => {})}
               
                <div className="col-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.executeProfile}>Regresar</button>
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
  