import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import { useStore } from '../store';
import { memberApi } from '../utils/api';

export function Logout() {
  const [, setLocation] = useLocation();

  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const req = memberApi.logout();
    req.send().then(() => {
      setUser(null);
      setLocation('/');
    });
  }, []);

  return <section></section>;
}
