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
  function resetState() {
    setRepos([]);
    setLanguages([]);
    setSelectedLanguages([]);
    setError('');
  }
  const [query, setQuery] = useState<string>('tom-ai');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  async function getRepos(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${submittedQuery}/repos`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User: ${submittedQuery} not found`);
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
    setSubmittedQuery(query);
  }

  useEffect(() => {
    if (!submittedQuery) {
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
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [submittedQuery]);

  const renderContent = () => {
    if (!submittedQuery) {
      return (
        <div>
          <h2>GitHub Repository Explorer</h2>
          <p>
            Start by searching for a GitHub user to explore their repositories
          </p>
        </div>
      );
    }

    if (error) {
      return <p role="alert">{error}</p>;
    }

    if (repos.length === 0 && !isLoading) {
      return <p role="alert">No repositories found for {submittedQuery}</p>;
    }

    if (!isLoading) {
      return (
        <>
          <h1>Repositories by {submittedQuery} </h1>
          <Filters
            languages={languages}
            handleToggle={handleToggle}
            selectedLanguages={selectedLanguages}
          />
          <RepoList repos={filteredRepos} />
        </>
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
