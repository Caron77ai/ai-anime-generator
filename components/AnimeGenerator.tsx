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
    invalidResponseFormat?: string; // 添加可选属性
    remainingGenerations: string;
  };
}

const AnimeGenerator: React.FC<AnimeGeneratorProps> = ({ locale }) => {
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedGenerations, setUsedGenerations] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(10);

  const fetchRemainingGenerations = useCallback(async () => {
    try {
      const response = await fetch('/api/remaining-generations');
      if (response.ok) {
        const data: { remainingFreeGenerations: number; remainingPaidGenerations: number; totalRemainingGenerations: number } = await response.json();
        setUsedGenerations(10 - data.remainingFreeGenerations);
        setTotalGenerations(data.totalRemainingGenerations);
      } else {
        console.error('获取剩余生成次数失败: 服务器返回错误');
      }
    } catch (error) {
      console.error('获取剩余生成次数失败:', error);
    }
  }, []);

  useEffect(() => {
    fetchRemainingGenerations();
  }, [fetchRemainingGenerations]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setGeneratedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const data = await response.json() as { imageUrl: string };
        setGeneratedImage(data.imageUrl);
        fetchRemainingGenerations();
      } else {
        const errorData = await response.json() as { error: string };
        setError(errorData.error || locale.errorMessage);
      }
    } catch (error) {
      setError(locale.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [description, locale.errorMessage, fetchRemainingGenerations]);

  return (
    <div className={styles.container}>
      <h1>{locale.title}</h1>
      <p className={styles.remainingGenerations}>
        {locale.remainingGenerations.replace('{used}', usedGenerations.toString()).replace('{total}', totalGenerations.toString())}
      </p>
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
          {isLoading ? locale.generatingButton : locale.generateButton}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {generatedImage && (
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
