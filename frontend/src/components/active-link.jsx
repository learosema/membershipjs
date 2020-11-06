import { h } from 'preact';
import { Link, useRoute } from 'wouter-preact';

export const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  );
};
