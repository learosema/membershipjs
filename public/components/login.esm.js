import { html } from '../utils/html.esm.js';

export function Login() {
  return html`<section class="login">
    <form>
      <fieldset>
        <legend>Login</legend>
        <div class="field">
          <label for="username">Username:</label>
          <input id="username" />
        </div>
        <div class="field">
          <label for="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button>login</button>
      </fieldset>
    </form>
  </section>`;
}
