import type { Repo } from '@root/types';
import { useState } from 'react';
import ReadmeDialog from './ReadmeDialog';

type RepoListProps = {
  repos: Repo[];
};
export default function RepoList({ repos }: RepoListProps) {
  const [activeRepoId, setActiveRepoId] = useState<string | null>(null);

  return (
    <ul className="reset-list-style">
      {repos.map((repo) => (
        <li key={repo.id}>
          <article>
            <header>
              <div></div>
              <h2>
                <span>
                  <a target="_blank" href={repo.owner.htmlUrl} rel="noopener">
                    <span className="sr-only">Author: </span>
                    {repo.owner.login}
                  </a>
                </span>
                <span className="link-color">{' / '}</span>
                <span>
                  <a href={repo.htmlUrl} target="_blank" rel="noopener">
                    <span className="sr-only">Repository: </span>
                    {repo.name}
                  </a>
                </span>
              </h2>
            </header>
            <dl aria-label="Repository stats" role="group">
              <div>
                <dt>Stars</dt>
                <dd>{String(repo.stars)}</dd>
              </div>
              <div>
                <dt>Forks</dt>
                <dd>{String(repo.forks)}</dd>
              </div>
              <div>
                <dt>Issues</dt>
                <dd>{String(repo.issues)}</dd>
              </div>
            </dl>
            {repo.description}
            <footer>
              <button onClick={() => setActiveRepoId(repo.id)}>
                Find Readme
              </button>
              <ReadmeDialog
                isOpen={activeRepoId === repo.id}
                onClose={() => {
                  setActiveRepoId(null);
                }}
                repo={repo}
              />
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}
