import { render, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
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
        <h1>Welcome to MembershipJS</h1>
      </main>
    </div>
  );
}

render(<App />, document.getElementById('root'));
