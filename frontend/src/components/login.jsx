import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { useStore } from '../store';
import { memberApi } from '../utils/api';

export function Login() {
  const [, setLocation] = useLocation();

  const setUser = useStore((state) => state.setUser);
  const [form, setForm] = useState({ name: '', password: '' });
  const [errorState, setErrorState] = useState(false);

  const onInput = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const req = memberApi.login(form.name, form.password);
    req
      .send()
      .then((data) => {
        console.log(data);
        setUser(form.name);
        setLocation('/');
      })
      .catch((ex) => {
        console.log(ex);
        setErrorState(true);
      });
  };

  return (
    <section className="login">
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Login</legend>
          <div className="field">
            <label for="name">Username:</label>
            <input id="name" onInput={onInput} value={form.name} />
          </div>
          <div className="field">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              onInput={onInput}
              value={form.password}
            />
          </div>
          <button>login</button>
          {errorState && <div className="error">Login failed.</div>}
        </fieldset>
      </form>
    </section>
  );
}
