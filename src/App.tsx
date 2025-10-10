import '@root/pico.pink.css';
import '@root/globals.css';
import Header from './components/Header';
import UserSearch from './components/UserSearch';
import RepoList from './components/RepoList';
import { useEffect, useMemo, useState } from 'react';
import { mapGitHubRepos, type GitHubRepo, type Repo } from './types';
import Filters from './components/Filters';
import { getLanguagesUsed } from './utils/helpers';

function App() {
  const [query, setQuery] = useState<string>('');
  const [searchState, setSearchState] = useState<{ query: string }>({
    query: '',
  });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  function resetState() {
    setRepos([]);
    setLanguages([]);
    setSelectedLanguages([]);
    setError('');
  }

  async function getRepos(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${searchState.query}/repos`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${searchState.query}" not found`);
      }
      throw new Error('Failed to fetch repos');
    }

    return response.json();
  }

  const filteredRepos = useMemo(() => {
    if (selectedLanguages.length === 0) return repos;

    return repos.filter(
      (repo) => repo.language && selectedLanguages.includes(repo.language)
    );
  }, [selectedLanguages, repos]);

  function handleToggle(language: string, checked: boolean) {
    setSelectedLanguages((prev) => {
      return checked
        ? [...prev, language]
        : [...prev.filter((lang) => lang !== language)];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchState({ query });
  }

  useEffect(() => {
    if (!searchState.query) {
      resetState();
      return;
    }

    const fetchRepos = async () => {
      setIsLoading(true);
      resetState();

      try {
        const repos = await getRepos();
        const mappedRepos = mapGitHubRepos(repos);
        const languages = getLanguagesUsed(mappedRepos);

        setRepos(mappedRepos);
        setLanguages(languages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [searchState]);

  const renderContent = () => {
    if (!searchState.query) {
      return (
        <section aria-label="Welcome">
          <h2>GitHub Repository Explorer</h2>
          <p>
            Start by searching for a GitHub user to explore their repositories
          </p>
        </section>
      );
    }

    if (error) {
      return (
        <section aria-label="Error">
          <p role="alert">{error}</p>
        </section>
      );
    }

    if (repos.length === 0 && !isLoading) {
      return (
        <section aria-label="No results">
          <p role="alert">No repositories found for {searchState.query}</p>
        </section>
      );
    }

    if (!isLoading) {
      return (
        <section aria-label="Repository results">
          <h1>Repositories by {searchState.query} </h1>
          <aside aria-label="Language filters">
            <Filters
              languages={languages}
              handleToggle={handleToggle}
              selectedLanguages={selectedLanguages}
            />
          </aside>
          <RepoList repos={filteredRepos} />
        </section>
      );
    }
  };

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

        {renderContent()}
      </main>
    </>
  );
}

export default App;
