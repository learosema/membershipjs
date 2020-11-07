import { render, h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Redirect, Switch, Route, Router, Link, useRoute } from 'wouter-preact';

import { Header } from './components/header';
import { memberApi } from './utils/api';

import './scss/index.scss';
import { Register } from './components/register';

function App(props) {
  useEffect(() => {
    memberApi
      .whoAmI()
      .send()
      .then((data) => {
        setWho(data.result);
      })
      .catch(() => {
        setWho(null);
      });
  }, []);

  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/">
            <h1>Welcome to MembershipJS</h1>
          </Route>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/faq">
            <h1>FAQ</h1>
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

render(<App />, document.getElementById('root'));
