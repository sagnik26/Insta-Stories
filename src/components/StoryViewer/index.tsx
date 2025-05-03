import React, { useEffect, useState, useCallback } from "react";
import { StoryViewerProps } from "../../types";
import styles from "./StoryViewer.module.css";

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  selectedIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const goToNextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPreviousStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  }, [currentIndex]);
  useEffect(() => {
    let interval: number;
    if (!isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            goToNextStory();
            return 0;
          }
          return prevProgress + (100 / 5000) * 100;
        });
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, goToNextStory, isLoading]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;

    if (clientX < innerWidth / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  return (
    <div className={styles.storyViewer}>
      <div className={styles.progressContainer}>
        {stories.map((_, index) => (
          <div
            key={index}
            className={styles.progressBar}
            style={{
              width: `${100 / stories.length}%`,
            }}
          >
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

      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      {isLoading && <div className={styles.loader}>Loading...</div>}

      <div className={styles.storyContent} onClick={handleClick}>
        <img
          src={stories[currentIndex].imageUrl}
          alt={`Story by ${stories[currentIndex].username}`}
          onLoad={handleImageLoad}
        />
        <div className={styles.username}>{stories[selectedIndex].username}</div>
      </div>
    </div>
  );
};

export default StoryViewer;
