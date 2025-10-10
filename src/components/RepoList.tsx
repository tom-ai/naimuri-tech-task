import type { Repo } from '@root/types';
import { useState } from 'react';
import ReadmeDialog from './ReadmeDialog';

type RepoListProps = {
  repos: Repo[];
};
export default function RepoList({ repos }: RepoListProps) {
  const [activeRepoId, setActiveRepoId] = useState<string | null>(null);

  const activeRepo = repos.find((repo) => repo.id === activeRepoId);

  return (
    <>
      <ul className="reset-list-style">
        {repos.map((repo) => (
          <li key={repo.id}>
            <article>
              <header className="grid">
                <div>
                  <span>
                    <a target="_blank" href={repo.owner.htmlUrl} rel="noopener">
                      <span className="sr-only">Author: </span>
                      {repo.owner.login}
                    </a>
                  </span>
                  <hgroup>
                    <h3>
                      <span>
                        <a href={repo.htmlUrl} target="_blank" rel="noopener">
                          <span className="sr-only">Repository: </span>
                          {repo.name}
                        </a>
                      </span>
                    </h3>
                    <p>{repo.description}</p>
                  </hgroup>
                </div>
              </header>
              <dl>
                <dt>Language</dt>
                <dd>{repo.language}</dd>
              </dl>
              <hr />
              <dl aria-label="Repository stats" role="group" className="grid">
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
              <footer>
                <button onClick={() => setActiveRepoId(repo.id)}>
                  Find Readme
                </button>
              </footer>
            </article>
          </li>
        ))}
      </ul>
      {activeRepo && (
        <ReadmeDialog
          isOpen={true}
          onClose={() => {
            setActiveRepoId(null);
          }}
          repo={activeRepo}
        />
      )}
    </>
  );
}
