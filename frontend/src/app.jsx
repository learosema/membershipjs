import { render, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Redirect, Switch, Route, Router, Link, useRoute } from 'wouter-preact';

import { Header } from './components/header';
import { memberApi } from './utils/api';

import './scss/index.scss';

function App(props) {
  const [who, setWho] = useState(undefined);
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
    <div className="wrapper">
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
            <h1>Register</h1>
          </Route>
          <Route path="/faq">
            <h1>FAQ</h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

render(<App />, document.getElementById('root'));
