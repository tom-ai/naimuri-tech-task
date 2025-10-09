import '@root/pico.pink.css';
import '@root/globals.css';
import Header from './components/Header';
import UserSearch from './components/UserSearch';
import RepoList from './components/RepoList';
import { useEffect, useState } from 'react';
import { mapGitHubRepos, type GitHubRepo, type Repo } from './types';

function App() {
  // on first load - no search been made - todo

  // in response to searching - searching api
  // in response to searching - no repos found
  // in response to searching - repos found, display list
  // in response to searching - error

  const [query, setQuery] = useState<string>('tom-ai');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  const [repos, setRepos] = useState<Repo[]>([]);

  // const userExists = submittedQuery && user !== null;

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        .then((data: GitHubRepo[]) => {
          const mappedRepos = mapGitHubRepos(data);
          setRepos(mappedRepos);
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
      <UserSearch
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {repos && <RepoList repos={repos} />}
    </>
  );
}

export default App;
