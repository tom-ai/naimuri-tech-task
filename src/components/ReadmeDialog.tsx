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
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  async function getReadme(repo: Repo) {
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
        try {
          const markdown = await getReadme(repo);
          setMarkdownData(markdown);
        } catch {
          setError('Error');
        }
      };

      fetchReadme();
    } else {
      dialog.close();
      setMarkdownData(null);
    }

    const handleClose = () => {
      console.log('dialog closed with esc');
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [isOpen, onClose, repo]);

  return (
    <dialog ref={dialogRef}>
      <article>
        <header>
          <button aria-label="close" rel="prev" onClick={onClose}></button>
          <p>
            <strong>Readme</strong>
          </p>
          <p>{repo.name}</p>
          {markdownData && <Markdown>{markdownData}</Markdown>}
        </header>
      </article>
    </dialog>
  );
}
