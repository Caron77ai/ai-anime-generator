import styles from '@/styles/AnimeGenerator.module.css';
import React, { useEffect, useState } from 'react';

const AnimeGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 这里应该是调用您的API来生成漫画的逻辑
    // 这是一个模拟的异步操作
    try {
      // 替换为实际的API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedImage('https://example.com/generated-anime.jpg');
    } catch (error) {
      console.error('Error generating anime:', error);
      // 处理错误
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Anime Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the anime scene you want to generate..."
          className={styles.textarea}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Generating...' : 'Generate Anime'}
        </button>
      </form>
      {isClient && generatedImage && (
        <div className={styles.result}>
          <h2>Generated Anime:</h2>
          <img src={generatedImage} alt="Generated Anime" className={styles.image} />
        </div>
      )}
    </div>
  );
};

export default AnimeGenerator;