import { render, html, useState, useEffect } from './vendor.esm.js';

import { Header } from './components/header.esm.js';
import { Login } from './components/login.esm.js';
import { Register } from './components/register.esm.js';
import { memberApi } from './utils/api.esm.js';

function App(props) {
  const [tab, setTab] = useState('main');
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

  const onLogout = () => {
    memberApi
      .logout()
      .send()
      .then((data) => {
        setWho(null);
      });
  };

  return html`<div class="wrapper">
    <${Header} />
    <main>
      ${tab === 'main' &&
      html`
        <h1>Welcome to MembershipJS</h1>
        ${who === null &&
        html`
          <div class="button-row">
            <button onClick=${() => setTab('login')}>Login</button>
            <button onClick=${() => setTab('register')}>Register</button>
          </div>
        `}
        ${Boolean(who) &&
        html`
          <p>Hello ${who}!</p>
          <button onClick=${onLogout}>Logout</button>
        `}
      `}
      ${tab === 'login' && html`<${Login} setTab=${setTab} setWho=${setWho} />`}
      ${tab === 'register' && html`<${Register} setTab=${setTab} />`}
    </main>
  </div>`;
}

render(html`<${App} />`, document.body);
