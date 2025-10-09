import type { Repo } from '@root/types';

type RepoListProps = {
  repos: Repo[];
};
export default function RepoList({ repos }: RepoListProps) {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <article>
            <header>
              <div>
                <span>
                  <a target="_blank" href={repo.owner.htmlUrl}>
                    <span className="sr-only">Author: </span>
                    {repo.owner.login}
                  </a>
                </span>
                <span>
                  <a target="_blank" href={repo.htmlUrl}>
                    <span className="sr-only">Repository: </span>
                    {repo.htmlUrl}
                  </a>
                </span>
              </div>
            </header>
            <h2>{repo.fullName}</h2>
            <dl role="group">
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
            <footer></footer>
          </article>
        </li>
      ))}
    </ul>
  );
}
