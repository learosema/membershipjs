import { memberApi } from '../utils/api.esm.js';
import { html, useState } from '../vendor.esm.js';

export function Login({ setTab, setWho }) {
  const [form, setForm] = useState({ name: '', password: '' });
  const [errorState, setErrorState] = useState(false);

  const onInput = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e) => {
    const req = memberApi.login(form.name, form.password);
    req
      .send()
      .then((data) => {
        console.log(data);
        if (setTab) {
          setWho(form.name);
          setTab('main');
        }
      })
      .catch((ex) => {
        console.log(ex);
        setErrorState(true);
      });
    e.preventDefault();
  };

  return html`<section class="login">
    <div class="button-row">
      <button onClick=${() => setTab('main')}>Back to main</button>
    </div>
    <form onSubmit=${onSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div class="field">
          <label for="name">Username:</label>
          <input id="name" onInput=${onInput} value="${form.name}" />
        </div>
        <div class="field">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            onInput=${onInput}
            value="${form.password}"
          />
        </div>
        <button>login</button>
        ${errorState && html`<div class="error">Login failed.</div>`}
      </fieldset>
    </form>
  </section>`;
}
