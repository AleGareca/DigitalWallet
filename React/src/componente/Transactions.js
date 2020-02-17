import React, { Component } from 'react'
import Transaction from './Transaction';
import './css/Table.css';
import './css/Amount.css';

export default class Transactions extends Component {

    renderTableTransactions() {
        return (<div className="row centerRow" >
            {this.props.transactions.map(transaction => <Transaction data={transaction} />)}
        </div>
        )
    }


    renderAmount() {
        return (this.props.balance === 0 ? this.renderMessageNoCash() : this.renderValueAmount())
    }


    renderTransfersOrJhonTravoltaGif() {
        return (this.props.transactions.length === 0 ? this.renderJhonTravoltaGif() : this.renderTable())
    }


    renderMessageNoCash() {
        return (<div className="amount">
            <div class="card-body">
                Te quedaste sin plata
         </div>
        </div>)
    }

    renderValueAmount() {
        return (<div className="amount " >
            <label>Total: ${this.props.balance}</label>
        </div>)
    }

    renderJhonTravoltaGif() {

        return (<div style={{ textAlign: "center", height: "50%" }}>

            <img src="https://media1.tenor.com/images/a828888852e708d9afaaad06c7f9513f/tenor.gif?itemid=10251428"
                width="480" height="356" alt="Pulp Fiction John Travolta GIF - PulpFiction JohnTravolta Lost GIFs" ></img>
        </div>);

    }

    renderTable() {
        return (
            <div>
                {this.renderTableTransactions()}
            </div>)

    }
    render() {
        return (<div>

            {this.renderAmount()}
            {this.renderTransfersOrJhonTravoltaGif()}

        </div>)
    }
}

