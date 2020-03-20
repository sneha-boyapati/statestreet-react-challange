import React from "react";

const TransactionDetails = (props) => {
    const transaction = props.location.state.transaction;
    return (
        <div className="transaction-details">
            <h2 className="title">Transaction Details</h2>
            <hr />
            <div>
                <div>
                    <small> Account No: &nbsp; &nbsp;</small>
                    <strong>{transaction.account} </strong>
                </div>
                <div>
                    <small> Account Name: &nbsp; &nbsp;</small>
                    <strong>{transaction.accountName} </strong>
                </div>
                <div>
                    <small> Currency Code: &nbsp; &nbsp;</small>
                    <strong>{transaction.currencyCode} </strong>
                </div>
                <div>
                    <small> Amount: &nbsp; &nbsp;</small>
                    <strong>{transaction.amount} </strong>
                </div>
                <div>
                    <small> Transaction Type: &nbsp; &nbsp;</small>
                    <strong>{transaction.transactionType} </strong>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetails;
