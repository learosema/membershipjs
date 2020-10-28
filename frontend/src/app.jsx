import { render, h } from 'preact';
import { Header } from './components/header';
/*import { Login } from './components/login.esm.js';
import { Register } from './components/register.esm.js';
import { memberApi } from './utils/api.esm.js';
*/
import './scss/index.scss';

function App(props) {
  /*
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
  }; */

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
