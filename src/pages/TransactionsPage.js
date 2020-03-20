import React, { Component } from "react";
import { getData } from "../api/DataAPI";

class TransactionsPage extends Component {
    allTransactions = [];
    from = 0;
    size = 25;
    currentPage = 1;
    totalPages = 0;
    constructor(props) {
        super(props);
        this.state = {
            transactionsList: []
        };
    }

    async componentDidMount() {
        const transactionsList = await getData();
        this.allTransactions = transactionsList;
        this.totalPages = Math.ceil(this.allTransactions.length / this.size);
        this.setDisplayedList();
    }

    setDisplayedList = () => {
        const transactionsList = this.allTransactions.slice(this.from, this.size + this.from);
        this.setState({
            transactionsList
        });
    }

    handleNext = () => {
        if (this.currentPage < this.totalPages) {
            this.from = this.from + this.size;
            this.currentPage = this.currentPage + 1;
            this.setDisplayedList();
        }
    }

    handlePrev = () => {
        if (this.currentPage > 1) {
            this.from = this.from - this.size;
            this.currentPage = this.currentPage - 1;
            this.setDisplayedList();
        }
    }

    handleNavigation = (event, transaction) => {
        event.preventDefault();
        this.props.history.push({
            pathname: `/transactions/details/${transaction.account}`,
            state: { transaction }
        });
    }

    render() {
        return (
            <div className="transaction-details">
                <h2 className="title">My Transactions</h2>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>ACCOUNT NO.</th>
                            <th>ACCOUNT NAME</th>
                            <th>CURRENCY</th>
                            <th>AMOUNT</th>
                            <th>TRANSACTION TYPE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactionsList.map((transaction) => (
                            <tr key={transaction.account}>
                                <td><a href="#" onClick={(event) => this.handleNavigation(event, transaction)}>{transaction.account}</a></td>
                                <td>{transaction.accountName}</td>
                                <td>{transaction.currencyCode}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.transactionType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                </div>
                <button onClick={this.handlePrev}>Prev</button>
                <button onClick={this.handleNext}>Next</button>
            </div>
        )
    }
}

export default TransactionsPage;
