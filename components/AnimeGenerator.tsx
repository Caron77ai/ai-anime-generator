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
    placeholderText?: string; // 添加占位符文本
    inputHintText?: string; // 添加输入提示文本
  };
}

const AnimeGenerator: React.FC<AnimeGeneratorProps> = ({ locale }) => {
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedGenerations, setUsedGenerations] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(5);

  const fetchRemainingGenerations = useCallback(async () => {
    try {
      const response = await fetch('/api/remaining-generations');
      if (response.ok) {
        const data: { remainingFreeGenerations: number; remainingPaidGenerations: number; totalRemainingGenerations: number } = await response.json();
        setUsedGenerations(5 - data.remainingFreeGenerations);
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
    if (!description.trim()) return;

    setError(null);
    setGeneratedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description
        }),
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
      <div className={styles.inputSection}>
        <h3 className="text-xl font-semibold mb-4">{locale.title}</h3>
        <span className={styles.remainingGenerations}>
          {locale.remainingGenerations.replace('{used}', usedGenerations.toString()).replace('{total}', totalGenerations.toString())}
        </span>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className={styles.label}>{locale.description}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={locale.inputPlaceholder}
              className={styles.textarea}
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className={`${styles.button} w-full ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <span>{locale.generatingButton}</span>
                <span className={styles.spinner}></span>
              </div>
            ) : locale.generateButton}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.outputSection}>
        {generatedImage ? (
          <div className={styles.result}>
            <h3 className="text-lg font-medium mb-2">{locale.resultTitle}</h3>
            <Image
              src={generatedImage}
              alt="Generated Anime"
              width={300}
              height={300}
              unoptimized
              className="rounded-lg shadow-md"
            />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8.5V12.5L14.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.63605 18.364C2.12132 14.8492 2.12132 9.15076 5.63605 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63605 18.364Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p>{isLoading ? locale.generatingButton : locale.placeholderText || locale.resultTitle}</p>
            {!isLoading && <p className="text-xs mt-2">{locale.inputHintText || locale.inputPlaceholder}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeGenerator;
