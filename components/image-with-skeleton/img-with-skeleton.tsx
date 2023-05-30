'use client';
import { useAppContext } from '@/context/Context';
import { ActionsType } from '@/context/actionsTypes';
import Image from 'next/image';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

interface IProps {
  src: string;
  alt: string;
  visibleByDefault?: boolean;
  className?: string;
}

export const ImageWithSkeleton = ({ src, alt, visibleByDefault, className }: IProps) => {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <Skeleton
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={className}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => dispatch({ type: ActionsType.setError, payload: true })}
      />
    </>
  );
};
