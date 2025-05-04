import React, { useState } from "react";
import { StoryListProps } from "../../types";
import styles from "./StoryList.module.css";

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageLoad = (storyId: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [storyId]: true,
    }));
  };

  const isImageLoaded = (storyId: string) => loadedImages[storyId];

  return (
    <div className={styles.storyListContainer} data-testid="storyListContainer">
      <div className={styles.storyList}>
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`${styles.storyThumbnail} ${
              isImageLoaded(story.id) ? styles.loaded : ""
            }`}
            data-testid={`storyThumbnail-${index}`}
            onClick={() => onStoryClick(index)}
          >
            <div className={styles.storyRing}>
              {!isImageLoaded(story.id) && (
                <div className={styles.skeletonLoader}>
                  <div className={styles.shimmer}></div>
                </div>
              )}
              <div className={styles.imageContainer}>
                <img
                  src={story.imageUrl}
                  alt={`Story by ${story.username}`}
                  className={`${styles.storyImage} ${
                    isImageLoaded(story.id) ? styles.loaded : ""
                  }`}
                  onLoad={() => handleImageLoad(story.id)}
                  onError={() => handleImageLoad(story.id)}
                />
              </div>
            </div>
            <div className={styles.usernameContainer}>
              {!isImageLoaded(story.id) ? (
                <div className={styles.skeletonUsername}>
                  <div className={styles.shimmer}></div>
                </div>
              ) : (
                <span className={styles.username}>{story.username}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
