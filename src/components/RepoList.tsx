import type { Repo } from '@root/types';
import { useState } from 'react';
import Markdown from 'react-markdown';

type RepoListProps = {
  repos: Repo[];
};
export default function RepoList({ repos }: RepoListProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const markdownTemp = '## Secondary title';

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
              <button onClick={handleClick}>Find Readme</button>
              <dialog open={isOpen}>
                <article>
                  <header>
                    <button
                      aria-label="close"
                      rel="prev"
                      onClick={handleClick}
                    ></button>
                    <p>
                      <strong>Readme</strong>
                    </p>
                    <Markdown>{markdownTemp}</Markdown>
                  </header>
                </article>
              </dialog>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}
