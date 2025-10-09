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
  const [error, setError] = useState('');

  async function getRepos(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${submittedQuery}/repos`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Something went wrong fetching repos');
    }

    const data = response.json();
    return data;
  }

  useEffect(() => {
    if (!submittedQuery) {
      setRepos([]);
      return;
    }

    const fetchRepos = async () => {
      setIsLoading(true);
      setError('');

      try {
        const repos = await getRepos();
        const mappedRepos = mapGitHubRepos(repos);

        // get languages used
        // setLanguages
        setRepos(mappedRepos);
      } catch {
        //setLanguages([])
        setRepos([]);
        setError('Something else went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [submittedQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedQuery(query);
  }

  return (
    <>
      <Header />
      <main>
        <UserSearch
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <h1>Repositories by {query} </h1>
        {error && <p>{error}</p>}
        {repos.length > 0 && <RepoList repos={repos} />}
      </main>
    </>
  );
}

export default App;
