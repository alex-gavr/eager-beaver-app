'use client';
import { useCallback, useRef, useEffect, ReactNode, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLockedBody } from 'usehooks-ts';

interface IModelProps {
  children: ReactNode;
}

const Modal = ({ children }: IModelProps) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useLockedBody(true, 'root');

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 z-[999] flex flex-col items-center justify-center bg-black/60 px-4'
      onClick={handleClick}
      ref={overlay}
    >
      {children}
    </div>
  );
};
export default Modal;
