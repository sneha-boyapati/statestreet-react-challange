import React from 'react';
import TransactionsPage from './pages/TransactionsPage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TransactionDetails from './pages/TransactionDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Switch>
        <Redirect exact from="/" to="transactions" />
        <Route exact path="/transactions" component={TransactionsPage}/>
        <Route exact path="/transactions/details/:id" component={TransactionDetails} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
