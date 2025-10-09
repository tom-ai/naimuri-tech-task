import type { Repo } from '@root/types';
import { useState } from 'react';
import ReadmeDialog from './ReadmeDialog';

type RepoListProps = {
  repos: Repo[];
};
export default function RepoList({ repos }: RepoListProps) {
  //   function handleClick(e: React.FormEvent) {
  //     e.preventDefault();

  //     // search the github api /contents root folder

  //     // if there's a readme
  //     // download readme into localstorage
  //     // somehow save it into this apps state
  //     // open the modal when it's loaded

  //     // if no readme found, notify user

  //     // no need! Just hit the readme endpoint haha

  //     setMarkdownData('## Secondary title'); // mock some markdown data
  //     setIsOpen(true);
  //   }

  const [activeRepoId, setActiveRepoId] = useState<string | null>(null);

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <article>
            <header>
              <div>
                <span>
                  <a target="_blank" href={repo.owner.htmlUrl} rel="noopener">
                    <span className="sr-only">Author: </span>
                    {repo.owner.login}
                  </a>
                </span>
              </div>
              <h2>
                <a href={repo.htmlUrl} target="_blank" rel="noopener">
                  <span className="sr-only">Repository: </span>
                  {repo.fullName}
                </a>
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
