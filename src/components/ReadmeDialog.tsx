import { ContentsApi } from '@root/apis/contents.api';
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
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function resetState() {
    setMarkdownData(null);
  }

  useEffect(() => {
    if (!repo) return;
    setIsLoading(true);

    ContentsApi.getRepositoryReadme(repo)
      .then((data) => {
        setMarkdownData(data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [repo]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      dialog.close();
      resetState();
      return;
    }

    dialog.showModal();

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} aria-busy={isLoading}>
      {/* {error && <p role="alert">{error}</p>} */}
      {markdownData && (
        <article>
          <header>
            <button aria-label="close" rel="prev" onClick={onClose}></button>
            <p>
              <span className="sr-only">Repository: </span>
              <strong>{repo.name}</strong>
            </p>
            <a target="__blank" href={repo.htmlUrl}>
              View this repo on GitHub
            </a>
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
