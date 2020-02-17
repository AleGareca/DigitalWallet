import axios from 'axios';
import React, { Component } from 'react'
import NavUser from './NavUser';
import Transactions from './Transactions';
import './css/Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            transactions: "",
            user: "",
            
            
        };
      

    }
    componentDidMount() {
        axios.get(`http://localhost:7000/account/${this.props.location.state.account.cvu}`)
            .then((res => {
                this.setState({ balance: res.data.balance });
               
            }))

        axios.get(`http://localhost:7000/transaccions/${this.props.location.state.account.cvu}`)
            .then((res => {
                this.setState({ transactions: res.data });
                
            }))
        axios.get(`http://localhost:7000/users/idCard/${this.props.location.state.idCard}`)
        .then((res => {
            this.setState({ user: res.data})
            
        }))

                    

    }
    render() {
        return (
            <div>
                <NavUser user={this.state.user} />
                <div className="container">

                    <div className="texto">Welcome to the Digital Wallet</div>
                    <div className="conteiner">
                        <Transactions balance={this.state.balance} transactions={this.state.transactions} />
                    </div>
                    <div className="texto parrafo background ">
                    </div>
                    <div style= {{borderBottom: '1px dashed black' ,marginBottom: '5px'}}></div>
                </div>
            </div>
        );
    }
}
