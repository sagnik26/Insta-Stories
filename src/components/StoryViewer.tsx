import React, { useEffect, useState, useCallback } from "react";
import { Story } from "../types";
import styles from "./StoryViewer.module.css";

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
      setIsLoading(true);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPreviousStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
      setIsLoading(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            goToNextStory();
            return 0;
          }
          return prevProgress + (100 / 5000) * 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentIndex, goToNextStory, isPaused]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;

    if (clientX < innerWidth / 3) {
      goToPreviousStory();
    } else if (clientX > (innerWidth * 2) / 3) {
      goToNextStory();
    }
  };

  return (
    <div className={styles.storyViewer}>
      <div className={styles.progressContainer}>
        {stories.map((_, index) => (
          <div key={index} className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  index === currentIndex
                    ? progress
                    : index < currentIndex
                    ? 100
                    : 0
                }%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <img
              src={stories[currentIndex].imageUrl}
              alt={stories[currentIndex].username}
            />
          </div>
          <span className={styles.username}>
            {stories[currentIndex].username}
          </span>
        </div>
        <div className={styles.actions}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinnerRing}></div>
        </div>
      )}

      <div
        className={styles.storyContent}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={stories[currentIndex].imageUrl}
          alt={`Story by ${stories[currentIndex].username}`}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default StoryViewer;
