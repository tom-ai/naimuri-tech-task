import '@root/pico.pink.css';
import Header from './components/Header';
import UserSearch from './components/UserSearch';
import RepoList from './components/RepoList';
import { useEffect, useState } from 'react';
import type { Owner, Repo } from './types';
import type { version } from 'node:punycode';

function App() {
  // on first load - no search been made - todo

  // in response to searching - searching api
  // in response to searching - no repos found
  // in response to searching - repos found, display list
  // in response to searching - error

  const [query, setQuery] = useState<string>('tom-ai');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  type User = {
    name: string;
    login: string;
    html_url: string;
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (submittedQuery) {
      setIsLoading(true);
      fetch(`https://api.github.com/users/${submittedQuery}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw Error('Network error');
          }
          return response.json();
        })
        .then((data) => {
          setUser({
            name: data.name,
            login: data.login,
            html_url: data.html_url,
          });
          console.log(data);
        })
        .catch((err) => {
          setRepos([]);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          setSubmittedQuery('');
        });
    }
  }, [submittedQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedQuery(query);
  }

  return (
    <>
      <Header />
      <UserSearch value={query} onChange={setQuery} onSubmit={handleSubmit}
        isLoading={isLoading}
/>
      <RepoList />
    </>
  );
}

export default App;
