import axios from 'axios';
import { Link } from 'react-router-dom';
import NavHome from './NavHome';
import './css/Login.css';
import { signIn } from './api/api';
import LogoBilletera from '../LogoBilletera.png'
import React, { Component } from 'react';



export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      users: [],


    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.executeSignIn = this.executeSignIn.bind(this);

  }

  changeUsername(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }


    executeSignIn(){
    signIn({ email: this.state.email, password: this.state.password })
      .then(() => {
        const user= this.state.users.find(e=>e.email===this.state.email);   
        this.props.history.push('/home',user);
        
      }).catch((error) => {
        this.setState({ error: error.response.data.title })
        console.log(error.response.data.title);
      })
    }   

 componentDidMount(){
  axios.get("http://localhost:7000/users")	   
  .then((res=>{  
          this.setState({users:res.data}); 
      
          }))
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
      <div>
        <div><NavHome />

          <div className="left-colum">
            <div className="container">
              <Logo />
              <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
        

                  <div className="card-body">
                    {this.renderInput('Email', this.state.username, 'text', this.changeUsername,"x@gmail.com")}
                    {this.renderInput('Password', this.state.password, 'password', this.changePassword,"**********")}
                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-block" onClick={this.executeSignIn}>Sign In</button>
                    </div>
                    <div className="col-12">
                      <Link to="/registrarse" className="btn btn-link">Sign Up</Link>
                    </div>
                    <div className="col-12 " >
                      {this.state.error }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      </React.Fragment>

    );
  }
};

const Logo = () => {
  return (
    <div>
      <div className="row centerLogoRow">
        <div className="col-3" />
        <div className="col-6  ">
          <div className="text-center">
            <h1>Digital Wallet</h1>
            <img src={LogoBilletera} className="App-logo" alt="logo billetera" />
          </div>
        </div>
      </div>
    </div>
  )
}