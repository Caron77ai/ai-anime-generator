'use client';

import styles from '@/styles/AnimeGenerator.module.css';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface AnimeGeneratorProps {
  locale: {
    title: string;
    description: string;
    generateButton: string;
    generatingButton: string;
    resultTitle: string;
    inputPlaceholder: string;
    errorMessage: string;
  };
}

const AnimeGenerator: React.FC<AnimeGeneratorProps> = ({ locale }) => {
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateAnimeImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedImage(data.imageUrl);
      } else {
        setError(data.error || locale.errorMessage);
      }
    } catch (error) {
      console.error('Error generating anime:', error);
      setError(locale.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [description, locale.errorMessage]);

  return (
    <div className={styles.container}>
      <h1>{locale.title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">{locale.description}</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={locale.inputPlaceholder}
          className={styles.textarea}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? (
            <>
              Generating... {/* 在加载状态下显示的文字 */}
              <span className={styles.spinner}></span> {/* 加载动画 */}
            </>
          ) : (
            'Generate Image'  /* 正常状态下显示的文字 */
          )}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {isClient && generatedImage && (
        <div className={styles.result}>
          <h2>{locale.resultTitle}</h2>
          <Image
            src={generatedImage}
            alt="Generated Anime"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      )}
    </div>
  );
};

export default AnimeGenerator;
