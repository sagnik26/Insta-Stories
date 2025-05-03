import React from "react";
import { Story } from "../types";
import styles from "./StoryList.module.css";

interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className={styles.storyListContainer}>
      <div className={styles.storyList}>
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={styles.storyThumbnail}
            onClick={() => onStoryClick(index)}
          >
            <div className={styles.storyRing}>
              <img
                src={story.imageUrl}
                alt={`Story by ${story.username}`}
                className={styles.storyImage}
              />
            </div>
            <span className={styles.username}>{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
