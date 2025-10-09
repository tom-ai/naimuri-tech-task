import type { Repo } from '@root/types';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

type ReadmeDialogProps = {
  isOpen: boolean;
  markdownData: string | null;
  handleClose: () => void;
  repo: Repo;
};

export default function ReadmeDialog({
  isOpen,
  markdownData,
  handleClose,
  repo,
}: ReadmeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  async function getReadme(repo: Repo) {
    const url = `https://api.github.com/r/repos/${repo.owner.login}/${repo.name}/readme`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
      },
    });
    const data = await response.json();

    return data;
  }

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    if (isOpen) {
      try {
        const readme = getReadme(repo);
        console.log(readme);
      } catch (err) {
        console.error(err);
      }

      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!markdownData) return null;

  return (
    <dialog ref={dialogRef}>
      <article>
        <header>
          <button aria-label="close" rel="prev" onClick={handleClose}></button>
          <p>
            <strong>Readme</strong>
          </p>
          <Markdown>{markdownData}</Markdown>
        </header>
      </article>
    </dialog>
  );
}
