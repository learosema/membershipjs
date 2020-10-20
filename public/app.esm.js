import { render } from 'https://unpkg.com/preact?module';

import { html } from './utils/html.esm.js';
import { Header } from './components/header.esm.js';
import { Login } from './components/login.esm.js';

function App(props) {
  return html`<div class="wrapper">
    <${Header} />
    <main>
      <h1>Hello!</h1>
      <${Login} />
    </main>
  </div>`;
}

render(html`<${App} />`, document.body);
