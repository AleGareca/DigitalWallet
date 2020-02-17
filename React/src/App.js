
import './App.css';
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import Login from './componente/Login';
import Registrarse from './componente/Registrarse';
import CashOut from './componente/CashOut';
import cashIn from './componente/CashIn';
import Profile from './componente/Profile';
import Home from './componente/Home';



export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Route>
          <Switch>
            <Route exact path="/registrarse" component={Registrarse} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cashOut" component={CashOut} />
            <Route exact path="/cashIn" component={cashIn} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Route>
      </BrowserRouter>);
  }
}
