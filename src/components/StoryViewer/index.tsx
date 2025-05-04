import React, { useEffect, useState, useCallback } from "react";
import { StoryViewerProps } from "../../types";
import styles from "./StoryViewer.module.css";

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  selectedIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.username]) {
      acc[story.username] = [];
    }
    acc[story.username].push(story);
    return acc;
  }, {} as Record<string, typeof stories>);

  const usernames = Object.keys(groupedStories);
  const currentUsername = stories[currentIndex].username;
  const currentUserStories = groupedStories[currentUsername];
  const currentUserStoryIndex = currentUserStories.findIndex(
    (story) => story.id === stories[currentIndex].id
  );

  const goToNextStory = useCallback(() => {
    if (currentUserStoryIndex < currentUserStories.length - 1) {
      // Move to next story of current user
      const nextStoryIndex = stories.findIndex(
        (story) => story.id === currentUserStories[currentUserStoryIndex + 1].id
      );
      setCurrentIndex(nextStoryIndex);
      setProgress(0);
    } else {
      // Move to first story of next user
      const currentUsernameIndex = usernames.indexOf(currentUsername);
      if (currentUsernameIndex < usernames.length - 1) {
        const nextUsername = usernames[currentUsernameIndex + 1];
        const nextStoryIndex = stories.findIndex(
          (story) => story.id === groupedStories[nextUsername][0].id
        );
        setCurrentIndex(nextStoryIndex);
        setProgress(0);
      } else {
        // Last story of last user, close the viewer
        onClose();
      }
    }
  }, [
    currentIndex,
    stories,
    currentUserStories,
    currentUserStoryIndex,
    usernames,
    currentUsername,
    groupedStories,
    onClose,
  ]);

  const goToPreviousStory = useCallback(() => {
    if (currentUserStoryIndex > 0) {
      // Move to previous story of current user
      const prevStoryIndex = stories.findIndex(
        (story) => story.id === currentUserStories[currentUserStoryIndex - 1].id
      );
      setCurrentIndex(prevStoryIndex);
      setProgress(0);
    } else {
      // Move to last story of previous user
      const currentUsernameIndex = usernames.indexOf(currentUsername);
      if (currentUsernameIndex > 0) {
        const prevUsername = usernames[currentUsernameIndex - 1];
        const prevUserStories = groupedStories[prevUsername];
        const prevStoryIndex = stories.findIndex(
          (story) => story.id === prevUserStories[prevUserStories.length - 1].id
        );
        setCurrentIndex(prevStoryIndex);
        setProgress(0);
      }
    }
  }, [
    currentIndex,
    stories,
    currentUserStories,
    currentUserStoryIndex,
    usernames,
    currentUsername,
    groupedStories,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
    <div className={styles.storyViewer} data-testid="storyViewer">
      <div className={styles.progressContainer}>
        {currentUserStories.map((_, index) => (
          <div
            key={index}
            className={styles.progressBar}
            data-testid={`progressBar-${index}`}
            style={{
              width: `${100 / currentUserStories.length}%`,
            }}
          >
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  index === currentUserStoryIndex
                    ? progress
                    : index < currentUserStoryIndex
                    ? 100
                    : 0
                }%`,
              }}
            />
          </div>
        ))}
      </div>

      <button
        className={styles.closeButton}
        onClick={onClose}
        data-testid="closeButton"
      >
        ×
      </button>

      {isLoading && <div className={styles.loader}>Loading...</div>}

      <div
        className={styles.storyContent}
        data-testid="storyContent"
        onClick={handleClick}
      >
        <img
          src={stories[currentIndex].imageUrl}
          alt={`Story by ${stories[currentIndex].username}`}
          onLoad={handleImageLoad}
        />
        <div className={styles.username} data-testid="storyUsername">
          {stories[currentIndex].username}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
