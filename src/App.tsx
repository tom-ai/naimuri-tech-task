import '@root/pico.pink.css';
import '@root/globals.css';
import Header from './components/Header';
import UserSearch from './components/UserSearch';
import RepoList from './components/RepoList';
import { useMemo, useState } from 'react';
import Filters from './components/Filters';
import { getLanguagesUsed } from './utils/helpers';
import { useRepos } from './hooks/useRepos';

function App() {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const { state: repos, isLoading } = useRepos(submittedQuery); // need languages too?

  const languagesUsed = getLanguagesUsed(repos); // wrap in useMemo

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
    setSubmittedQuery(inputQuery);
  }

  const renderContent = () => {
    if (!submittedQuery) {
      return (
        <section aria-label="Welcome">
          <h2>GitHub Repository Explorer</h2>
          <p>
            Start by searching for a GitHub user to explore their public
            repositories
          </p>
        </section>
      );
    }

    // if (error) {
    //   return (
    //     <section aria-label="Error">
    //       <p role="alert">{error}</p>
    //     </section>
    //   );
    // }

    if (repos.length === 0 && !isLoading) {
      return (
        <section aria-label="No results">
          <p role="alert">No public repositories found for {submittedQuery}</p>
        </section>
      );
    }

    if (!isLoading) {
      return (
        <section aria-label="Repository results">
          <h2>Public Repositories by {submittedQuery} </h2>
          {languagesUsed.length > 0 && (
            <aside aria-label="Language filters">
              <Filters
                languages={languagesUsed}
                handleToggle={handleToggle}
                selectedLanguages={selectedLanguages}
              />
            </aside>
          )}
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
          value={inputQuery}
          onChange={setInputQuery}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {renderContent()}
      </main>
    </>
  );
}

export default App;
