import { html, useState } from '../vendor.esm.js';
export function Login() {
  const [form, setForm] = useState({ user: '', password: '' });

  const onInput = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e) => {
    alert(1);
    e.preventDefault();
  };

  return html`<section class="login">
    <form onSubmit=${onSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div class="field">
          <label for="user">Username:</label>
          <input id="user" onInput=${onInput} value="${form.user}" />
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
      </fieldset>
    </form>
  </section>`;
}
