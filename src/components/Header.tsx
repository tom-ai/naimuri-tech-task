import { useEffect, useState } from 'react';
import ReadmeDialog from './ReadmeDialog';
import { mapGitHubRepos, type GitHubRepo, type Repo } from '@root/types';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [repo, setRepo] = useState<Repo | null>(null);

  async function getThisRepo(): Promise<GitHubRepo> {
    const url = `https://api.github.com/repos/tom-ai/naimuri-tech-task`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching this repo');
    }

    return response.json();
  }

  useEffect(() => {
    const fetchRepo = async () => {
      setIsLoading(true);

      try {
        const repo = await getThisRepo();
        const mappedRepo = mapGitHubRepos([repo]);
        setRepo(mappedRepo[0]);
      } catch (err) {
        console.warn(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepo();
  }, []);

  return (
    <header>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <span>
              <h1 style={{ marginBottom: 0 }}>Naimuri Tech Task</h1>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            {repo ? (
              <button
                onClick={() => setIsOpen(true)}
                disabled={!repo}
                aria-busy={isLoading}
                className="primary outline"
              >
                Readme
              </button>
            ) : (
              <a
                target="__blank"
                href="https://github.com/tom-ai/naimuri-tech-task"
              >
                View on GitHub
              </a>
            )}
          </li>
        </ul>
      </nav>
      {repo && (
        <ReadmeDialog
          isOpen={isOpen}
          repo={repo}
          onClose={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
