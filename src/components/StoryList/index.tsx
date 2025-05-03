import React from "react";
import { StoryListProps } from "../../types";
import styles from "./StoryList.module.css";

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className={styles.storyList}>
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={styles.storyThumbnail}
          onClick={() => onStoryClick(index)}
        >
          <img src={story.imageUrl} alt={`Story by ${story.username}`} />
          <span className={styles.username}>{story.username}</span>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
