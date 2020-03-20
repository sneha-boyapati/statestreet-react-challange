import React, { Component } from "react";
import { getData } from "../api/DataAPI";

class TransactionsPage extends Component {
    allTransactions = [];
    fitleredTransactions = [];
    from = 0;
    size = 25;
    currentPage = 1;
    totalPages = 0;
    constructor(props) {
        super(props);
        this.state = {
            transactionsList: [],
            filters: {
                accountNames: [],
                transactionTypes: []
            }
        };
    }

    setTotalNumberOfPages = () => {
        this.totalPages = Math.ceil(this.fitleredTransactions.length / this.size);
    }

    async componentDidMount() {
        const transactionsList = await getData();
        this.allTransactions = transactionsList;
        this.fitleredTransactions = this.allTransactions;
        this.setTotalNumberOfPages();
        this.setDisplayedList();
    }

    setDisplayedList = () => {
        const transactionsList = this.fitleredTransactions.slice(this.from, this.size + this.from);
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

    handleChange = (event) => {
        const { name, checked} = event.target;
        const filters = { ...this.state.filters };
        if (name.indexOf("accountNames") > -1) {
            const index = filters.accountNames.indexOf(name);
            if (index > -1) {
                filters.accountNames.splice(index, 1);
            } else {
                filters.accountNames.push(name);
            }
        } else {
            const index = filters.transactionTypes.indexOf(name);
            if (index > -1) {
                filters.transactionTypes.splice(index, 1);
            } else {
                filters.transactionTypes.push(name);
            }
        }
        this.setState({
            filters
        }, () => this.handleFilterChange());
    }

    handleFilterChange = () => {
        const filters = this.state.filters;
        const data = [...this.allTransactions];
        const accountNames = filters.accountNames.map(ele => ele.replace("accountNames_", "").replace(/_/g, " ").toLowerCase());
        const transactionTypes = filters.transactionTypes.map(ele => ele.replace("transactionTypes_", "").toLowerCase());

        this.fitleredTransactions = data;
        if (accountNames.length > 0) {
            this.fitleredTransactions = data.filter(x => accountNames.indexOf(x.accountName.toLowerCase()) > -1);
        }
        if (transactionTypes.length > 0) {
            this.fitleredTransactions = this.fitleredTransactions.filter(x => transactionTypes .indexOf(x.transactionType.toLowerCase()) > -1);
        }
        this.setTotalNumberOfPages();
        this.from = 0;
        this.setDisplayedList();

    }



    render() {
        return (
            <div className="my-transactions">
                <h2 className="title">My Transactions</h2>
                <hr />
                <div>
                    <div className="filters">
                        <h3>Filters</h3>
                        <div>
                            <h4>Account Name</h4>
                            <div className="account-names">
                                <label>
                                    <input type="checkbox" name="accountNames_Savings_Account" value="Savings Account" checked={this.state.filters.accountNames.indexOf('accountNames_Savings_Account') > -1} onChange={this.handleChange} />
                                    Savings Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Checking_Account" value="Checking Account" checked={this.state.filters.accountNames.indexOf('accountNames_Checking_Account') > -1} onChange={this.handleChange} />
                                    Checking Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Auto_Loan_Account" value="Auto Loan Account" checked={this.state.filters.accountNames.indexOf('accountNames_Auto_Loan_Account') > -1} onChange={this.handleChange} />
                                    Auto Loan Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Credit_Card_Account" value="Credit Card Account" checked={this.state.filters.accountNames.indexOf('accountNames_Credit_Card_Account') > -1} onChange={this.handleChange} />
                                    Credit Card Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Investment_Account" value="Investment Account" checked={this.state.filters.accountNames.indexOf('accountNames_Investment_Account') > -1} onChange={this.handleChange} />
                                    Investment Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Personal_Loan_Account" value="Personal Loan Account" checked={this.state.filters.accountNames.indexOf('accountNames_Personal_Loan_Account') > -1} onChange={this.handleChange} />
                                    Personal Loan Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Money_Market_Account" value="Money Market Account" checked={this.state.filters.accountNames.indexOf('accountNames_Money_Market_Account') > -1} onChange={this.handleChange} />
                                    Money Market Account
                                </label>
                                <label>
                                    <input type="checkbox" name="accountNames_Home_Loan_Account" value="Home Loan Account" checked={this.state.filters.accountNames.indexOf('accountNames_Home_Loan_Account') > -1} onChange={this.handleChange} />
                                    Home Loan Account
                                </label>
                            </div>
                        </div>
                        <div>
                            <h4>Transaction Type</h4>
                            <div className="transaction-types">
                                <label>
                                    <input type="checkbox" name="transactionTypes_deposit" value="Deposit" checked={this.state.filters.transactionTypes.indexOf('transactionTypes_deposit') > -1} onChange={this.handleChange} />
                                    Deposit
                                </label>
                                <label>
                                    <input type="checkbox" name="transactionTypes_withdrawal" value="Withdrawal" checked={this.state.filters.transactionTypes.indexOf('transactionTypes_withdrawal') > -1} onChange={this.handleChange} />
                                    Withdrawal
                                </label>
                                <label>
                                    <input type="checkbox" name="transactionTypes_invoice" value="Invoice" checked={this.state.filters.transactionTypes.indexOf('transactionTypes_invoice') > -1} onChange={this.handleChange} />
                                    Invoice
                                </label>
                                <label>
                                    <input type="checkbox" name="transactionTypes_payment" value="Payment" checked={this.state.filters.transactionTypes.indexOf('transactionTypes_payment') > -1} onChange={this.handleChange} />
                                    Payment
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
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
                            <button onClick={this.handlePrev}>Prev</button>
                            <button onClick={this.handleNext}>Next</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default TransactionsPage;
