import { memberApi } from '../utils/api.esm.js';
import { html, useState } from '../vendor.esm.js';

export function Register({ setTab }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorState, setErrorState] = useState(false);

  const onInput = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e) => {
    const req = memberApi.register(form.name, form.password, form.email);
    req
      .send()
      .then((data) => {
        console.log(data);
        if (setTab) {
          setTab('main');
        }
      })
      .catch((ex) => {
        console.log(ex);
        setErrorState(true);
      });
    e.preventDefault();
  };

  return html`<section class="register">
    <div class="button-row">
      <button onClick=${() => setTab('main')}>Back to main</button>
    </div>
    <form onSubmit=${onSubmit}>
      <fieldset>
        <legend>Register</legend>
        <div class="field">
          <label for="name">Username:</label>
          <input id="name" onInput=${onInput} value="${form.name}" />
        </div>
        <div class="field">
          <label for="email">Email:</label>
          <input id="email" onInput=${onInput} value="${form.email}" />
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
        <button>Register</button>
        ${errorState && html`<div class="error">Register failed.</div>`}
      </fieldset>
    </form>
  </section>`;
}
