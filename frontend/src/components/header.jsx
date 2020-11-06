import { h } from 'preact';
import { ActiveLink } from './active-link';

export function Header() {
  return (
    <header className="header">
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/faq">FAQ</ActiveLink>
        <ActiveLink href="/login">Login</ActiveLink>
        <ActiveLink href="/register">Register</ActiveLink>
      </nav>
    </header>
  );
}
