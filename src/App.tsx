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
  // on first load - no search been made - todo

  // in response to searching - searching api
  // in response to searching - no repos found
  // in response to searching - repos found, display list
  // in response to searching - error

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
      throw new Error('Something went wrong fetching repos');
    }

    const data = response.json();
    return data;
  }

  useEffect(() => {
    if (!submittedQuery) {
      setRepos([]);
      setLanguages([]);
      setSelectedLanguages([]);
      return;
    }

    const fetchRepos = async () => {
      setIsLoading(true);
      setError('');

      try {
        const repos = await getRepos();
        const mappedRepos = mapGitHubRepos(repos);
        const languages = getLanguagesUsed(mappedRepos);

        setRepos(mappedRepos);
        setLanguages(languages);
        setSelectedLanguages([]); //setSelectedLanguages(prev => prev.filter(l => langs.includes(l)));
      } catch {
        setLanguages([]);
        setSelectedLanguages([]);
        setRepos([]);
        setError('Something else went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [submittedQuery]);

  const filteredRepos = useMemo(() => {
    if (selectedLanguages.length === 0) return [];

    return repos.filter(
      (repo) => repo.language && selectedLanguages.includes(repo.language)
    );
  }, [selectedLanguages, repos]);

  // useEffect(() => {

  // }, [lang])

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
        <Filters
          languages={languages}
          handleToggle={handleToggle}
          selectedLanguages={selectedLanguages}
        />
        <h1>Repositories by {query} </h1>
        {error && <p>{error}</p>}
        {filteredRepos.length > 0 && <RepoList repos={filteredRepos} />}
      </main>
    </>
  );
}

export default App;
