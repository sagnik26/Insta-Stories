import React, { useState } from "react";
import { stories } from "./constants/stories";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import "./App.css";
import { posts } from "./constants/posts";
import Post from "./components/Post";
import Header from "./components/Header";

const App: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  );

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  return (
    <div className="app">
      <Header />
      <StoryList stories={stories} onStoryClick={handleStoryClick} />
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          selectedIndex={selectedStoryIndex}
          onClose={handleClose}
        />
      )}
      <div className="posts" data-testid="posts">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default App;
