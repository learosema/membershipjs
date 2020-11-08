import { Fragment, h } from 'preact';
import { useStore } from '../store';
import { ActiveLink } from './active-link';

export function Header() {
  const user = useStore((state) => state.currentUser);
  const isLoggedIn = Boolean(user);
  return (
    <header className="header">
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/faq">FAQ</ActiveLink>
        {!isLoggedIn && (
          <Fragment>
            <ActiveLink href="/login">Login</ActiveLink>
            <ActiveLink href="/register">Register</ActiveLink>
          </Fragment>
        )}
        {isLoggedIn && <ActiveLink href="/logout">Logout</ActiveLink>}
      </nav>
    </header>
  );
}
