import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { memberApi } from '../utils/api';

export function Register() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorState, setErrorState] = useState(false);

  const onInput = (e) => {
    const { value, id } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const req = memberApi.register(form.name, form.password, form.email);
    req
      .send()
      .then((data) => {
        console.log(data);
        setLocation('/');
      })
      .catch((ex) => {
        console.log(ex);
        setErrorState(true);
      });
  };

  return (
    <Fragment>
      <h2>Registration page</h2>
      <section className="form">
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>Register</legend>
            <div className="field">
              <label for="name">Username:</label>
              <input id="name" onInput={onInput} value={form.name} />
            </div>
            <div className="field">
              <label for="email">Email:</label>
              <input id="email" onInput={onInput} value={form.email} />
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
            <button>Register</button>
            {errorState && <div className="error">Register failed.</div>}
          </fieldset>
        </form>
      </section>
    </Fragment>
  );
}
