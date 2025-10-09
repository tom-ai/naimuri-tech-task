import type { Repo } from '@root/types';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';

type ReadmeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  repo: Repo;
};

export default function ReadmeDialog({
  isOpen,
  onClose,
  repo,
}: ReadmeDialogProps) {
  const [markdownData, setMarkdownData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  async function getReadme(repo: Repo): Promise<string> {
    const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
      },
    });
    const data = await response.text();

    return data;
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();

      const fetchReadme = async () => {
        setIsLoading(true);
        setError('');

        try {
          const markdown = await getReadme(repo);
          setMarkdownData(markdown);
        } catch {
          setMarkdownData('');
          setError('Something went wrong displaying the Readme');
        } finally {
          setIsLoading(false);
        }
      };

      fetchReadme();
    } else {
      dialog.close();
      setMarkdownData(null);
    }

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [isOpen, onClose, repo]);

  return (
    <dialog ref={dialogRef} aria-busy={isLoading}>
      {error && <p>{error}</p>}
      {markdownData && (
        <article>
          <header>
            <button aria-label="close" rel="prev" onClick={onClose}></button>
            <p>
              <span className="sr-only">Repository: </span>
              <strong>{repo.name}</strong>
            </p>
            <a href={repo.htmlUrl}>View this repo on GitHub</a>
          </header>
          <Markdown>{markdownData}</Markdown>
          <footer>
            <button className="outline" onClick={onClose}>
              Close
            </button>
          </footer>
        </article>
      )}
    </dialog>
  );
}
