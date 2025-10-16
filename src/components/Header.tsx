import { useState } from 'react';
import ReadmeDialog from './ReadmeDialog';
import { useRepos } from '@root/hooks/useRepos';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { state: repo, isLoading } = useRepos('tom-ai', 'naimuri-tech-task');

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
