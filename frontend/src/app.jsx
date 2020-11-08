import { render, h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { Switch, Route } from 'wouter-preact';

import { memberApi } from './utils/api';
import { useStore } from './store';

import { Header } from './components/header';
import { Register } from './components/register';
import { Login } from './components/login';
import { Logout } from './components/logout';

import './scss/index.scss';

function App(props) {
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.currentUser);
  useEffect(() => {
    memberApi
      .whoAmI()
      .send()
      .then((data) => {
        setUser(data.result);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/">
            <h1>Welcome to MembershipJS</h1>
            {Boolean(user) && <p>Hello {user}</p>}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/faq">
            <h1>FAQ</h1>
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

render(<App />, document.getElementById('root'));
