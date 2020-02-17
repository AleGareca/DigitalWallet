import React, { Component } from 'react'

import './css/Table.css';

export default class Transaction extends Component {

    render() {
        return (


            <div className="card border-primary mb-3" style={{ margin: "auto", float: "none", marginBottom: "10px" }} >
                <div className="card-header">
                    Monto: ${this.props.data.amount}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>    {' '}
                            {this.props.data.fullDescription}
                            {' '}</p>
                        <footer className="blockquote-footer">   {this.props.data.dateTime.dayOfMonth}
                            {' '}
                            {this.props.data.dateTime.dayOfWeek}
                            {' '}
                            {this.props.data.dateTime.year}
                            {' '} </footer>
                    </blockquote>
                </div>
                {console.log(this.props.data)}
            </div>


        )
    }
}