import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

type ReadmeDialogProps = {
  isOpen: boolean;
  markdownData: string | null;
  handleClose: () => void;
};

export default function ReadmeDialog({
  isOpen,
  markdownData,
  handleClose,
}: ReadmeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    if (isOpen) {
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
